import { useEffect, useState } from "react";
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
import {
  ColumnDef,
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
import TableContentHolder from "./table/TableContentHolder";
import useEventPrevention from "../../hooks/useEventPrevention";
import { SquareMenu } from "lucide-react";

interface ListModalProps<T> {
  fetchData: () => Promise<T[] | null>;
  formTarget: {
    id: string;
    name: string;
  };
  modalTitle: string;
  modalDescription: string;
  submitText: string;
  filterPlaceholder: string;
  columns: ColumnDef<T>[];
  onSubmit: (data: T) => void;
}

const TableModal = <T extends object>({
  fetchData,
  formTarget,
  modalTitle,
  modalDescription,
  submitText,
  filterPlaceholder,
  columns,
  onSubmit,
}: ListModalProps<T>) => {
  const [tableData, setTableData] = useState<T[]>([]);
  const [open, setOpen] = useState(false);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  const columnClients = columns;

  const table = useReactTable({
    data: tableData,
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const row = newRow();

    const selectedRowIdsKeys = Object.keys(row);

    if (!selectedRowIdsKeys.length) {
      return setRowSelection(newRow);
    }

    const lastSelectedRowId = selectedRowIdsKeys[selectedRowIdsKeys.length - 1];
    setRowSelection({ [lastSelectedRowId]: true });
  };

  const handleOnSubmit = useEventPrevention(() => {
    const selectedRow = table.getFilteredSelectedRowModel();

    if (!selectedRow.rows.length) return;

    const valueSelected = selectedRow.rows[0].original;
    onSubmit(valueSelected);
    setOpen(false);
  });

  useEffect(() => {
    const fetchTableData = async () => {
      try {
        const tableData = await fetchData();
        if (tableData && tableData.length > 1) {
          setTableData(tableData);
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    console.log("EXECUTING fetchTableData");

    fetchTableData();
  }, []);

  const onOpenChange = (status: boolean) => {
    if (!open) {
      const allRows = table.getRowModel().rowsById;

      const newFilter = Object.keys(allRows)
        .map((row) => {
          return allRows[row].original;
        })
        .findIndex((data) => {
          if ("id" in data) {
            return data.id === formTarget.id;
          }
        });

      if (newFilter !== -1) {
        setRowSelection({ [newFilter]: true });
      }
    }

    setOpen(status);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <SquareMenu />
        </Button>
      </DialogTrigger>
      <DialogOverlay />
      <DialogContent>
        <form onSubmit={handleOnSubmit}>
          <DialogHeader>
            <DialogTitle>{modalTitle}</DialogTitle>
            <DialogDescription>{modalDescription}</DialogDescription>
          </DialogHeader>

          <TableContentHolder
            table={table}
            filterPlaceholder={filterPlaceholder}
            filterByColumn="name"
            columns={columns}
          />

          <DialogFooter>
            <Button type="submit">{submitText}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TableModal;
