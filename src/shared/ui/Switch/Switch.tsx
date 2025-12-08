import React, { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import cn from "classnames";
import styles from "./styles.module.scss";

export const switchVariants = cva("", {
  variants: {
    variant: {
      default: styles.default,
      primary: styles.primary,
      green: styles.green
    },
    size: {
      xs: styles.xs,
      sm: styles.sm,
      md: styles.md,
      lg: styles.lg,
    },
  },
  defaultVariants: {
    variant: "default",
    size: "sm",
  },
});

export interface SwitchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size">,
    VariantProps<typeof switchVariants> {
  activeClassName?: string;
  label?: string;
  disabled?: boolean;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, activeClassName, label, disabled, variant, size, ...props }, ref) => {
    return (
      <label className={cn(styles.switchLabel, className)}>
        <input
          ref={ref}
          type="checkbox"
          className={styles.switchInput}
          disabled={disabled}
          {...props}
        />
        <span
          className={cn(styles.switchToggle, activeClassName, switchVariants({ variant, size }), {
            [styles.disabled]: disabled,
          })}
        >
          <span className={styles.switchThumb} />
        </span>
        {label && <span className={styles.switchText}>{label}</span>}
      </label>
    );
  }
);

Switch.displayName = "Switch";
