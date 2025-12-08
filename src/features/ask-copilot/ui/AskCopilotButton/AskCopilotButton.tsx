"use client"

import cn from "classnames";
import { Button, type IButtonProps } from "@/shared/ui/Button/Button";
import { useCopilotStore } from "../../model";
import styles from "./styles.module.scss";

export const AskCopilotButton: React.FC<IButtonProps> = ({ className, ...props }) => {
  const { chat, updateValue } = useCopilotStore();

  return (
    <Button
      className={cn(styles.button, className)}
      type="button"
      onClick={() =>
        updateValue("chat", { ...chat, isOpen: !chat.isOpen, meta: undefined })
      }
      {...props}
    >
      <img src="/img/icons/ai.svg" alt="AI" />
      <span>Ask Copilot</span>
    </Button>
  );
};
