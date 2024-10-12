import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/Form";
import { Input } from "../../components/ui/Input";

export interface Login {
  username: string;
  password: string;
}

type LoginProp = "username" | "password";

interface FormFieldInputProps {
  form: UseFormReturn<Login>;
  name: LoginProp;
  label: string;
}

const FormFieldInput = (props: FormFieldInputProps) => {
  return (
    <FormField
      control={props.form.control}
      name={props.name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{props.label}</FormLabel>
          <FormControl>
            <Input placeholder={props.label} {...field} />
          </FormControl>
          <FormDescription>{props.label} Form description</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormFieldInput;
