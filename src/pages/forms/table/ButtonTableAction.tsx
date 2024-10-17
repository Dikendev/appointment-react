import { MouseEvent } from "react";
import { Button } from "../../../components/ui/Button";

interface ButtonTableActionProps {
  action: (event: MouseEvent) => void;
  name: string;
  setIsDisabled: boolean;
}

const ButtonTableAction = ({
  action,
  setIsDisabled,
  name,
}: ButtonTableActionProps) => {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={(event) => action(event)}
      disabled={setIsDisabled}
    >
      {name}
    </Button>
  );
};

export default ButtonTableAction;
