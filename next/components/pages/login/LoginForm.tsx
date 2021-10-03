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
import { useRouter } from "next/router";
import easySnackbar from "components/EasySnackbar";

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
  const { easyEnqueueSnackbar } = easySnackbar();
  const methods = useForm<FormData>();
  const classes = useStyles();
  const router = useRouter();

  const handleError = (message: string) => {
    console.log(message);
    easyEnqueueSnackbar(message, {
      position: "BOTTOM-CENTER",
      duration: 6000,
      severity: "error",
    });
    setPending(false);
    setIsTakingAWhile(false);
  };

  const onSubmit = async (data: FormData) => {
    try {
      console.log(data);
      setPending(true);
      const t1 = setTimeout(() => {
        setIsTakingAWhile(true);
      }, 3000);
      const t2 = setTimeout(() => {
        try {
          throw new Error("Unable to connect");
        } catch (err) {
          handleError(err.toString());
        }
      }, 15000);
      const res = await signIn("credentials", {
        redirect: false,
        username: data.username,
        password: data.password,
        callbackUrl: `${process.env.NEXTAUTH_URL}/admin/series`,
      });
      if (res?.error) throw new Error(res.error);
      // Login was successful
      clearTimeout(t1);
      clearTimeout(t2);
      if (res.url) router.replace(res.url);
    } catch (err) {
      handleError(err.toString());
    }
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
    </Box>
  );
};

export default LoginForm;
