/* eslint-disable no-console */
/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { signIn } from "next-auth/client";
import { NextPage } from "next";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { createStyles, makeStyles } from "@material-ui/core";
import Form, { PasswordField, TextField } from "components/Form";
import { useForm } from "react-hook-form";
import Paper from "@material-ui/core/Paper";
import LoadingButton from "components/LoadingButton";
import Image from "next/image";
import Fade from "@material-ui/core/Fade";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles(() =>
  createStyles({
    fullScreen: {
      minWidth: "100vw",
      minHeight: "100vh",
      display: "flex",
    },
    pageGrid: {
      minWidth: "100%",
      minHeight: "100%",
      flexDirection: "column",
      justifyContent: "center",
    },
    heading: {
      paddingBottom: "15px",
    },
    loginCard: {
      height: "400px",
      width: "400px",
      marginLeft: "20px",
      marginRight: "20px",
      borderRadius: "10px",
      zIndex: 100,
    },
    imageContainer: {
      width: "50%",
    },
    formWrapper: {
      paddingTop: "50px",
      paddingBottom: "50px",
    },
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
    centredGrid: {
      alignItems: "center",
      justify: "center",
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
      }, 10000);
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
    <>
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
    </>
  );
};

const LoginCard: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <Paper className={classes.loginCard}>
        <Box
          className={classes.formWrapper}
          display="flex"
          flexDirection="column"
          alignItems="center"
          flexGrow="1"
        >
          <Typography
            className={classes.heading}
            variant="h6"
            component="h1"
            gutterBottom
          >
            Sign In To GenyusNetwork
          </Typography>
          <Box className={classes.form}>
            <LoginForm />
          </Box>
        </Box>
      </Paper>
    </>
  );
};

const LoginPage: NextPage = () => {
  const classes = useStyles();

  return (
    <Box className={classes.fullScreen}>
      <Image
        src="/Cal-2-WP-crazy-massive-banner.png"
        objectFit="cover"
        layout="fill"
      />
      <Grid container justify="center" alignItems="center">
        <LoginCard />
      </Grid>
    </Box>
  );
};

export default LoginPage;
