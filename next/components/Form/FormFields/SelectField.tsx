/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types, react/destructuring-assignment */
import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import { Controller } from "react-hook-form";
import type { FormFieldRules } from "types/types";

type SelectOptionType = string | number | readonly string[];

interface CustomSelectFieldProps {
  control: any;
  options: SelectOptionType[];
  name: string;
  label: string;
  getOptionLabel: (option: SelectOptionType) => string;
  disabled?: boolean;
  defaultValue?: SelectOptionType;
  fullWidth?: boolean;
  rules?: FormFieldRules;
}

function CustomSelectField(props: CustomSelectFieldProps) {
  return (
    <Controller
      control={props.control}
      name={props.name}
      defaultValue={props.defaultValue ?? null}
      render={({ field }) => (
        <TextField
          id={props.name}
          disabled={props.disabled}
          label={props.label}
          {...field}
          select
          onChange={(e) => field.onChange(e.target.value)}
        >
          {props.options.map((option, index) => (
            <MenuItem key={`${option}_${index}`} value={option}>
              {props.getOptionLabel(option)}
            </MenuItem>
          ))}
        </TextField>
      )}
      rules={props.rules}
    />
  );
}

export default CustomSelectField;
