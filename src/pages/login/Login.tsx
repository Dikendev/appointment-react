import { useForm } from "react-hook-form";
import { Form } from "../../components/ui/Form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../components/ui/Button";
import useLogin from "../../hooks/useLogin";
import FormFieldInput from "./FormField";

const formSchema = z.object({
  username: z.string().min(2).max(50),
  password: z.string().min(4).max(50),
});

type Login = "username" | "password";

const Login = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { login } = useLogin();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      login({
        email: values.username,
        password: values.password,
      });
    } catch (error) {
      console.log("ERORRRRRRR", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-20 gap-8">
      <div>LOGIN</div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 max-w-60"
        >
          <FormFieldInput form={form} label="username" name="username" />
          <FormFieldInput form={form} label="password" name="password" />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default Login;
