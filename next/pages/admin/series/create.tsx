/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
// import { makeStyles } from '@material-ui/core/styles';

import { Typography, Button, IconButton, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import { useQuery } from "react-query";
import clyAxiosClient from "util/clyAxiosClient";
import Form, { TextField, AutocompleteField } from "components/Form";
import Box from "@material-ui/core/Box";
import LoadingButton from "components/LoadingButton";
import gnFetch from "../../../util/gnAxiosClient";

interface FormValues {
  title: String;
  description: string;
  organisation: Organisation;
  researcher: User;
  photo: File;
  vedio: File;
  date: Date;
  calendlyMeeting: string;
  calendlyEventSeriesName: string;
  calendlyEventTopic: string;
  calendlyEventDetails: string;
}

interface SeriesFormProps {
  onSubmitSettled: () => void;
  handleClose: () => void;
  organisations: Organisation[];
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    "& .MuiInputBase-root.Mui-disabled": {
      color: "rgba(23,23,23,0.7)",
      backgroundColor: "rgba(200,200,200,0.4)",
    },
    display: "flex-container",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(2),
    margin: "auto",
  },
  titleBox: {
    display: "flex",
    justifyContent: "space-between",
  },
  smallRound: {
    borderRadius: 50,
    fontWeight: 600,
    letterSpacing: "3px",
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
}));
const fetchCalendlyData = async () => {
  const res = await clyAxiosClient.get(
    `/event_types?user=${process.env.CALENDLY_USER_ID}&count=100`
  );
  return res.data;
};

// TODO change these to react queries?
// Need to pass in the research partners and Organisations from index
const postNewSeries = async (newSeriesData) => {
  const data = {
    videoLink: newSeriesData?.videoLink || "NO LINK",
    seriesURI: newSeriesData.calendlyMeeting.uri,
    title: newSeriesData.calendlyEventSeriesName || "No Title",
    organisation: newSeriesData.organisation,
    // eslint-disable-next-line no-underscore-dangle
    researchPartner: newSeriesData.researcher.id,
  };
  console.log(newSeriesData);
  try {
    await gnFetch.post("roundtable-series", data);
  } catch (e) {
    console.log(e);
  }
};

// Our TextField component is wrapped with controls, so cannot set values directly by using the value prop
// Hence create a template component then populate with the state value before returning the component
const displayCalendlyDetails: React.FunctionComponent = (
  calendlyEventObject,
  methods
) => {
  const displayTemplate = calendlyEventObject ? (
    <>
      <TextField
        disabled
        control={methods.control}
        name="calendlyEventSeriesName"
        label="Series Name"
        defaultValue="No Name"
      />
      <TextField
        disabled
        control={methods.control}
        name="calendlyEventTopic"
        label="Topic"
        defaultValue="No Topic"
      />
      <TextField
        disabled
        control={methods.control}
        name="calendlyEventDetails"
        label="Details"
        multiline
        defaultValue="No Description"
      />
    </>
  ) : (
    <Typography variant="subtitle2">Please Select a Calendly Event</Typography>
  );
  return displayTemplate;
};
const CreateSeries: React.FC<SeriesFormProps> = ({
  onSubmitSettled,
  handleClose,
  organisations,
}) => {
  const classes = useStyles();
  const [pending, setPending] = React.useState(false);
  const methods = useForm<FormValues>();

  const [selectedEvent, setSelectedEvent] = React.useState(null);
  const calendlyEvents = useQuery("get-calendly-events", fetchCalendlyData, {
    select: (fetchedEvents) => [...fetchedEvents.collection],
  });

  const allResearcherData = useQuery(
    "get-all-users",
    async () => (await gnFetch("/users/")).data,
    {
      select: (fetchedUsers) =>
        [...fetchedUsers]
          .filter((u) => u?.role?.name === "Research Partner")
          // eslint-disable-next-line no-underscore-dangle
          .map((e) => ({ id: e._id, username: e.username })),
    }
  );
  // Our Autocomplete component is wrapped with the form control stuff,
  // Cannot use onChange directly hence this is a workaround to use the
  // wrapping functionalities to get the value for selected event
  React.useEffect(() => {
    const selectedCalendly = methods.watch("calendlyMeeting");
    setSelectedEvent(selectedCalendly);
  }, [methods.watch("calendlyMeeting")]);
  React.useEffect(() => {
    if (selectedEvent) {
      methods.setValue("calendlyEventSeriesName", selectedEvent.name);
      methods.setValue("calendlyEventTopic", selectedEvent.name);
      methods.setValue("calendlyEventDetails", selectedEvent.description_plain);
    }
  }, [selectedEvent]);

  const onSubmit = async (data) => {
    setPending(true);
    try {
      await postNewSeries(data);
    } catch (e) {
      console.log(e);
    } finally {
      setPending(false);
      onSubmitSettled();
    }
  };
  const onClose = () => handleClose();

  return (
    <>
      <Paper className={classes.root}>
        <Box className={classes.titleBox}>
          <Typography gutterBottom variant="h6">
            Creating a New Series
          </Typography>
          <Button
            className={classes.smallRound}
            variant="contained"
            color="primary"
            component="span"
            size="small"
            onClick={onClose}
          >
            Cancel
          </Button>
        </Box>
        <Form<FormValues> methods={methods} onSubmit={onSubmit}>
          <AutocompleteField
            control={methods.control}
            name="calendlyMeeting"
            label="Calendly Meeting"
            options={calendlyEvents.isSuccess ? calendlyEvents.data : []}
            loading={calendlyEvents.isLoading}
            getOptionLabel={(cEvent) => cEvent.name}
          />
          {displayCalendlyDetails(selectedEvent, methods)}

          <AutocompleteField<Organisation>
            control={methods.control}
            name="organisation"
            label="Organisation"
            options={organisations}
            getOptionLabel={(org) => org.name}
          />

          <AutocompleteField
            control={methods.control}
            name="researcher"
            label="Researcher"
            options={allResearcherData.isSuccess ? allResearcherData.data : []}
            loading={!allResearcherData.isSuccess}
            getOptionLabel={(rp) => rp.username}
          />

          <Typography gutterBottom variant="subtitle2">
            Preview Vedio & Photo Upload
          </Typography>

          <div className={classes.root}>
            <input
              accept="image/*"
              // className={classes.input}
              id="contained-button-file"
              multiple
              type="file"
            />
            <label htmlFor="contained-button-file">
              <Button variant="contained" color="primary" component="span">
                Upload
              </Button>
            </label>
            <input
              accept="image/*"
              // className={classes.input}
              id="icon-button-file"
              type="file"
            />
            <label htmlFor="icon-button-file">
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
              >
                <PhotoCamera />
              </IconButton>
            </label>
          </div>

          <Typography gutterBottom variant="subtitle2">
            Roundtable Management (Calendly)
          </Typography>
          <LoadingButton
            isloading={pending}
            type="submit"
            variant="contained"
            color="primary"
          >
            Done
          </LoadingButton>
        </Form>
      </Paper>
    </>
  );
};

export default CreateSeries;
