"use client"

import { useState } from "react";
import cn from "classnames";
import { cva, type VariantProps } from "class-variance-authority";
import { Check, Gift } from "lucide-react";
import { Button } from "@/shared/ui/Button/Button";
import { Switch } from "@/shared/ui/Switch/Switch";
import styles from "./styles.module.scss";
import type { ISubscriptionPlan } from "@/shared/types/entities/subscription";

export const cardVariants = cva("", {
  variants: {
    variant: {
      primary: styles.primary,
      zinc: styles.zinc,
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

export type SubscriptionCardAttributesType =
  React.HTMLAttributes<HTMLDivElement> & React.LiHTMLAttributes<HTMLLIElement>;
export interface ISubscriptionCardProps
  extends SubscriptionCardAttributesType,
    VariantProps<typeof cardVariants> {
  isActive?: boolean;
  as?: "li" | "div";
  data: ISubscriptionPlan;
}

export const SubscriptonCard: React.FC<ISubscriptionCardProps> = ({
  className,
  isActive = false,
  as = "div",
  variant,
  data,
  ...props
}) => {
  const { plan, description, pricePerMonth, pricePerYear, features } = data;
  const [isAnnualPayment, setIsAnnualPayment] = useState<boolean>(false);

  const calculateDiscountPercent = (
    pricePerMonth: number,
    pricePerYear: number
  ) => {
    try {
      return Math.round(
        ((pricePerMonth * 12 - pricePerYear) * 100) / (pricePerMonth * 12)
      );
    } catch (e) {
      return 0;
    }
  };

  const content = (
    <div className={styles.content}>
      <h3 className={styles.title}>
        <span>MintaLab</span>&nbsp;
        <span className="text-[#6BD368]">{plan ?? "Unknown"}</span>
      </h3>
      <p className={cn(styles.desc, "text-neutral-400 dark:text-gray-400")}>{description ?? ""}</p>
      <div className={cn(styles.price, styles.pricePerMonth)}>
        <span
          className={cn(styles.priceTitle, "font-semibold")}
        >
          {pricePerMonth && isAnnualPayment
            ? (pricePerMonth * (Math.abs(100 - calculateDiscountPercent(pricePerMonth, pricePerYear)) / 100)).toFixed(2)
            : pricePerMonth && !isAnnualPayment
            ? pricePerMonth
            : 0}$
        </span>
        &nbsp;
      <span className={cn(styles.priceDesc, "text-neutral-400 dark:text-gray-400")}>
          / month
        </span>
      </div>
      <div className={cn(styles.price, styles.pricePerYear)}>
        <span
          className={cn(styles.priceTitle, "dark:text-white font-semibold")}
        >
          {pricePerYear ?? 0}$
        </span>
        &nbsp;
        <span className={cn(styles.priceDesc, "text-neutral-400 dark:text-gray-400")}>
          / year, billed monthly
        </span>
      </div>
      {!isActive &&
        <div className={styles.discount}>
          <Switch className={styles.switch} onChange={(e) => setIsAnnualPayment(e.target.checked)} variant="primary" />
          <span className="text-gray-400">Bill annually</span>
          <span className="text-[1.5em] text-[#67C564] font-semibold">
            {calculateDiscountPercent(pricePerMonth, pricePerYear)} %
          </span>
          <div className={cn(styles.discountIconWrapper, cardVariants({ variant }))}>
            <Gift height="1em" />
          </div>
        </div>}
      {isActive ? (
        <div className={styles.btnList}>
          <Button className={styles.btn} disabled>Your Current Plan</Button>
          <Button className={styles.btn} variant="red">Cancel subscription</Button>
        </div>
      ) : (
        <div className={styles.btnList}>
          <Button className={styles.btn}>Upgrade to {plan}</Button>
        </div>
      )}
      <ul className={styles.features}>
        {features?.map((desc) => (
          <li className={styles.feature}>
            <div
              className={cn(
                styles.featureIconWrapper,
                cardVariants({ variant })
              )}
            >
              <Check className={styles.checkIcon} height="1em" />
            </div>
            <p>{desc}</p>
          </li>
        ))}
      </ul>
    </div>
  );

  const classname = cn(
    styles.card,
    isActive ? "active" : "",
    cardVariants({ variant }),
    className
  );

  if (as === "li") {
    return (
      <li className={classname} {...props}>
        {content}
      </li>
    );
  }

  return (
    <div className={classname} {...props}>
      {content}
    </div>
  );
};
