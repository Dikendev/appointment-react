import React, {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import GlobalContext from "../../context/global/global-context";
import { Button } from "../../components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/Dialog";
import { Input } from "../../components/ui/Input";
import { Label } from "../../components/ui/Label";
import useBooking from "../../hooks/useBooking";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/Select";
import DropDownMenu from "./Dropdown";

const CreateNewEvent: FC<{
  closeModals: Dispatch<SetStateAction<boolean>>;
}> = ({ isOpen, closeModals }) => {
  const { setBookings, closeModal } = useContext(GlobalContext);
  const { selectedHour, procedures, availableHours } = useBooking();

  const [formData, setFormData] = useState({
    client: { name: "" },
    startAt: new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate(),
      Number(selectedHour.split(":")[0]),
      Number(selectedHour.split(":")[1])
    ),
    finishAt: "Select",
    procedure: "",
    total: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      alert("Preencha todos os campos");
      return;
    }

    createBooking(e);

    // setBookings([formData]);
    console.log("success", formData);
    closeModal(false);
  };

  const createBooking = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("createBooking", formData);
  };

  const validateForm = () => {
    return formData.client.name !== "" && formData.finishAt !== null;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const dateEndChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleOnProcedureSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleOnNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    console.log("name", name);
    console.log("value", value);

    setFormData({
      ...formData,
      [name]: { name: value },
    });
  };

  // const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;

  //   setFormData({
  //     ...formData,
  //     [name]: new Date(value),
  //   });
  // };

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal(false);
      }
    },
    [closeModal]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <Dialog open={true} onOpenChange={closeModals}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a new Booking</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-2 py-4">
          <div className="grid grid-cols-4 items-center gap-2">
            <Label htmlFor="name" className="text-right">
              Cliente
            </Label>
            <Input disabled id="client" className="col-span-2" />
            <DropDownMenu dropDownTarget={"Cliente"} />
          </div>
          <div className="grid grid-cols-4 items-center gap-2">
            <Label htmlFor="name" className="text-right">
              Services
            </Label>
            <Select>
              <SelectTrigger className="col-span-2">
                <SelectValue placeholder="Nada Selecionado" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Fruits</SelectLabel>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="blueberry">Blueberry</SelectItem>
                  <SelectItem value="grapes">Grapes</SelectItem>
                  <SelectItem value="pineapple">Pineapple</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <DropDownMenu dropDownTarget={"Serviço"} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              start hour
            </Label>
            <Input id="service" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              start hour
            </Label>
            <Input id="service" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              price
            </Label>
            <Input id="service" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateNewEvent;
