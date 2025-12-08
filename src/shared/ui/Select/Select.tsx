import React, { forwardRef, useEffect, type Ref } from "react";
import cn from "classnames";
import * as RadixSelect from "@radix-ui/react-select";
import { cva, type VariantProps } from "class-variance-authority";
import { ChevronDownIcon, ChevronUpIcon, CheckIcon } from "lucide-react";
import styles from "./styles.module.scss";

const variants = cva("", {
  variants: {
    variant: {
      primary: "bg-linear-to-b bg-from-[#F3F8F2] bg-to-[#E1EEDE] border-slate-300 text-green-750 dark:bg-[#151515] dark:border-gray-650 dark:text-neutral-300",
      secondary: "bg-green-20 border-[rgb(214,214,214)] text-green-750 dark:bg-green-980 dark:border-gray-550 dark:text-neutral-300",
      lightGreen: "bg-green-20 border-[rgb(214,214,214)]",
      darkGreen: "bg-green-980 border-gray-550",
      white: "",
      black: "bg-[#151515] border-gray-650 dark:text-neutral-300",
      gradientBlack:
        "bg-gradient-to-b dark:bg-from-[#272727] dark:bg-to-[#151515] dark:border-gray-650 dark:text-neutral-300",
    },
    size: {
      sm: styles.triggerSm,
      md: styles.triggerMd,
      lg: styles.triggerLg,
    },
    state: {
      default: "",
      error: styles.triggerError,
      warning: styles.triggerWarning,
      success: styles.triggerSuccess,
    },
  },
  defaultVariants: {
    variant: "gradientBlack",
    size: "md",
    state: "default",
  },
});

export interface ISelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export type SelectTriggerBasePropsType = React.ComponentPropsWithoutRef<
  typeof RadixSelect.Trigger
> &
  VariantProps<typeof variants>;
export interface ISelectTriggerProps extends SelectTriggerBasePropsType {
  placeholder?: string;
  enableIcon?: boolean;
  icon?: React.ReactNode;
  prefixValue?: React.ReactNode | string;
  suffixValue?: React.ReactNode | string;
}

export type SelectContentBasePropsType = React.ComponentPropsWithoutRef<
  typeof RadixSelect.Content
> &
  VariantProps<typeof variants>;
export interface ISelectContentProps extends SelectContentBasePropsType {}

export type SelectItemBasePropsType = React.ComponentPropsWithoutRef<
  typeof RadixSelect.Item
> &
  VariantProps<typeof variants>;
export interface ISelectItemProps extends SelectItemBasePropsType {}

interface ISelectProps extends VariantProps<typeof variants> {
  options: ISelectOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  className?: string;
  triggerProps?: ISelectTriggerProps;
  contentProps?: ISelectContentProps;
  itemProps?: ISelectItemProps;
  name?: string;
  required?: boolean;
}

export const Select = forwardRef<
  React.ComponentRef<typeof RadixSelect.Trigger>,
  ISelectProps
>(
  (
    {
      options,
      value,
      onValueChange,
      disabled = false,
      variant,
      size,
      state,
      className,
      triggerProps,
      contentProps,
      itemProps,
      name,
      required = false,
      ...props
    },
    ref
  ) => {
    return (
      <RadixSelect.Root
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        name={name}
        required={required}
      >
        <SelectTrigger
          className={triggerProps?.className}
          ref={ref}
          variant={variant}
          {...triggerProps}
        />
        <RadixSelect.Portal>
          <SelectContent {...contentProps}>
            {options.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                disabled={option.disabled}
                variant={variant}
                {...itemProps}
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </RadixSelect.Portal>
      </RadixSelect.Root>
    );
  }
);

Select.displayName = "Select";

export const SelectTrigger = forwardRef<
  React.ComponentRef<typeof RadixSelect.Trigger>,
  ISelectTriggerProps
>(
  (
    {
      className,
      children,
      placeholder,
      enableIcon = true,
      icon,
      prefixValue,
      suffixValue,
      variant,
      size,
      state,
      ...props
    },
    ref
  ) => (
    <RadixSelect.Trigger
      ref={ref}
      className={cn(styles.trigger, "rounded-[5px]", variants({ variant, size, state }), className)}
      {...props}
    >
      {prefixValue}
      <RadixSelect.Value placeholder={placeholder} />
        {enableIcon && (
          <RadixSelect.Icon asChild>
            {icon || <ChevronDownIcon className={styles.triggerIcon} size={15} />}
          </RadixSelect.Icon>
        )}
        {suffixValue}
    </RadixSelect.Trigger>
  )
);

export const SelectContent = forwardRef<
  React.ComponentRef<typeof RadixSelect.Content>,
  ISelectContentProps
>(({ className, children }, ref) => (
  <RadixSelect.Content
    position="popper"
    align="center"
    sideOffset={2}
    className={cn(
      styles.content,
      className,
      "min-w-[var(--radix-select-trigger-width)]",
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
    )}
    ref={ref}
  >
    <RadixSelect.ScrollUpButton className="flex cursor-default items-center justify-center py-1">
      <ChevronUpIcon className="h-4 w-4" />
    </RadixSelect.ScrollUpButton>

    <RadixSelect.Viewport className={styles.selectMenu}>
      {children}
    </RadixSelect.Viewport>

    <RadixSelect.ScrollDownButton className="flex cursor-default items-center justify-center py-1">
      <ChevronDownIcon className="h-4 w-4" />
    </RadixSelect.ScrollDownButton>
  </RadixSelect.Content>
));

SelectContent.displayName = "SelectContent";

export const SelectItem = forwardRef<
  React.ComponentRef<typeof RadixSelect.Item>,
  ISelectItemProps
>(({ className, children, variant, ...props }, ref) => (
  <RadixSelect.Item
    ref={ref}
    className={cn(styles.selectItem, variants({ variant }), className)}
    {...props}
  >
    <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
  </RadixSelect.Item>
));

SelectItem.displayName = "SelectItem";
