"use client";

import { useState, forwardRef, type Ref } from "react";
import { Check } from "lucide-react";
import cn from "classnames";
import styles from "./styles.module.scss";

export interface ICheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "primary" | "darkGreen";
  label?: string;
  onValueChange?: (value: boolean) => void;
}

const getColorByVariant = (variant: "primary" | "darkGreen") => {
  switch (variant) {
    case "primary":
      return "#fff";
    case "darkGreen":
      return "#A4A2A2";
    default:
      return "#000";
  }
}

export const Checkbox = forwardRef(
  (props: ICheckboxProps, ref: Ref<HTMLInputElement>) => {
    const {
      className = "",
      checked = false,
      variant = "primary",
      label,
      onValueChange,
      ...otherProps
    } = props;
    return (
      <div className={styles.container}>
        <input
          className="hidden"
          ref={ref}
          type="checkbox"
          checked={checked}
          onChange={(e) => onValueChange && onValueChange(e.target.checked)}
          {...otherProps}
        />
        <span
          className={cn(
            styles.content,
            styles[`variant-${variant}`],
            "bg-gradient-to-b",
            "light:border-slate-300",
            `dark:border-gray-650 "checked:dark:from-white checked:dark:to-white`,
            variant === "primary" && cn(
              `light:from-[#F3F8F2] light:to-[#E1EEDE]`,
              `dark:from-[#272727] dark:to-[#151515]`,
            ),
            variant === "darkGreen" && cn(
              `dark:from-zinc-900 dark:to-neutral-900 checked:bg-transparent`
            ),
            className
          )}
          onClick={() => onValueChange && onValueChange(!checked)}
        >
          {checked && <Check className={styles.icon} color={getColorByVariant(variant)} />}
        </span>
        
      </div>
    );
  }
);
