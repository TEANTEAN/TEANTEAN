import React from "react";
import { useForm } from "react-hook-form";

interface FormProps {
  defaultValues: any[];
  onSubmit: () => any;
}

// Form component based on https://react-hook-form.com/advanced-usage/#SmartFormComponent
// Injects all react hook form methods into the child component, including the form controller
const Form: React.FC<FormProps> = ({ defaultValues, children, onSubmit }) => {
  const methods = useForm({ defaultValues });
  const { handleSubmit } = methods;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {React.Children.map(children, child => {
        if (!React.isValidElement(child)) return child;
        return child?.props?.name
          ? React.createElement(child.type, {
              ...{
                ...child.props,
                register: methods.register,
                key: child.props.name
              }
            })
          : child;
       })}
    </form>
  );
}