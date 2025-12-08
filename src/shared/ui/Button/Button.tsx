import { forwardRef, type Ref } from "react";
import Link from "next/link";
import cn from "classnames";
import { cva, type VariantProps } from "class-variance-authority";
import styles from "./styles.module.scss";

export const buttonVariants = cva("", {
  variants: {
    variant: {
      primary: "bg-linear-to-b from-green-20 to-green-40 border-green-800 dark:from-zinc-900 dark:to-neutral-900 dark:border-gray-650",
      primaryOutline: "bg-linear-to-b from-green-20 to-green-40 border-[1px] border-solid border-green-800 dark:from-transparent dark:to-transparent",
      lightGreen: styles[`variant-lightGreen`],
      darkGreen: styles[`variant-darkGreen`],
      red: styles[`variant-red`],
      "outline-lightGreen": styles[`variant-outline-lightGreen`],
      "outline-darkGreen": styles[`variant-outline-darkGreen`],
      white: styles[`variant-white`],
      transparent: styles[`variant-transparent`],
    },
    shape: {
      rectangle: styles.rectangle,
      square: styles.square
    }
  },
  defaultVariants: {
    variant: "darkGreen",
    shape: "rectangle"
  }
})

export type ButtonElementAttributesType =
  React.ButtonHTMLAttributes<HTMLButtonElement> &
    React.AnchorHTMLAttributes<HTMLAnchorElement>;
export type ButtonElementType = HTMLButtonElement | HTMLAnchorElement;

export interface IButtonProps extends ButtonElementAttributesType, VariantProps<typeof buttonVariants> {
  gradient?: boolean;
  border?: boolean;
  hover?: boolean;
  as?: "button" | "link";
}

export const Button = forwardRef(
  (props: IButtonProps, ref: Ref<ButtonElementType>) => {
    const {
      children,
      className = "",
      variant,
      shape,
      gradient = true,
      border = true,
      hover = false,
      as = "button",
      ...otherProps
    } = props;

    const classname = cn(
      styles.button,
      buttonVariants({ variant, shape }),
      gradient ? styles.gradient : "",
      border ? styles.border : "",
      "hover:opacity-80 dark:hover:opacity-50",
      className
    );

    if (as === "link") {
      return (
        <Link
          className={classname}
          href={props.href ?? ""}
          ref={ref as Ref<HTMLAnchorElement>}
          {...otherProps}
        >
          {children}
        </Link>
      );
    }

    return (
      <button
        className={classname}
        ref={ref as Ref<HTMLButtonElement>}
        {...otherProps}
      >
        {children}
      </button>
    );
  }
);