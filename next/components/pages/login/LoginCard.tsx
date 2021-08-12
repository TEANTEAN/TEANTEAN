/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { PropsWithChildren } from "react";
import Typography from "@material-ui/core/Typography";
import { createStyles, makeStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles(() =>
  createStyles({
    loginCard: {
      maxHeight: "400px",
      maxWidth: "400px",
      marginLeft: "20px",
      marginRight: "20px",
      borderRadius: "10px",
      zIndex: 100,
      paddingTop: "50px",
      paddingBottom: "50px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      flexGrow: 1,
    },
    heading: {
      paddingBottom: "15px",
    },
  })
);

interface LoginCardProps {
  title: string;
}

const LoginCard: React.FC<LoginCardProps> = (
  props: PropsWithChildren<LoginCardProps>
) => {
  const classes = useStyles();

  return (
    <Paper className={classes.loginCard}>
      <Typography
        className={classes.heading}
        variant="h6"
        component="h1"
        gutterBottom
      >
        {props.title}
      </Typography>
      {props.children}
    </Paper>
  );
};

export default LoginCard;
