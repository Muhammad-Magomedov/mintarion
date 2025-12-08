import { Button, type IButtonProps } from "@/shared/ui/Button/Button";
import { useSignUpStore } from "../../model";
import styles from "./styles.module.scss";

export const SignUpButton: React.FC<IButtonProps> = (props) => {
  const { modal, updateValue } = useSignUpStore();

  return (
    <Button
      onClick={() => updateValue("modal", { ...modal, isOpen: true })}
      variant="lightGreen"
      {...props}
    >
      MintaLab
    </Button>
  );
};
