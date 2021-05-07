/* eslint-disable react/prop-types, react/destructuring-assignment */
import { TextField } from "@material-ui/core";
import React from "react";
import { Controller } from "react-hook-form";
import { FormFieldRules } from "types/types";

export interface CustomTextFieldProps {
  name: string;
  label: string;
  required?: boolean;
  type?: string;
  disabled?: boolean;
  defaultValue?: string | number;
  maxLength?: number;
  rules?: FormFieldRules;
}

function CustomTextField(props: CustomTextFieldProps) {
  // Injected by the Form Wrapper Component
  // @ts-ignore
  const { control } = props.methods;

  if (!control) {
    throw new Error(`TextField must be placed as a direct child of Form`);
  }

  return (
    <Controller
      control={control}
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
            // Accessibility
            aria-label={props.label}
            aria-invalid={!!fieldState.error}
          />
        </>
      )}
      rules={props.rules}
    />
  );
}

export default CustomTextField;
