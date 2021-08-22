import { NextPage } from "next";
import Form, {
  TextField,
  AutocompleteField,
  DatePickerField,
} from "components/Form";
import React from "react";
import Typography from "@material-ui/core/Typography";
import { useForm } from "react-hook-form";
import Button from "@material-ui/core/Button";

interface FormValues {
  email: string;
  hi: string;
  name: Name;
  date: Date;
}

interface Name {
  id: number;
  name: string;
}

const names: Name[] = [
  {
    id: 1,
    name: "Cal",
  },
  {
    id: 2,
    name: "Ian",
  },
  {
    id: 3,
    name: "Eduardo",
  },
];

const FormTest: NextPage = () => {
  const [submittedValues, setSubmittedValues] =
    React.useState<FormValues>(null);

  const methods = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    setSubmittedValues(data);
  };

  return (
    <>
      <Form<FormValues> methods={methods} onSubmit={onSubmit}>
        <TextField
          control={methods.control}
          name="email"
          label="Email"
          rules={{
            minLength: {
              value: 5,
              message: "Email must be 5 chars long",
            },
            required: {
              value: true,
              message: "This field is required",
            },
          }}
        />
        <TextField
          control={methods.control}
          name="hello"
          label="hello"
          defaultValue="hi"
          disabled
        />
        <AutocompleteField<Name>
          control={methods.control}
          name="name"
          label="Autocomplete name"
          options={names}
          getOptionLabel={(name) => name.name}
        />
        <DatePickerField
          control={methods.control}
          name="date"
          label="Date"
          defaultValue={new Date()}
        />
        <Button type="submit">Submit</Button>
      </Form>
      {submittedValues && (
        <Typography variant="body1">
          Submitted: {JSON.stringify(submittedValues)}
        </Typography>
      )}
    </>
  );
};

export default FormTest;
