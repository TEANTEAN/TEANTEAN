import React from "react";
import { NextPage } from "next";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Image from "next/image";
import LoginCard from "components/pages/login/LoginCard";
import LoginForm from "components/pages/login/LoginForm";

const LoginPage: NextPage = () => {
  return (
    <Box>
      <Image src="/Cal-2-WP-crazy-massive-banner.png" objectFit="cover" layout="fill" />
      <Grid container justify="center" alignItems="center">
        <LoginCard title="Sign in to GenyusNetwork">
          <LoginForm />
        </LoginCard>
      </Grid>
    </Box>
  );
};

export default LoginPage;
