import { FC } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/Select";
import { EllipsisVertical } from "lucide-react";

export interface SelectOptionsProps {
  buttons: ButtonsProps[];
}

export interface ButtonsProps {
  text: string;
  onClick: () => void;
}

const SelectOptions: FC<SelectOptionsProps> = (props) => {
  const factoryButtons = () => {
    return (
      <Select>
        <SelectTrigger className="h-10 w-10">
          <EllipsisVertical />
        </SelectTrigger>
        <SelectContent>
          {props.buttons.map((button) => (
            <SelectItem
              key={button.text}
              value={button.text}
              onChange={button.onClick}
              onClick={button.onClick}
            >
              {button.text}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  };

  return <>{factoryButtons()}</>;
};

export default SelectOptions;
