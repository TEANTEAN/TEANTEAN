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
import Form, {
  TextField,
  AutocompleteField,
  DatePickerField,
} from "components/Form";

interface FormValues {
  username: String;
  password: string;
  email: string;
  firstname: String;
  lastName: String;
  phone: String;
  level: Level;
  org: Org;
  date: Date;
  // input: File;
}

interface Level {
  id: number;
  level: string;
}

interface Org {
  id: number;
  org: string;
}

const levels: Level[] = [
  { id: 1, level: "Peer Leader" },
  { id: 2, level: "genyus Admin" },
  { id: 3, level: "Research Partner" },
];

const orgs: Org[] = [
  { id: 1, org: "The University of Melbourne" },
  { id: 2, org: "Young Stroke Foundation" },
  { id: 3, org: "Monash University" },
];

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
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

const CreateAccount: NextPage = () => {
  const classes = useStyles();
  const [submittedValues, setSubmittedValues] =
    React.useState<FormValues>(null);
  const methods = useForm<FormValues>();
  const onSubmit = (data: FormValues) => {
    setSubmittedValues(data);
  };

  return (
    <>
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Typography gutterBottom variant="subtitle1">
            Account Management
          </Typography>
          <Form<FormValues> methods={methods} onSubmit={onSubmit}>
            <TextField
              control={methods.control}
              name="username"
              label="Username"
              rules={{
                minLength: {
                  value: 5,
                  message: "Username must be 5 chars long",
                },
                required: {
                  value: true,
                  message: "This field is required",
                },
              }}
            />

            <TextField
              control={methods.control}
              name="password"
              label="Password"
              rules={{
                minLength: {
                  value: 5,
                  message: "Password must be 5 chars long",
                },
                required: {
                  value: true,
                  message: "This field is required",
                },
              }}
            />

            <TextField
              control={methods.control}
              name="email"
              label="Email"
              rules={{
                minLength: {
                  value: 5,
                  message: "Email must be 5 chars long",
                },
                required: {
                  value: true,
                  message: "This field is required",
                },
              }}
            />

            <TextField
              control={methods.control}
              name="firstname"
              label="First Name"
              rules={{
                required: {
                  value: true,
                  message: "This field is required",
                },
              }}
            />

            <TextField
              control={methods.control}
              name="lastname"
              label="Last Name"
              rules={{
                required: {
                  value: true,
                  message: "This field is required",
                },
              }}
            />

            <TextField
              control={methods.control}
              name="phone"
              label="Phone Number"
              rules={{}}
            />

            <AutocompleteField<Level>
              control={methods.control}
              name="level"
              label="genyus User"
              options={levels}
              getOptionLabel={(level) => level.level}
            />

            <AutocompleteField<Org>
              control={methods.control}
              name="org"
              label="Organisation"
              options={orgs}
              getOptionLabel={(org) => org.org}
            />

            <DatePickerField
              control={methods.control}
              name="date"
              label="Date Register"
              defaultValue={new Date()}
            />

            <Typography gutterBottom variant="subtitle2">
              Profile Picture Upload
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
          </Form>
        </Paper>
      </div>

      {submittedValues && (
        <Typography variant="body1">
          Submitted: {JSON.stringify(submittedValues)}
        </Typography>
      )}
    </>
  );
};

export default CreateAccount;
