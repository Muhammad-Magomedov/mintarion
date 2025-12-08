import cn from "classnames";
import { ChevronDown } from "lucide-react";
import { Button } from "@/shared/ui/Button/Button";
import { Switch } from "@/shared/ui/Switch/Switch";
import styles from "./styles.module.scss";

export default function PaymentSettingsPage() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1
          className={cn(
            styles.title,
            "title--2xl",
            "text-neutral-950 dark:text-white"
          )}
        >
          Payment Settings
        </h1>
      </div>
      <div
        className={cn(
          styles.body,
          "bg-linear-to-b",
          "from-green-20 to-green-40 border-green-800 text-neutral-950",
          "dark:from-zinc-900 dark:to-neutral-900 dark:border-gray-650 dark:text-white"
        )}
      >
        <div className={styles.row}>
          <h3 className={cn(styles.title, "title--lg")}>Payments</h3>
        </div>
        <div
          className={cn(
            styles.row,
            "border-t-[1px] border-t-solid border-t-[rgba(61,105,60,0.2)] dark:border-t-gray-650"
          )}
        >
          <div className={styles.col}>
            <h5 className={cn(styles.caption, "font-semibold")}>Connect Stripe</h5>
            <p className={cn(styles.desc, "text-[#5B5B5B] dark:text-neutral-300")}>
              Takes about 5 minutes. This is how money from subscribers gets to
              your bank account. Stripe may display your business phone number
              and address on subscriber invoices unless hidden. Learn more
            </p>
          </div>
          <Button className={styles.btn}>
            <span>Connect with</span>
            <img src="/img/icons/stripe.svg" alt="" height="1em" />
          </Button>
        </div>
        <div
          className={cn(
            styles.row,
            "border-t-[1px] border-t-solid border-t-[rgba(61,105,60,0.2)] dark:border-t-gray-650"
          )}
        >
          <h3 className={cn(styles.title, "title--lg")}>Pledges</h3>
        </div>
        <div
          className={cn(
            styles.row,
            "border-t-[1px] border-t-solid border-t-[rgba(61,105,60,0.2)] dark:border-t-gray-650"
          )}
        >
          <div className={styles.col}>
            <h5 className={cn(styles.caption, "font-semibold")}>
              Allow readers to pledge subscriptions
            </h5>
            <p className={cn(styles.desc, "text-[#5B5B5B] dark:text-neutral-300")}>
              When turned on, readers will be able to pledge to pay for a future
              paid subscription
            </p>
          </div>
          <Switch
            className={styles.switch}
            activeClassName="bg-linear-to-tr dark:bg-from-[rgba(48,83,47,0.8)] dark:bg-to-[rgba(149,251,149,0.8)]"
            variant="green"
          />
        </div>
        <div
          className={cn(
            styles.row,
            "border-t-[1px] border-t-solid border-t-[rgba(61,105,60,0.2)] dark:border-t-gray-650"
          )}
        >
          <div className={styles.col}>
            <h5 className={cn(styles.caption, "font-semibold")}>Monthly pledge amount</h5>
            <p className={cn(styles.desc, "text-[#5B5B5B] dark:text-neutral-300")}>
              The amount pledged subscribers are asked to pay per month
            </p>
          </div>
        </div>
        <div
          className={cn(
            styles.row,
            "border-t-[1px] border-t-solid border-t-[rgba(61,105,60,0.2)] dark:border-t-gray-650"
          )}
        >
          <div className={styles.col}>
            <h5 className={cn(styles.caption, "font-semibold")}>Annual pledge amount</h5>
            <p className={cn(styles.desc, "text-[#5B5B5B] dark:text-neutral-300")}>
              The amount pledged subscribers are asked to pay per year
            </p>
          </div>
        </div>
        <div
          className={cn(
            styles.row,
            "border-t-[1px] border-t-solid border-t-[rgba(61,105,60,0.2)] dark:border-t-gray-650"
          )}
        >
          <div className={styles.col}>
            <h5 className={cn(styles.caption, "font-semibold")}>Founding pledge amount</h5>
            <p className={cn(styles.desc, "text-[#5B5B5B] dark:text-neutral-300")}>
              The amount pledged founding members are asked to pay per year
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
