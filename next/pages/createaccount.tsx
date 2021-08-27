/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
// import { makeStyles } from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import LoadingButton from "components/LoadingButton";
import { NextPage } from "next";
import Form, {
  TextField,
  PasswordField,
  AutocompleteField,
  DatePickerField,
} from "components/Form";
import withAuth from "../components/withAuth";
import gnFetch from "../util/gnAxiosClient";

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

const postNewUser = async (newUserData: FormValues) => {
  const data = {
    username: newUserData.username,
    email: newUserData.email,
    password: newUserData.password,
    role: newUserData.level?.level?.toLowerCase() || "Authenticated",
  };
  try {
    // Send New User data to strapi
    const createdUser = await gnFetch.post("auth/local/register", data);
    // Get the ID for the created User so that we can set their role
    const createdUserId = createdUser.data.user._id;
    // Find roles that are applicable for users
    const allRoles = await gnFetch.get("users-permissions/roles");
    if (allRoles) {
      // Find the strapi id to the role that is to be assigned to user
      const sRole = allRoles.data.roles.find(
        (strapiRole) => strapiRole.name === data.role
      );
      if (sRole) {
        // New role value to assign to the user
        const newUserRole = { role: { _id: sRole._id } };
        // Update the user role
        await gnFetch.put(`/users/${createdUserId}`, newUserRole);
      }
    }
  } catch (e) {
    console.log(e);
  }
};

const CreateAccount: NextPage = () => {
  const classes = useStyles();
  const [pending, setPending] = React.useState(false);
  const { session, haveAuthenticated } = withAuth({
    redirectTo: "/dashboard",
    permittedRole: "genyus admin",
  });
  const [submittedValues, setSubmittedValues] =
    React.useState<FormValues>(null);
  const methods = useForm<FormValues>();
  const onSubmit = async (data: FormValues) => {
    setPending(true);
    setSubmittedValues(data);
    try {
      await postNewUser(data);
    } catch (e) {
      console.log(e);
    } finally {
      setPending(false);
    }
  };

  if (session && haveAuthenticated()) {
    return (
      <>
        <Box className={classes.root}>
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

              <PasswordField
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
              <LoadingButton
                isloading={pending}
                type="submit"
                variant="contained"
                color="primary"
              >
                Submit
              </LoadingButton>
            </Form>
          </Paper>
        </Box>

        {submittedValues && (
          <Typography variant="body1">
            Submitted: {JSON.stringify(submittedValues)}
          </Typography>
        )}
      </>
    );
  }
  return (
    <Typography variant="h1" component="h1">
      Loading...
    </Typography>
  );
};

export default CreateAccount;
