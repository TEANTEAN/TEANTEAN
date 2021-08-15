/* eslint-disable react/prop-types, react/destructuring-assignment */
import React from "react";
import { Controller } from "react-hook-form";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

interface CheckboxFieldProps {
  control: any;
  name: string;
  label: string;
  className?: string;
  defaultValue?: boolean;
  color?: "primary" | "secondary" | "default";
}

const CustomCheckbox = (props: CheckboxFieldProps) => (
  <Controller
    control={props.control}
    name={props.name}
    defaultValue={props.defaultValue ?? false}
    render={({ field: { value, onChange } }) => (
      // Checkbox accepts its value as `checked`
      // so we need to connect the props here
      <FormControlLabel
        control={
          <Checkbox
            className={props.className}
            checked={value}
            onChange={onChange}
            color={props.color ? props.color : "secondary"}
          />
        }
        label={props.label}
      />
    )}
  />
);

export default CustomCheckbox;
