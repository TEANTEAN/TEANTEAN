/* eslint-disable react/prop-types, react/destructuring-assignment, react/jsx-no-duplicate-props */
import { TextField } from "@material-ui/core";
import React from "react";
import { Controller } from "react-hook-form";
import { InputProps } from "@material-ui/core/Input";
import type { FormFieldRules } from "types/types";

export interface CustomTextFieldProps {
  control: any;
  name: string;
  label: string;
  className?: string;
  autoComplete?: string;
  required?: boolean;
  type?: string;
  disabled?: boolean;
  defaultValue?: string | number;
  maxLength?: number;
  rules?: FormFieldRules;
  InputProps?: InputProps;
  inputRef?: React.Ref<any>;
}

function CustomTextField(props: CustomTextFieldProps) {
  return (
    <Controller
      control={props.control}
      name={props.name}
      defaultValue={props.defaultValue ?? ""}
      render={({ field, fieldState }) => (
        <>
          <TextField
            type={props.type}
            name={props.name}
            id={props.name}
            label={props.label}
            value={field.value}
            onChange={field.onChange}
            helperText={fieldState.error ? fieldState.error.message : null}
            error={!!fieldState.error}
            disabled={props.disabled}
            inputProps={{ maxLength: props.maxLength }}
            autoComplete={props.autoComplete ? props.autoComplete : "off"}
            // Accessibility
            aria-label={props.label}
            aria-invalid={!!fieldState.error}
            InputProps={props.InputProps}
            inputRef={props.inputRef}
          />
        </>
      )}
      rules={props.rules}
    />
  );
}

export default CustomTextField;
