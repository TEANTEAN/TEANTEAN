import React from "react";
import TextField, {
  CustomTextFieldProps,
} from "components/Form/FormFields/TextField";
import { InputAdornment, IconButton } from "@material-ui/core";
import Visibility from "@material-ui/icons/VisibilityRounded";
import VisibilityOff from "@material-ui/icons/VisibilityOffRounded";

function PasswordField(props: Omit<CustomTextFieldProps, "type">) {
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <TextField
      type={isVisible ? "text" : "password"}
      {...props}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={toggleVisibility}
            >
              {isVisible ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}

export default PasswordField;
