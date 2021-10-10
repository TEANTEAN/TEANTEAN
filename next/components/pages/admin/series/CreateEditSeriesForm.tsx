/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";

import { Typography, Button, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import Form, { TextField, AutocompleteField } from "components/Form";
import Box from "@material-ui/core/Box";
import LoadingButton from "components/LoadingButton";
import gnFetch from "util/gnAxiosClient";
import easySnackbar from "components/EasySnackbar";

interface FormValues {
  title: String;
  description: string;
  organisation: Organisation;
  photo: File;
  vedio: File;
  date: Date;
  calendlyMeeting: CalendlySeries;
  calendlyEventSeriesName: string;
  calendlyEventTopic: string;
  calendlyEventDetails: string;
}

interface SeriesFormProps {
  onSubmitSettled: () => void;
  handleClose: () => void;
  organisations: Organisation[];
  newSeries: CalendlySeries[];
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex-container",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(2),
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
  goLink: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
    "& a": { textDecoration: "none", color: "inherit" },
  },
}));

// Need to pass in the research partners and Organisations from index
const postNewSeries = async (newSeriesData) => {
  const data = {
    videoLink: newSeriesData?.videoLink || "NO LINK",
    seriesURI: newSeriesData.calendlyMeeting.uri,
    title: newSeriesData.calendlyEventSeriesName || "No Title",
    organisation: newSeriesData.organisation,
  };
  // eslint-disable-next-line no-useless-catch
  try {
    await gnFetch.post("roundtable-series", data);
  } catch (e) {
    throw e;
  }
};

const noEventSelectedMessage = "Please select a Calendly event type";

const CreateSeries: React.FC<SeriesFormProps> = ({
  onSubmitSettled,
  handleClose,
  organisations,
  newSeries,
}) => {
  const classes = useStyles();
  const [pending, setPending] = React.useState(false);
  const methods = useForm<FormValues>();
  // const [selectedEvent, setSelectedEvent] =
  //   React.useState<CalendlySeries>(null);
  const [submitSuccessful, setSubmitSuccessful] = React.useState(false);
  const { easyEnqueueSnackbar } = easySnackbar();

  React.useEffect(() => {
    if (methods.watch("calendlyMeeting")) {
      const meeting = methods.watch("calendlyMeeting");
      methods.setValue("calendlyEventSeriesName", meeting.name);
      methods.setValue("calendlyEventTopic", meeting.name);
      methods.setValue("calendlyEventDetails", meeting.description_plain);
    } else {
      methods.setValue("calendlyEventSeriesName", noEventSelectedMessage);
      methods.setValue("calendlyEventTopic", noEventSelectedMessage);
      methods.setValue("calendlyEventDetails", noEventSelectedMessage);
    }
    // @ts-ignore
  }, [methods.watch("calendlyMeeting")]);

  const onSubmit = async (data) => {
    setPending(true);
    try {
      await postNewSeries(data);
      setSubmitSuccessful(true);
    } catch (e) {
      console.log(e);
      let { message } = e;
      if (e?.response?.status === 400) {
        message =
          e.response.data?.data[0].message[0]?.message ||
          "Something has gone wrong!";
      }
      easyEnqueueSnackbar(message, {
        severity: "error",
        duration: 6000,
        position: "TOP-RIGHT",
      });
    } finally {
      setPending(false);
    }
  };
  const onClose = () => handleClose();
  if (submitSuccessful) onSubmitSettled();
  return (
    <Paper className={classes.root}>
      <Box className={classes.titleBox}>
        <Typography gutterBottom variant="h6">
          Creating a New Series
        </Typography>
      </Box>
      <Form<FormValues> methods={methods} onSubmit={onSubmit}>
        <AutocompleteField
          control={methods.control}
          name="calendlyMeeting"
          label="Calendly Meeting"
          options={newSeries}
          getOptionLabel={(cEvent) => cEvent.name}
          rules={{
            required: {
              value: true,
              message: "Calendly event is required",
            },
          }}
        />
        <TextField
          disabled
          control={methods.control}
          name="calendlyEventSeriesName"
          label="Series Name"
          defaultValue="Please select a Calendly event type"
        />
        <TextField
          disabled
          control={methods.control}
          name="calendlyEventTopic"
          label="Topic"
          defaultValue="Please select a Calendly event type"
        />
        <TextField
          disabled
          control={methods.control}
          name="calendlyEventDetails"
          label="Details"
          multiline
          defaultValue="Please select a Calendly event type"
        />

        <AutocompleteField<Organisation>
          disabled={!methods.watch("calendlyMeeting")}
          control={methods.control}
          name="organisation"
          label="Organisation"
          options={organisations}
          getOptionLabel={(org) => org.name}
          rules={{
            required: {
              value: true,
              message: "This field is required",
            },
          }}
        />

        <Box display="flex" flexDirection="row-reverse">
          <LoadingButton
            isloading={pending}
            type="submit"
            variant="contained"
            color="primary"
          >
            Done
          </LoadingButton>
          <Button disabled={pending} onClick={onClose}>
            Cancel
          </Button>
        </Box>
      </Form>
    </Paper>
  );
};

export default CreateSeries;
