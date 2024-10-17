import { ChevronDown, Filter } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../../../components/ui/DropdownMenu";
import { Button } from "../../../components/ui/Button";
import { Table } from "@tanstack/react-table";
import { Input } from "../../../components/ui/Input";

interface FilterColumnsTableProps<T> {
  table: Table<T>;
  filterPlaceholder: string;
  filterByColumn: string;
}

const FilterColumnsTable = <T,>({
  table,
  filterPlaceholder,
  filterByColumn,
}: FilterColumnsTableProps<T>): JSX.Element => {
  return (
    <div className="flex items-center py-4">
      <Input
        placeholder={filterPlaceholder}
        value={
          (table.getColumn(filterByColumn)?.getFilterValue() as string) ?? ""
        }
        onChange={(event) =>
          table.getColumn(filterByColumn)?.setFilterValue(event.target.value)
        }
        className="max-w-sm"
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="ml-auto" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {table
            .getAllColumns()
            .filter((column) => column.getCanHide())
            .map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              );
            })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default FilterColumnsTable;
