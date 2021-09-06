import React from "react";
import {
  Typography,
  Grid,
  Theme,
  makeStyles,
  createStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    subheader: {
      backgroundColor: theme.palette.primary.main,
      boxShadow: "0px 6px 15px 1px gray",
      paddingLeft: "40px",
      paddingTop: "10px",
      color: "white",
      width: "100%",
    },
  })
);

export default function SubHeader({ children }): JSX.Element {
  const classes = useStyles();
  return (
    <Grid item xs={12} className={classes.subheader}>
      <Typography variant="h5" component="h2">
        {children}
      </Typography>
    </Grid>
  );
}
