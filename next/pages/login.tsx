import React from "react";
import { NextPage } from "next";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { createStyles, makeStyles } from "@material-ui/core";
import Image from "next/image";
import LoginCard from "components/pages/login/LoginCard";
import LoginForm from "components/pages/login/LoginForm";

const useStyles = makeStyles(() =>
  createStyles({
    fullScreen: {
      minWidth: "100vw",
      minHeight: "100vh",
      display: "flex",
    },
  })
);

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
        <LoginCard title="Sign in to GenyusNetwork">
          <LoginForm />
        </LoginCard>
      </Grid>
    </Box>
  );
};

export default LoginPage;
