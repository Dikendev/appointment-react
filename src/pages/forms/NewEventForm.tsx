import React, { FormEvent, useEffect } from "react";
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
import TableModal from "./TableModal";
import Modal, { ModalProps } from "../../modal/Modal";
import { Client, ClientDto } from "../../@types/client";
import {
  createClient,
  findAllClients,
  findAllProcedures,
} from "../../services/api-client";
import Columns from "./table/Columns";
import { ArrowUpDown } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { Procedure } from "../../@types/procedure";
import useNewEvent from "../../hooks/useNewEvent";

const NewEventForm = () => {
  const {
    selectedHour,
    procedures,
    availableHours,
    eventModal,
    closeEventModal,
  } = useBooking();

  const { form, setFormData } = useNewEvent();

  // useEffect(() => {
  //   console.log("selectedHour", selectedHour);
  // }, [selectedHour]);

  useEffect(() => {
    console.log("selectedHour", selectedHour);

    setFormData((prevForm) => ({
      ...prevForm,
      startAt: selectedHour,
    }));
  }, []);

  //Salvar o state do modal no contexto de evento, (checar se é nesse mesmo). e salvar o fetch dos dados dos clientes e dos servicos tambem lá, para nao ficar fazendo request toda hora.

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log(e);
    console.log(form, "form data");

    // if (!validateForm()) {
    //   alert("Preencha todos os campos");
    //   return;
    // }

    createBooking(e);

    // setBookings([formData]);
    console.log("success", form);
    closeEventModal();
  };

  const createBooking = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("createBooking", form);
  };

  // const validateForm = () => {
  //   return formData.client.name !== "" && formData.finishAt !== null;
  // };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log("name", name);
    console.log("value", value);

    setFormData({
      ...form,
      [name]: value,
    });
  };

  const clientCreateInputs: ModalProps["inputs"] = [
    {
      name: "name",
      type: "text",
      required: true,
      validation: { minLength: 5 },
    },
    { name: "phoneNumber", type: "text" },
    { name: "birthday", type: "text" },
    { name: "email", type: "text" },
  ];

  const serviceCreateInputs: ModalProps["inputs"] = [
    {
      name: "name",
      type: "text",
      required: true,
      validation: { minLength: 1 },
    },
    {
      name: "price",
      type: "text",
      required: true,
      validation: { minLength: 1 },
    },
    {
      name: "requiredTimeMin",
      type: "text",
      required: true,
      validation: { minLength: 1 },
    },
  ];

  const onSubmit = async (formEvent: FormEvent) => {
    formEvent.preventDefault();

    const formData = new FormData(formEvent.currentTarget as HTMLFormElement);

    const data = Object.fromEntries(formData.entries());
    //  const keys = Object.keys(data);

    //  keys.forEach((key) => {
    //    const field = data[key];
    //    userValidation(key, field);
    //  });

    //  if (hasError) return;

    const clientDto: ClientDto = {
      name: String(data.name),
      email: String(data.email),
      phoneNumber: String(data.phoneNumber),
      birthday: String(data.birthday),
    };

    try {
      await createClient(clientDto);
    } catch (error) {
      console.log("ERROR DENTRO DO COMPONENTE", error);
    }
  };

  const clientAccessor: ColumnDef<Client>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            <ArrowUpDown className="ml-2 h-4 w-2" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "profile.birthday",
      id: "birthday",
      header: () => <div className="text-right">Birthday</div>,
      cell: ({ row }) => {
        return (
          <div className="text-right font-medium">
            {row.getValue("birthday")}
          </div>
        );
      },
    },
    {
      accessorKey: "profile.phoneNumber",
      id: "phoneNumber",
      header: () => <div className="text-right">PhoneNumber</div>,
      cell: ({ row }) => {
        return (
          <div className="text-right font-medium">
            {row.getValue("phoneNumber")}
          </div>
        );
      },
    },
  ];

  const procedureAccessor: ColumnDef<Procedure>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            <ArrowUpDown className="ml-2 h-4 w-2" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "price",
      id: "price",
      header: () => <div className="text-right">Price</div>,
      cell: ({ row }) => {
        return (
          <div className="text-right font-medium">{row.getValue("price")}</div>
        );
      },
    },
    {
      accessorKey: "requiredTimeMin",
      id: "requiredTimeMin",
      header: () => <div className="text-right">Time </div>,
      cell: ({ row }) => {
        return (
          <div className="text-right font-medium">
            {row.getValue("requiredTimeMin")}
          </div>
        );
      },
    },
  ];

  const clientColumn = Columns<Client>({
    keyToCopy: "name",
    accessors: clientAccessor,
  });

  const procedureColumn = Columns<Procedure>({
    keyToCopy: "id",
    accessors: procedureAccessor,
  });

  const onClientSubmit = (client: Client) => {
    if (client.id) {
      setFormData((prev) => ({
        ...prev,
        client: {
          id: client.id,
          name: client.name,
        },
      }));
    }
  };

  const onProcedureSubmit = (procedure: Procedure) => {
    if (procedure.id) {
      setFormData((prev) => ({
        ...prev,
        procedure: {
          id: procedure.id,
          name: procedure.name,
        },
      }));

      setFormData((prevForm) => ({
        ...prevForm,
        total: procedure.price,
      }));
    }
  };

  return (
    <Dialog open={true} onOpenChange={closeEventModal}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a new Booking</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-2 py-4">
            <div className="grid grid-cols-6 items-center gap-2">
              <Label htmlFor="client" className="text-right">
                Cliente
              </Label>
              <Input
                id="client"
                name="client"
                value={form.client.name}
                className="col-span-3"
                disabled
              />
              <TableModal<Client>
                fetchData={findAllClients}
                formTarget={form.client}
                modalTitle="Buscar Cliente"
                modalDescription="Após selecionar a cliente, click em avançar para continuar."
                submitText="Continuar"
                filterPlaceholder="Filtrar Cliente pelo nome"
                columns={clientColumn}
                onSubmit={onClientSubmit}
              />
              <Modal
                fromCreationModal={true}
                title="Nova Cliente"
                description="Para criar uma nova cliente"
                inputs={clientCreateInputs}
                onSubmit={(event) => onSubmit(event)}
              />
            </div>
            <div className="grid grid-cols-6 items-center gap-2">
              <Label htmlFor="service" className="text-right">
                Service
              </Label>
              <Input
                id="service"
                name="service"
                value={form.procedure.name}
                className="col-span-3"
                disabled
              />
              <TableModal<Procedure>
                fetchData={findAllProcedures}
                formTarget={form.procedure}
                modalTitle="Buscar Serviços"
                modalDescription=" Após selecionar um serviço, avançar para continuar."
                submitText="Continuar"
                filterPlaceholder="Filtrar serviço pelo nome"
                columns={procedureColumn}
                onSubmit={onProcedureSubmit}
              />
              <Modal
                fromCreationModal={true}
                title="Novo Serviço"
                description="Para criar um novo serviço"
                inputs={serviceCreateInputs}
                onSubmit={(event) => onSubmit(event)}
              />
              {/* <DropDownMenu dropDownTarget={"service"} /> */}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="startAt" className="text-right">
                start hour
              </Label>
              <Input
                id="startAt"
                name="startAt"
                value={form.startAt}
                className="col-span-3"
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="finishAt" className="text-right">
                finish hour
              </Label>
              <Input
                id="finishAt"
                name="finishAt"
                value={form.finishAt}
                className="col-span-3"
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="total" className="text-right">
                total
              </Label>
              <Input
                id="total"
                name="total"
                value={form.total}
                className="col-span-3"
                onChange={handleChange}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewEventForm;
