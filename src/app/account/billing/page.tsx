import cn from "classnames";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaRegEdit } from "react-icons/fa";
import { AddPaymentMethodForm } from "@/features/add-payment-method";
import { UpdateBillingInfoForm } from "@/features/update-billing-info";
import { Button } from "@/shared/ui/Button/Button";
import styles from "./styles.module.scss";

export default function Page() {
  return (
    <div className={cn(styles.content, "text-neutral-950 dark:text-white")}>
      <h1 className={cn(styles.title, "title--2xl")}>
        Manage your billing settings
      </h1>
      <div className={styles.boxList}>
        <div className={cn(styles.box, styles.subscription)}>
          <h4 className={styles.boxTitle}>Current subscription</h4>
          <div className={cn(styles.separator, "bg-gray-650")}></div>
          <div className={cn(styles.boxBody, styles.subscriptionBody)}>
            <h3 className={styles.subscriptionTitle}>
              MintaLab LITE Subscription
            </h3>
            <div className={styles.subscriptionPrice}>
              <span className="dark:text-white text-[1.5em]">$33.33</span>&nbsp;
              <span className="text-[#5B5B5B] dark:text-gray-400 text-[1.1em]">/ month</span>
            </div>
            <div className={styles.subscriptionCardDetails}>
              <img
                className={styles.subscriptionCardImage}
                src="/img/cards/Mastercard.jpg"
                alt=""
              />
              <span className="text-[#5B5B5B] dark:text-gray-400">MasterCard **** 1234</span>
            </div>
            <Button className={styles.subscriptionBtn} variant="lightGreen">Update Payment Method</Button>
          </div>
        </div>
        <div className={cn(styles.box, styles.paymentMethods)}>
          <h4 className={styles.boxTitle}>Payment Methods</h4>
          <div className={cn(styles.separator, "bg-gray-650")}></div>
          <div className={cn(styles.boxBody, styles.paymentMethodsBody)}>
            <ul className={styles.paymentMethodsList}>
              {paymentMethods.map(({ id, details }) => (
                <li className={styles.paymentMethodsListItem}>
                  <img
                    className={styles.paymentMethodsListItemImage}
                    src="/img/cards/Mastercard.jpg"
                    alt=""
                  />
                  <span className="dark:text-white text-[1.1em]">
                    {details.name} **** {details.cardNumber.slice(-4)}
                  </span>
                  <span className="dark:text-white text-[1.1em]">
                    Valid thru {details.expirationDate}
                  </span>
                  <button
                    className={styles.paymentMethodsListItemMenuTrigger}
                    type="button"
                  >
                    <BsThreeDotsVertical height="1em" />
                  </button>
                </li>
              ))}
            </ul>
            <AddPaymentMethodForm className={styles.paymentMethodsForm} />
          </div>
        </div>
        <div className={cn(styles.box, styles.billingInfo)}>
          <h4 className={styles.boxTitle}>Billing information</h4>
          <div className={cn(styles.separator, "bg-gray-650")}></div>
          <div className={cn(styles.boxBody, styles.billingInfoBody)}>
            <div className={cn(styles.billingInfoUserData, "text-[1.1em]")}>
              <div className={styles.billingInfoUserDataRow}>
                <span className="text-[#5B5B5B] dark:text-gray-400">Name</span>
                <span className="dark:text-white">{billingInfo.name}</span>
              </div>
              <div className={styles.billingInfoUserDataRow}>
                <span className="text-[#5B5B5B] dark:text-gray-400">Billing Address</span>
                <span className="dark:text-white">{billingInfo.address}</span>
              </div>
            </div>
            <UpdateBillingInfoForm className={styles.billingInfoForm} />
          </div>
        </div>
        <div className={cn(styles.box, styles.billingHistory)}>
          <h4 className={styles.boxTitle}>Billing history</h4>
          <div className={cn(styles.separator, "bg-gray-650")}></div>
          <div className={cn(styles.boxBody, styles.billingHistory)}>
            <table className={styles.billingHistoryTable}>
              <thead>
                <tr>
                  <th className={cn(styles.billingHistoryTableTh, styles.billingHistoryTableThDate)}></th>
                  <th className={cn(styles.billingHistoryTableTh, styles.billingHistoryTableThAmount)}></th>
                  <th className={cn(styles.billingHistoryTableTh, styles.billingHistoryTableThPaid)}></th>
                  <th className={cn(styles.billingHistoryTableTh, styles.billingHistoryTableThSubscriptionPlan)}></th>
                </tr>
              </thead>
              <tbody>
                {billingHistoryList.map(({ date, amount, subscriptionPlan, isPaid }) => (
                  <tr>
                    <td>{date}</td>
                    <td>
                      ${amount}
                    </td>
                    <td align="center">
                      <Button className={styles.billingHistoryListItemBtn} variant={isPaid ? "darkGreen" : "red"} disabled>
                    {isPaid ? "Paid" : "Payment failed"}
                  </Button>
                    </td>
                    <td>{subscriptionPlan}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* <ul className={styles.billingHistoryList}>
              {billingHistoryList.map(({ date, amount, subscriptionPlan, isPaid }) => (
                <li className={styles.billingHistoryListItem}>
                  <span>{date}</span>
                  <span>${amount}</span>
                  <Button className={styles.billingHistoryListItemBtn} variant={isPaid ? "darkGreen" : "red"} disabled>
                    {isPaid ? "Paid" : "Payment failed"}
                  </Button>
                  <span>{subscriptionPlan}</span>
                </li>
              ))}
            </ul> */}
          </div>
        </div>
      </div>
    </div>
  );
}

const paymentMethods: Array<{
  id: string;
  details: { name: string; cardNumber: string; expirationDate: string };
}> = [
  {
    id: "2fe304c9-268e-418a-9aa0-3b9d5911fe1e",
    details: {
      name: "MasterCard",
      cardNumber: "1234123412341234",
      expirationDate: "12/25",
    },
  },
  {
    id: "3d507370-0a56-4181-ad8c-f24ceeebaf28",
    details: {
      name: "MasterCard",
      cardNumber: "1234123412341234",
      expirationDate: "12/25",
    },
  },
  {
    id: "d6fe5b4d-641b-45ce-ab55-29463f33bd64",
    details: {
      name: "MasterCard",
      cardNumber: "1234123412341234",
      expirationDate: "12/25",
    },
  },
];

const billingInfo: { name: string; address: string } = {
  name: "Jacob Carter",
  address: "Omalley Crescent 79 Anchorage, AK 99507 US",
};

const billingHistoryList: Array<{
  date: string;
  amount: number;
  subscriptionPlan: string;
  isPaid: boolean;
}> = [
  {
    date: "2025/10/10",
    amount: 33.33,
    subscriptionPlan: "MintaLab Lite Subscription",
    isPaid: true,
  },
  {
    date: "2025/10/10",
    amount: 33.33,
    subscriptionPlan: "MintaLab Lite Subscription",
    isPaid: false,
  },
  {
    date: "2025/10/10",
    amount: 33.33,
    subscriptionPlan: "MintaLab Lite Subscription",
    isPaid: true,
  },
  {
    date: "2025/10/10",
    amount: 33.33,
    subscriptionPlan: "MintaLab Lite Subscription",
    isPaid: true,
  },
];
