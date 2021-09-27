/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
// import { makeStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import LoadingButton from "components/LoadingButton";
import Snackbar from "components/Snackbar";

import Form, {
  TextField,
  PasswordField,
  AutocompleteField,
  DatePickerField,
} from "components/Form";

import { LoneIconButton } from "components/Buttons";
import gnFetch from "../../../util/gnAxiosClient";

interface FormValues {
  username: String;
  password: string;
  email: string;
  firstName: String;
  lastName: String;
  phone: String;
  role: Role;
  organisation: Organisation;
  date: Date;
  // input: File;
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex-container",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(2),
    margin: "auto",
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
    display: "flex",
    maxWidth: "100%",
    maxHeight: "100%",
  },
}));

// TODO change these to react queries?
const updateUser = async (updatedUserData: FormValues, userId?: string) => {
  const data = {
    email: updatedUserData.email,
    password: updatedUserData.password,
    firstName: updatedUserData.firstName,
    lastName: updatedUserData.lastName,
    phone: updatedUserData.phone,
    role: updatedUserData.role,
    organisation: updatedUserData.organisation,
  };

  try {
    // Send put request with updated values of the user
    await gnFetch.put(`/users/${userId}`, data);
  } catch (e) {
    console.log(e);
  }
};

// TODO change these to react queries?
const postNewUser = async (newUserData: FormValues) => {
  const data = {
    username: newUserData.username,
    email: newUserData.email,
    password: newUserData.password,
    firstName: newUserData.firstName,
    lastName: newUserData.lastName,
    phone: newUserData.phone,
    role: newUserData.role,
    organisation: newUserData.organisation,
  };

  // eslint-disable-next-line no-useless-catch
  try {
    // Send New User data to strapi
    const createdUser = await gnFetch.post("auth/local/register", data);
    // Get the ID for the created User so that we can set their role
    const createdUserId = createdUser.data.user._id;
    // Update the user role
    await gnFetch.put(`/users/${createdUserId}`, {
      role: { _id: data.role._id },
    });
  } catch (e) {
    throw e;
  }
};

interface AccountFormProps {
  isCreateUser: boolean;
  userUnderEdit: User;
  onSubmitSettled: () => void;
  handleClose: () => void;
  roles: Role[];
  organisations: Organisation[];
}

const AccountForm: React.FC<AccountFormProps> = ({
  isCreateUser,
  userUnderEdit,
  onSubmitSettled,
  handleClose,
  roles,
  organisations,
}) => {
  const classes = useStyles();
  const [pending, setPending] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [submitSuccessful, setSubmitSuccessful] = React.useState(false);
  const methods = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    setPending(true);
    setErrorMessage("");
    try {
      if (!isCreateUser) {
        await updateUser(data, userUnderEdit.id);
      } else {
        await postNewUser(data);
      }
      setSubmitSuccessful(true);
    } catch (e) {
      let { message } = e;
      if (e?.response?.status === 400) {
        message =
          e.response.data?.data[0]?.messages[0]?.message ||
          "Something has gone wrong!";
      }
      setErrorMessage(message);
    } finally {
      setPending(false);
    }
  };

  const onClose = () => handleClose();
  // Moved 'onSubmitSettled' out of the finally block, it was
  // executing before the states could update in try catch block
  if (submitSuccessful) onSubmitSettled();
  // TODO center modal and add cross to close out of modal
  return (
    <>
      {errorMessage && (
        <Snackbar
          severity="error"
          message={errorMessage}
          position="TOP-RIGHT"
        />
      )}
      <Box className={classes.root}>
        <Typography gutterBottom variant="subtitle1">
          {isCreateUser ? "Account Creation" : "Account Management"}
        </Typography>
        <LoneIconButton
          type="close"
          className={classes.closeButton}
          onClick={onClose}
        />
        <Form<FormValues> methods={methods} onSubmit={onSubmit}>
          <TextField
            control={methods.control}
            name="username"
            label="Username"
            defaultValue={userUnderEdit?.username ?? ""}
            disabled={!isCreateUser}
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
                value: isCreateUser,
                message: "This field is required",
              },
            }}
          />

          <TextField
            control={methods.control}
            name="email"
            label="Email"
            defaultValue={userUnderEdit?.email ?? ""}
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
            name="firstName"
            label="First Name"
            defaultValue={userUnderEdit?.firstName ?? ""}
            rules={{
              required: {
                value: true,
                message: "This field is required",
              },
            }}
          />

          <TextField
            control={methods.control}
            name="lastName"
            label="Last Name"
            defaultValue={userUnderEdit?.lastName ?? ""}
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
            defaultValue={userUnderEdit?.phone ?? ""}
            // TODO add rule for phone number
            rules={{}}
          />

          <AutocompleteField<Role>
            control={methods.control}
            name="role"
            label="User Type"
            defaultValue={
              userUnderEdit?.role
                ? roles.find((role) => role.name === userUnderEdit.role.name)
                : null
            }
            options={roles}
            getOptionLabel={(role) => role.name}
          />

          <AutocompleteField<Organisation>
            control={methods.control}
            name="organisation"
            label="Organisation"
            options={organisations}
            defaultValue={
              userUnderEdit?.organisation
                ? organisations.find(
                    (orgnaisation) =>
                      orgnaisation.name === userUnderEdit.organisation.name
                  )
                : null
            }
            getOptionLabel={(org) => org.name}
          />

          <DatePickerField
            control={methods.control}
            name="date"
            label={
              userUnderEdit?.createdAt ? "Date Registered" : "Date Register"
            }
            disabled={!!userUnderEdit?.createdAt}
            defaultValue={
              userUnderEdit ? new Date(userUnderEdit.createdAt) : new Date()
            }
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
            {isCreateUser ? "Create User" : "Update User"}
          </LoadingButton>
        </Form>
      </Box>
    </>
  );
};

export default AccountForm;
