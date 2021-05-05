/* eslint-disable react/prop-types, react/destructuring-assignment */
import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Controller } from "react-hook-form";
import { FormFieldRules } from "types/types";

interface CustomAutoCompleteFieldProps<OptionType> {
  options: OptionType[];
  name: string;
  label: string;
  getOptionLabel: (option: OptionType) => string;
  getOptionValue: (option: OptionType) => any;
  disabled?: boolean;
  helperText?: string;
  defaultValue?: OptionType;
  fullWidth?: boolean;
  rules?: FormFieldRules;
}

function CustomAutoCompleteField<OptionType>(
  props: CustomAutoCompleteFieldProps<OptionType>
) {
  // Injected by the Form Wrapper Component
  // @ts-ignore
  const { control } = props.methods;

  if (!control) {
    throw new Error(
      "AutocompleteField must be placed as a direct child of Form"
    );
  }

  const getOptionSelected = (option, value) =>
    props.getOptionLabel(option) === props.getOptionLabel(value);

  return (
    <Controller
      control={control}
      name={props.name}
      defaultValue={props.defaultValue ?? null}
      render={({ field, fieldState }) => (
        <Autocomplete
          id={props.name}
          options={props.options}
          disabled={props.disabled}
          defaultValue={props.defaultValue ?? null}
          getOptionLabel={(option) => props.getOptionLabel(option)}
          getOptionSelected={getOptionSelected}
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth={!!props.fullWidth}
              name={props.name}
              id={props.name}
              label={props.label}
              helperText={fieldState.error ? fieldState.error.message : " "}
              error={!!fieldState.error}
              disabled={props.disabled}
              // Accessibility
              aria-label={props.label}
              aria-invalid={!!fieldState.error}
            />
          )}
          onChange={(event, newValue: OptionType | null) =>
            field.onChange(newValue)
          }
        />
      )}
      rules={props.rules}
    />
  );
}

export default CustomAutoCompleteField;
