/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
// import { makeStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import LoadingButton from "components/LoadingButton";
import easySnackbar from "components/EasySnackbar";

import Form, {
  TextField,
  PasswordField,
  AutocompleteField,
  DatePickerField,
} from "components/Form";

import { LoneIconButton } from "components/Buttons";
import { Grid } from "@material-ui/core";

import gnFetch from "../../util/gnAxiosClient";

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
  blocked: Boolean;
}

interface Status {
  name: string;
  value: boolean;
}

const STATUSES: Status[] = [
  { name: "Active", value: false },
  { name: "Inactive", value: true },
];

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
    blocked: updatedUserData.blocked,
  };

  try {
    // Send put request with updated values of the user
    const req = await gnFetch.put(`/users/${userId}`, data);
    console.log("Res:", req.data);
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
  const [submitSuccessful, setSubmitSuccessful] = React.useState(false);
  const methods = useForm<FormValues>();
  const { easyEnqueueSnackbar } = easySnackbar();
  const onSubmit = async (data: FormValues) => {
    setPending(true);
    try {
      let message = "";
      if (!isCreateUser) {
        if (data.password === "") {
          // delete the password field from the data object so it doesnt send emtpy string to strappi
          // eslint-disable-next-line no-param-reassign
          delete data.password;
        }
        await updateUser(data, userUnderEdit.id);
        message = "User updated";
      } else {
        // add date to data object to send to strapi
        // eslint-disable-next-line no-param-reassign
        data.date = new Date();
        await postNewUser(data);
        message = "User Created";
      }
      setSubmitSuccessful(true);
      easyEnqueueSnackbar(message, {
        severity: "success",
        duration: 6000,
        position: "TOP-RIGHT",
      });
    } catch (e) {
      let { message } = e;
      if (e?.response?.status === 400) {
        message =
          e.response.data?.data[0]?.messages[0]?.message ||
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
  // Moved 'onSubmitSettled' out of the finally block, it was
  // executing before the states could update in try catch block
  if (submitSuccessful) onSubmitSettled();

  return (
    <>
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
          <Grid container spacing={3}>
            <Grid item xs={12}>
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
            </Grid>

            <Grid item xs={12}>
              <PasswordField
                control={methods.control}
                name="password"
                label="Password"
                rules={{
                  minLength: {
                    value: 5,
                    message: "Password must be 5 characters long",
                  },
                  required: {
                    value: isCreateUser,
                    message: "This field is required",
                  },
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                control={methods.control}
                name="email"
                label="Email"
                defaultValue={userUnderEdit?.email ?? ""}
                rules={{
                  minLength: {
                    value: 3,
                    message: "Email must be 3 characters long",
                  },
                  required: {
                    value: true,
                    message: "This field is required",
                  },
                }}
              />
            </Grid>

            <Grid item xs={12}>
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
            </Grid>
            <Grid item xs={12}>
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
            </Grid>
            <Grid item xs={12}>
              <TextField
                control={methods.control}
                name="phone"
                label="Phone Number"
                defaultValue={userUnderEdit?.phone ?? ""}
                // TODO add rule for phone number
                rules={{}}
              />
            </Grid>

            <Grid item xs={12}>
              <AutocompleteField<Role>
                control={methods.control}
                name="role"
                label="User Type"
                defaultValue={
                  userUnderEdit?.role
                    ? roles.find(
                        (role) => role.name === userUnderEdit.role.name
                      )
                    : null
                }
                options={roles}
                rules={{
                  required: {
                    value: true,
                    message: "This field is required",
                  },
                }}
                getOptionLabel={(role) => role.name}
              />
            </Grid>
            <Grid item xs={12}>
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
                rules={{
                  required: {
                    value: true,
                    message: "This field is required",
                  },
                }}
                getOptionLabel={(org) => org.name}
              />
            </Grid>

            {userUnderEdit?.createdAt && (
              <Grid item xs={12}>
                <DatePickerField
                  control={methods.control}
                  name="date"
                  label="Date Registered"
                  disabled={!!userUnderEdit?.createdAt}
                  defaultValue={new Date(userUnderEdit.createdAt)}
                />
              </Grid>
            )}

            <Grid item xs={12}>
              <AutocompleteField<Boolean>
                control={methods.control}
                name="blocked"
                label="Status"
                defaultValue={!!userUnderEdit?.blocked}
                options={[true, false]}
                getOptionLabel={(option) =>
                  option ? STATUSES[1].name : STATUSES[0].name
                }
              />
            </Grid>
            <Grid item xs={12}>
              <LoadingButton
                isloading={pending}
                type="submit"
                variant="contained"
                color="primary"
              >
                {isCreateUser ? "Create User" : "Update User"}
              </LoadingButton>
            </Grid>
          </Grid>
        </Form>
      </Box>
    </>
  );
};

export default AccountForm;
