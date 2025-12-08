"use client"

import cn from "classnames";
import { SubscriptonCard } from "@/features/manage-subscription";
import { subscriptionPlans } from "@/shared/data/subscription";
import { useAuth } from "@/shared/hooks/auth";
import styles from "./styles.module.scss";

interface Props extends React.HTMLAttributes<HTMLUListElement> {}

export const SubscriptionPlans: React.FC<Props> = ({ className, ...props }) => {
  const { userProfile } = useAuth();

  return (
    <ul className={cn(styles.cardList, className)} {...props}>
      {subscriptionPlans.map((data) => (
        <SubscriptonCard
          className={styles.card}
          isActive={userProfile?.subscriptionPlan === data.plan}
          // isActive={true}
          data={data}
          as="li"
        />
      ))}
    </ul>
  );
};
