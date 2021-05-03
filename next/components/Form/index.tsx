import React from "react";
import Grid from "@material-ui/core/Grid";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      alignItems: "center",
      // Passes this prop to all children that are MuiTextField
      "& .MuiTextField-root": {
        width: "400px",
      },
      "& .MuiFormHelperText-root": {
        position: "absolute",
        bottom: theme.spacing(-3),
      },
    },
    gridItemWrapper: {
      margin: theme.spacing(2),
      marginTop: theme.spacing(2),
      position: "relative",
    },
  })
);

interface FormProps {
  id: string;
  onSubmit: () => void;
  control: any;
  autoComplete?: string;
}

const Form: React.FC<FormProps> = (props) => {
  const classes = useStyles();

  return (
    <form
      id={props.id}
      onSubmit={props.onSubmit}
      autoComplete={props.autoComplete}
    >
      <Grid container className={classes.root}>
        {React.Children.map(props.children, (child) => {
          return (
            <Grid item xs={12} className={classes.gridItemWrapper}>
              {child}
            </Grid>
          );
        })}
      </Grid>
    </form>
  );
};

export default Form;
