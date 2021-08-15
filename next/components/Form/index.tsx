import React, { ReactNode } from "react";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // The '&' symbol means this will apply to children of this component
      // Passes this prop to all children that are MuiTextField
      "& .MuiFormControl-root": {
        width: "100%",
      },
      // Helper text needs to be displayed below the field
      "& .MuiFormHelperText-root": {
        position: "absolute",
        bottom: theme.spacing(-3),
      },
    },
  })
);

interface FormProps<FormValues> {
  onSubmit: SubmitHandler<FormValues>;
  methods: UseFormReturn<FormValues>;
  id?: string;
  children?: ReactNode;
  disableAutoComplete?: boolean;
}

function Form<FormValues>({
  onSubmit,
  id,
  methods,
  children,
  disableAutoComplete,
}: FormProps<FormValues>) {
  const classes = useStyles();
  const { handleSubmit } = methods;

  const autoComplete = disableAutoComplete ? "off" : "on";

  return (
    <form
      id={id}
      onSubmit={handleSubmit(onSubmit)}
      autoComplete={autoComplete}
      noValidate
    >
      <Box className={classes.root}>{children}</Box>
    </form>
  );
}

export default Form;
export { default as AutocompleteField } from "components/Form/FormFields/AutocompleteField";
export { default as NumberField } from "components/Form/FormFields/NumberField";
export { default as TextField } from "components/Form/FormFields/TextField";
export { default as PasswordField } from "components/Form/FormFields/PasswordField";
export { default as DatePickerField } from "components/Form/FormFields/DatePickerField";
export { default as SelectField } from "components/Form/FormFields/SelectField";
export { default as Checkbox } from "components/Form/FormFields/Checkbox";
