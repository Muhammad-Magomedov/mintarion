import cn from "classnames";
import { SubscriptionPlans } from "@/widgets/SubscriptionPlans/SubscriptionPlans";
import styles from "./styles.module.scss";

export default function Page() {
  return (
    <div className={styles.content}>
      <h1 className={cn(styles.title, "title--2xl")}>Subscription Plans</h1>
      <SubscriptionPlans className={styles.cardList} />
    </div>
  );
}
