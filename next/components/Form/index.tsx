import React, { ReactChild, ReactNode } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Grid from "@material-ui/core/Grid";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AutocompleteField from "components/Form/FormFields/AutocompleteField";
import DatePickerField from "components/Form/FormFields/DatePickerField";
import NumberField from "components/Form/FormFields/NumberField";
import TextField from "components/Form/FormFields/TextField";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      alignItems: "center",
      // Passes this prop to all children that are MuiTextField
      "& .MuiTextField-root": {
        width: "75%",
        maxWidth: "500px",
      },
      // Helper text needs to be displayed below the field
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

interface FormProps<FormValues> {
  onSubmit: SubmitHandler<FormValues>;
  children?: ReactNode;
}

function Form<FormValues>({ onSubmit, children }: FormProps<FormValues>) {
  const classes = useStyles();
  const methods = useForm<FormValues>();
  const { handleSubmit } = methods;

  return (
    // Handle form submission using react-hook-form's exposed method
    // this lets us use react-hook-form's validation
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container className={classes.root}>
        {/* Wrap each child of this component in a grid item with styles defined at the top of this file */}
        {React.Children.map(children, (child: ReactChild) => (
          <Grid item xs={12} className={classes.gridItemWrapper}>
            {/* Inject all of react hook form's methods into each child */}
            {React.isValidElement(child)
              ? React.createElement(child.type, {
                  ...{
                    ...(child.props as {}),
                    methods,
                    key: child.props.name,
                  },
                })
              : child}
          </Grid>
        ))}
        <Grid item>
          <Button type="submit">Submit</Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default Form;
export { AutocompleteField, DatePickerField, NumberField, TextField };
