import Header from "components/PublicNavigation/Header";
import Footer from "components/PublicNavigation/Footer";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import React from "react";
import { Box } from "@material-ui/core";

const useStyles = makeStyles(() =>
  createStyles({
    fullScreen: {
      minHeight: "100vh",
      flex: 1,
      flexDirection: "column",
      display: "flex",
    },
    footer: {
      marginTop: "auto",
    },
  })
);

export default function PublicNavigation({ children }) {
  const classes = useStyles();
  return (
    <Box className={classes.fullScreen}>
      <Header />
      <Box>{children}</Box>
      <Box className={classes.footer}>
        <Footer />
      </Box>
    </Box>
  );
}
