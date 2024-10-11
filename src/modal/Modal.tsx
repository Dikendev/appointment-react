import { FC, HTMLInputTypeAttribute } from "react";
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

export interface inputs {
  name: string;
  type: HTMLInputTypeAttribute;
}

export interface ModalProps {
  trigger: string;
  title: string;
  description: string;
  inputs: inputs[];
}

const Modal: FC<ModalProps> = ({ title, trigger, description, inputs }) => {
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
        <div className="grid gap-4 py-4">
          {inputs.map((input) => (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor={input.name} className="text-right">
                {input.name}
              </Label>
              <Input id={input.name} className="col-span-3" type={input.type} />
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
