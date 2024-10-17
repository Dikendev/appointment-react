import { Table } from "@tanstack/react-table";
import ButtonTableAction from "./ButtonTableAction";
import useEventPrevention from "../../../hooks/useEventPrevention";

interface TableFooterActionProps<T> {
  table: Table<T>;
  paginationSizes: number[];
}

const TableFooterAction = <T,>({
  table,
  paginationSizes,
}: TableFooterActionProps<T>): JSX.Element => {
  const nextPage = useEventPrevention(() => {
    table.nextPage();
  });

  const previousPage = useEventPrevention(() => {
    table.previousPage();
  });

  return (
    <div className="flex items-center justify-end space-x-2 py-4">
      <div className="space-x-2">
        <ButtonTableAction
          action={() => table.firstPage()}
          name="<<"
          setIsDisabled={!table.getCanPreviousPage()}
        />
        <ButtonTableAction
          action={previousPage}
          name="Previous"
          setIsDisabled={!table.getCanPreviousPage()}
        />
        <ButtonTableAction
          action={nextPage}
          name="Next"
          setIsDisabled={!table.getCanNextPage()}
        />
        <ButtonTableAction
          action={() => table.lastPage()}
          name=">>"
          setIsDisabled={!table.getCanNextPage()}
        />
      </div>
      <div>
        <label htmlFor="pageSize" className="mr-2">
          Quantidade:
        </label>
        <select
          id="pageSize"
          value={table.getState().pagination.pageSize}
          onChange={(event) => table.setPageSize(Number(event.target.value))}
        >
          {paginationSizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
      <div>Total: {table.getRowCount()}</div>
    </div>
  );
};

export default TableFooterAction;
