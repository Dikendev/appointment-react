import { FC, FormEvent, HTMLInputTypeAttribute, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/Dialog";
import { Button } from "../components/ui/Button";
import { Label } from "../components/ui/Label";
import { Input } from "../components/ui/Input";

interface Inputs {
  name: string;
  type: HTMLInputTypeAttribute;
  required?: boolean;
  validation?: {
    minLength: number;
  };
}

export interface ModalProps {
  fromCreationModal: boolean;
  trigger: string;
  title: string;
  description: string;
  inputs: Inputs[];
  onSubmit: (event: FormEvent) => void;
}

const Modal: FC<ModalProps> = ({
  title,
  trigger,
  description,
  inputs,
  onSubmit,
}) => {
  const [errors, setErrors] = useState<{ key: string; value: string }[]>([]);

  // const onSubmit = async (formEvent: FormEvent) => {
  //   formEvent.preventDefault();

  //   const formData = new FormData(formEvent.currentTarget as HTMLFormElement);

  //   const data = Object.fromEntries(formData.entries());
  //   const keys = Object.keys(data);

  //   keys.forEach((key) => {
  //     const field = data[key];
  //     userValidation(key, field);
  //   });

  //   if (hasError) return;

  //   const clientDto: ClientDto = {
  //     name: String(data.name),
  //     email: String(data.email),
  //     phoneNumber: String(data.phoneNumber),
  //     birthday: String(data.birthday),
  //   };

  //   try {
  //     await createClient(clientDto);
  //   } catch (error) {
  //     console.log("ERROR DENTRO DO COMPONENTE", error);
  //   }
  // };

  // const userValidation = (key: string, field: FormDataEntryValue) => {
  //   const fieldValidation = inputs.find(
  //     (input) => key === input.name
  //   )?.validation;

  //   if (fieldValidation) {
  //     const fieldString = field.toString().length;

  //     if (fieldString < fieldValidation.minLength) {
  //       const errorDetails = [
  //         {
  //           key: key.toString(),
  //           value: `Tamanho minimo permitido é ${fieldValidation.minLength}`,
  //         },
  //       ];

  //       hasError = true;
  //       setErrors(errorDetails);
  //     } else {
  //       // setErrors((prev) => {
  //       //   const prevFind = prev.filter((prevEl) => key === prevEl.key)[0];
  //       //   return [{ key: prevFind.key, value: "" }];
  //       // });
  //       hasError = false;
  //     }
  //   }
  // };

  const findError = (field: string): string => {
    return errors.filter((error) => {
      return error.key === field;
    })[0]?.value;
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">{trigger}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <div className="grid gap-4 py-4">
            {inputs.map((input) => (
              <div
                key={input.name}
                className="grid grid-cols-4 items-center gap-4"
              >
                <Label htmlFor={input.name} className="text-right">
                  {input.name}
                </Label>
                <Input
                  id={input.name}
                  name={input.name}
                  className="col-span-3"
                  type={input.type}
                  required={input?.required}
                />
                <span className="col-span-6 text-red-500">
                  {findError(input.name)}
                </span>
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
