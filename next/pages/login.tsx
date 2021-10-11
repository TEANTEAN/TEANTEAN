import React from "react";
import { NextPage } from "next";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LoginCard from "components/pages/login/LoginCard";
import LoginForm from "components/pages/login/LoginForm";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { paper } from "styles/theme";

const LoginPage: NextPage = () => {

  return (
    <Box paddingTop="100px" bgcolor={paper} height="fit-content" minHeight="100vh">
      <Grid container justify="center" alignItems="center">
        <LoginCard title="Sign in to GenyusNetwork">
          <LoginForm />
        </LoginCard>
      </Grid>
    </Box>
  );
};

export default LoginPage;
