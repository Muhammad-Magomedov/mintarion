"use client";

import Link from "next/link";
import cn from "classnames";
import { X } from "lucide-react";
import { Modal, type IModalProps } from "@/shared/ui/Modal/Modal";
import { Button } from "@/shared/ui/Button/Button";
import { useShowErrorModalStore } from "../../model";
import styles from "./styles.module.scss";

export interface IErrorModalProps extends Omit<IModalProps, "children"> {
  title?: string;
  description?: React.ReactNode | string;
  buttonLabel?: string;
}

export const ErrorModal: React.FC<IErrorModalProps> = ({
  title = "Something went wrong",
  description = (
    <>
      Please try again, or&nbsp;<Link href="/support">contact support</Link>
    </>
  ),
  buttonLabel = "Try Again",
}) => {
  const { isOpen, updateValue } = useShowErrorModalStore();

  return (
    <Modal
      bodyClassName={styles.body}
      open={isOpen}
      onOpenChange={(isOpen) => updateValue("isOpen", isOpen)}
      showCloseButton
    >
      <div className={cn(styles.circle, "dark:border-[#8C2A14]")}>
        <X height="1em" />
      </div>
      <div className={styles.text}>
        <h3 className={cn(styles.title, "title--3xl", "dark:text-white")}>
          {title}
        </h3>
        <div className={cn(styles.desc, "dark:text-neutral-300")}>
          {description}
        </div>
      </div>
      <Button
        className={styles.btn}
        onClick={() => updateValue("isOpen", false)}
      >
        {buttonLabel}
      </Button>
    </Modal>
  );
};
