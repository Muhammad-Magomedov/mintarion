"use client"

import cn from "classnames";
import { Button, type IButtonProps } from "@/shared/ui/Button/Button";
import { useEditProfileStore } from "../../model";
import styles from "./styles.module.scss";
import { useEffect } from "react";

export const EditProfileButton: React.FC<IButtonProps> = ({
  className,
  children = "Edit Profile",
  ...props
}) => {
  const { modal, updateValue } = useEditProfileStore();
  
  useEffect(() => console.log("click", modal.isOpen), [modal])

  return (
    <Button
      className={cn(styles.btn, className)}
      onClick={() => updateValue("modal", { ...modal, isOpen: true })}
      {...props}
    >
      {children}
    </Button>
  );
};