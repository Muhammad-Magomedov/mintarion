import cn from "classnames";
import { Plus } from "lucide-react";
import { Button, type IButtonProps } from "@/shared/ui/Button/Button";
import styles from "./styles.module.scss";

export const CreateArticleButton: React.FC<IButtonProps> = ({
  className = "",
  children = "Сreate New",
  ...props
}) => {
  return (
    <Button
      className={cn(styles.button, className)}
      variant="lightGreen"
      as="link"
      href="/articles/create"
      {...props}
    >
      <Plus height="1em" />
      <span className={styles.text}>{children}</span>
    </Button>
  );
};
