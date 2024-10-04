import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/Select";
import { FC } from "react";

export interface SelectOptionsProps {
  options: string[];
  onChange: (option: string) => void;
}

const SelectOptions: FC<SelectOptionsProps> = ({ options, onChange }) => {
  return (
    <Select
      onValueChange={(option) => onChange(option)}
      defaultValue={options[1]}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="view" />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectOptions;
