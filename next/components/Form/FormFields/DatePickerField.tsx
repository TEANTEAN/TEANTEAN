/* eslint-disable react/prop-types, react/destructuring-assignment */
import React from "react";
import { Controller } from "react-hook-form";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { FormFieldRules } from "types/types";

interface CustomDateFieldProps {
  control: any;
  name: string;
  label: string;
  autoComplete?: string;
  format?: string;
  disabled?: boolean;
  className?: string;
  defaultValue?: Date;
  fullWidth?: boolean;
  rules?: FormFieldRules;
}

const defaultFormat = "dd/MM/yy";

const CustomDateField = (props: CustomDateFieldProps) => (
  <Controller
    control={props.control}
    name={props.name}
    defaultValue={props.defaultValue ?? null}
    render={({ field, fieldState }) => (
      <KeyboardDatePicker
        className={props.className}
        variant="inline"
        onChange={field.onChange}
        value={field.value}
        format={props.format ?? defaultFormat}
        fullWidth={!!props.fullWidth}
        name={props.name}
        id={props.name}
        label={props.label}
        error={!!fieldState.error}
        helperText={fieldState.error ? fieldState.error.message : " "}
        disabled={props.disabled}
        autoComplete={props.autoComplete ? props.autoComplete : "off"}
        // Accessibility
        aria-label={props.label}
        aria-invalid={!!fieldState.error}
      />
    )}
    rules={props.rules}
  />
);

export default CustomDateField;
