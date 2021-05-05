import { Validate, ValidationRule } from "react-hook-form";

interface FormFieldRules {
  required?: string | ValidationRule<boolean>;
  min?: ValidationRule<string | number>;
  max?: ValidationRule<string | number>;
  maxLength?: ValidationRule<string | number>;
  minLength?: ValidationRule<string | number>;
  pattern?: ValidationRule<RegExp>;
  validate?: Validate | Record<string, Validate>;
  valueAsNumber?: boolean;
  valueAsDate?: boolean;
  setValueAs?: (value: any) => any;
};