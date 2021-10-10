import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles({
  container: {
    height: "75vh",
    width: "100%",
  },
  centered: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

const LoadingScreen = () => {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <Box className={classes.centered}>
        <CircularProgress color="primary" size="3rem" />
      </Box>
    </Box>
  );
};

export default LoadingScreen;
