import React from "react";
import TextField, {
  CustomTextFieldProps,
} from "components/Form/FormFields/TextField";

function CustomNumberField(props: CustomTextFieldProps) {
  return <TextField type="number" {...props} />;
}

export default CustomNumberField;
