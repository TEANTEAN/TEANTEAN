/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
// import { makeStyles } from '@material-ui/core/styles';

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import { NextPage } from "next";
import { useQuery } from "react-query";
import clyAxiosClient from "util/clyAxiosClient";
import Form, { TextField, AutocompleteField } from "components/Form";
import Box from "@material-ui/core/Box";
import LoadingButton from "components/LoadingButton";
import gnFetch from "../../../util/gnAxiosClient";

interface FormValues {
  title: String;
  description: string;
  org: Org;
  photo: File;
  vedio: File;
  date: Date;
}

interface Level {
  id: number;
  level: string;
}

interface Org {
  id: number;
  org: string;
}

const orgs: Org[] = [
  { id: 1, org: "The University of Melbourne" },
  { id: 2, org: "Young Stroke Foundation" },
  { id: 3, org: "Monash University" },
];

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    "& .MuiInputBase-root.Mui-disabled": {
      color: "rgba(23,23,23,0.7)",
      backgroundColor: "rgba(200,200,200,0.4)",
    },
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
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 500,
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
    `${process.env.CALENDLY_API_URL}/event_types?user=${process.env.CALENDLY_USER_ID}&count=100`
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
  };
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
const CreateSeries: NextPage = () => {
  const classes = useStyles();
  const [pending, setPending] = React.useState(false);
  const methods = useForm<FormValues>();
  const onSubmit = async (data) => {
    setPending(true);
    try {
      await postNewSeries(data);
    } catch (e) {
      console.log(e);
    } finally {
      setPending(false);
    }
  };
  const [fetchCalendlyEvents, setFetchCalendlyEvents] = React.useState(false);
  const [eventOptions, setEventOptions] = React.useState([]);
  const [selectedEvent, setSelectedEvent] = React.useState(null);
  const calendlyEvents = useQuery("get-calendly-events", fetchCalendlyData, {
    enabled: fetchCalendlyEvents,
    onSuccess: (fetchedEvents) => {
      setEventOptions([...fetchedEvents.collection]);
    },
  });
  React.useEffect(() => {
    setFetchCalendlyEvents(true);
  }, []);

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
  return (
    <>
      <div className={classes.root}>
        <Paper className={classes.paper}>
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
            >
              Cancel
            </Button>
          </Box>
          <Form<FormValues> methods={methods} onSubmit={onSubmit}>
            <AutocompleteField
              control={methods.control}
              name="calendlyMeeting"
              label="Calendly Meeting"
              loading={calendlyEvents.isLoading}
              options={eventOptions}
              getOptionLabel={(cEvent) => cEvent.name}
            />
            {displayCalendlyDetails(selectedEvent, methods)}

            <AutocompleteField<Org>
              control={methods.control}
              name="org"
              label="Organisation"
              options={orgs}
              getOptionLabel={(org) => org.org}
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
      </div>
    </>
  );
};

export default CreateSeries;
