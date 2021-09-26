/* eslint-disable react/prop-types, react/destructuring-assignment */
import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Controller } from "react-hook-form";
import { FormFieldRules } from "types/types";

interface CustomAutoCompleteFieldProps<OptionType> {
  control: any;
  options: OptionType[];
  name: string;
  label: string;
  getOptionLabel: (option: OptionType) => string;
  className?: string;
  disabled?: boolean;
  defaultValue?: OptionType;
  fullWidth?: boolean;
  rules?: FormFieldRules;
  loading?: boolean;
}

function CustomAutoCompleteField<OptionType>(
  props: CustomAutoCompleteFieldProps<OptionType>
) {
  const getOptionSelected = (option, value) =>
    props.getOptionLabel(option) === props.getOptionLabel(value);

  return (
    <Controller
      name={props.name}
      control={props.control}
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
              className={props.className}
              fullWidth={!!props.fullWidth}
              name={props.name}
              id={props.name}
              label={props.label}
              helperText={fieldState.error ? fieldState.error.message : " "}
              error={!!fieldState.error}
              disabled={props.disabled}
              autoComplete="off"
              // Accessibility
              aria-label={props.label}
              aria-invalid={!!fieldState.error}
            />
          )}
          onChange={(event, newValue: OptionType | null) =>
            field.onChange(newValue)
          }
          loading={props.loading}
        />
      )}
      rules={props.rules}
    />
  );
}

export default CustomAutoCompleteField;
