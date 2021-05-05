/* eslint-disable react/prop-types, react/destructuring-assignment */
import React from "react";
import { Controller } from "react-hook-form";
import { FormFieldRules } from "types/types";
import { KeyboardDatePicker } from "@material-ui/pickers";

interface CustomDateFieldProps {
  name: string;
  label: string;
  format?: string;
  disabled?: boolean;
  defaultValue?: Date;
  fullWidth?: boolean;
  rules?: FormFieldRules;
}

const defaultFormat = "dd/MM/yy";

const CustomDateField = (props: CustomDateFieldProps) => {
  // Injected by the Form Wrapper Component
  // @ts-ignore
  const { control } = props.methods;

  if (!control) {
    throw new Error("DatePickerField must be placed as a direct child of Form");
  }

  return (
    <Controller
      control={control}
      name={props.name}
      defaultValue={props.defaultValue ?? null}
      render={({ field, fieldState }) => (
        <KeyboardDatePicker
          autoOk
          disableToolbar
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
          // Accessibility
          aria-label={props.label}
          aria-invalid={!!fieldState.error}
        />
      )}
      rules={props.rules}
    />
  );
};

export default CustomDateField;
