import { MoreHorizontal } from "lucide-react";
import { Checkbox } from "../../../components/ui/Checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../../../components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../components/ui/DropdownMenu";
import { useEffect, useState } from "react";

interface ColumnsProps<T> {
  keyToCopy: string;
  accessors: ColumnDef<T>[];
}

const Columns = <T,>({
  keyToCopy,
  accessors,
}: ColumnsProps<T>): ColumnDef<T>[] => {
  const [data, setData] = useState<any>(null);
  const title = [
    {
      id: "select",
      header: () => {},
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
  ];

  const actions = [
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const payment = row.original as unknown as any;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() =>
                  navigator.clipboard.writeText(payment[keyToCopy])
                }
              >
                Copy payment ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Ver detalhes</DropdownMenuItem>
              <DropdownMenuItem>Deletar</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  useEffect(() => {
    const newData = [...title, ...accessors, ...actions];
    setData(newData);
  }, []);

  return data;
};
export default Columns;
