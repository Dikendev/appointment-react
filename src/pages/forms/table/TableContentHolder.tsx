import { ColumnDef, Table as TStack } from "@tanstack/react-table";
import BottomTableAction from "./TableFooterAction";
import TableContent from "./TableContent";
import FilterColumnsTable from "./FilterColumns";

interface TableContentHolderProps<T> {
  table: TStack<T>;
  filterPlaceholder: string;
  filterByColumn: string;
  columns: ColumnDef<T>[];
}

const TableContentHolder = <T,>({
  table,
  filterPlaceholder,
  filterByColumn,
  columns,
}: TableContentHolderProps<T>): JSX.Element => {
  const paginationSizes = [3, 5, 10, 15];

  return (
    <div className="w-full">
      <FilterColumnsTable
        table={table}
        filterPlaceholder={filterPlaceholder}
        filterByColumn={filterByColumn}
      />
      <TableContent table={table} columns={columns} />
      <BottomTableAction table={table} paginationSizes={paginationSizes} />
    </div>
  );
};

export default TableContentHolder;
