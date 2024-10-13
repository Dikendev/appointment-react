import { FormEvent, useEffect, useState } from "react";
import { Button } from "../../components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/Dialog";
import ClientTable from "./client-table/ClientTable";
import { Client } from "../../@types/client";
import {
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  RowSelectionState,
  SortingState,
  Updater,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { columns } from "./client-table/Column";
import { findAllClients } from "../../services/api-client";

const ClientListModal = () => {
  const [clients, setClients] = useState<Client[]>([]);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const columnClients = columns;

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  const table = useReactTable({
    data: clients,
    columns: columnClients,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: (rowSelectionState) =>
      setOnlyOneClientSelected(rowSelectionState),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
  });

  const setOnlyOneClientSelected = (newRow: Updater<RowSelectionState>) => {
    // how ignore this error?
    const row = newRow();

    const selectedRowIdsKeys = Object.keys(row);

    if (!selectedRowIdsKeys.length) {
      return setRowSelection(newRow);
    }

    const lastSelectedRowId = selectedRowIdsKeys[selectedRowIdsKeys.length - 1];
    setRowSelection({ [lastSelectedRowId]: true });
  };

  const onSubmit = (event: FormEvent) => {
    // TODO: Criar um método para vir os dados do cliente ignorando os agendamentos. (booking)

    event.preventDefault();
    event.stopPropagation();
    const valueSelected = table.getFilteredSelectedRowModel().rows[0].original;

    console.log("valueSelected", valueSelected);
    //agora é pegar o valor da linha
    console.log("FUNCIONOU");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clients = await findAllClients();
        if (clients && clients.length > 1) {
          setClients(clients);
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Clientes</Button>
      </DialogTrigger>
      <DialogOverlay />
      <DialogContent>
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>Buscar Cliente</DialogTitle>
            <DialogDescription>
              Após selecionar a cliente, click em avançar para continuar.
            </DialogDescription>
          </DialogHeader>

          <ClientTable table={table} />

          <DialogFooter>
            <Button type="submit">Avançar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ClientListModal;
