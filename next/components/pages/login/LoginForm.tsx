/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-console */
import React from "react";
import { signIn } from "next-auth/client";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { createStyles, makeStyles } from "@material-ui/core";
import Form, { PasswordField, TextField } from "components/Form";
import { useForm } from "react-hook-form";
import LoadingButton from "components/LoadingButton";
import Fade from "@material-ui/core/Fade";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles(() =>
  createStyles({
    form: {
      minWidth: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
    },
    formField: {
      minWidth: "85%",
    },
    submitButtonWrapper: {
      marginTop: "48px",
      minWidth: "85%",
    },
    helperText: {
      color: "red",
      overflowWrap: "normal",
      maxWidth: "85%",
      textAlign: "center",
    },
  })
);

interface FormData {
  username: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const [pending, setPending] = React.useState(false);
  const [isTakingAWhile, setIsTakingAWhile] = React.useState(false);
  const [showErrorSnackbar, setShowErrorSnackbar] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  const methods = useForm<FormData>();
  const classes = useStyles();

  const handleError = (message: string) => {
    console.log(message);
    setErrorMessage(message);
    setShowErrorSnackbar(true);
    setPending(false);
    setIsTakingAWhile(false);
  };

  const onSubmit = async (data: FormData) => {
    try {
      console.log(data);
      setPending(true);
      setTimeout(() => {
        setIsTakingAWhile(true);
      }, 3000);
      setTimeout(() => {
        try {
          throw new Error("Unable to connect");
        } catch (err) {
          handleError(err.toString());
        }
      }, 15000);
      await signIn("credentials", {
        redirect: false,
        username: data.username,
        password: data.password,
        // callbackUrl: "http://localhost:3000/",
      });
    } catch (err) {
      handleError(err.toString());
    }
  };

  const handleAlertClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setShowErrorSnackbar(false);
  };

  return (
    <Box className={classes.form}>
      <Form<FormData> methods={methods} onSubmit={onSubmit}>
        <Grid container spacing={3} direction="column" alignItems="center">
          <Grid className={classes.formField} item xs={12}>
            <TextField
              control={methods.control}
              name="username"
              label="Username"
              rules={{
                required: {
                  value: true,
                  message: "Please enter your username",
                },
              }}
            />
          </Grid>
          <Grid className={classes.formField} item xs={12}>
            <PasswordField
              control={methods.control}
              name="password"
              label="Password"
              rules={{
                required: {
                  value: true,
                  message: "Please enter your password",
                },
              }}
            />
          </Grid>
          <Box className={classes.submitButtonWrapper}>
            <LoadingButton
              variant="contained"
              fullWidth
              color="primary"
              type="submit"
              isloading={pending}
            >
              Login
            </LoadingButton>
          </Box>
          <Fade in={isTakingAWhile} timeout={500}>
            <Typography className={classes.helperText} variant="body2">
              Please be patient, we're starting up :)
            </Typography>
          </Fade>
        </Grid>
      </Form>
      <Snackbar
        open={showErrorSnackbar}
        autoHideDuration={6000}
        onClose={handleAlertClose}
      >
        <Alert onClose={handleAlertClose} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default LoginForm;
