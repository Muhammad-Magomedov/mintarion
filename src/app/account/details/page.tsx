"use client";

import cn from "classnames";
import { ChangeAccountDetailsForm } from "@/features/change-account-details";
import styles from "./styles.module.scss";

export default function Page() {
  return (
    <div className={styles.content}>
      <h1 className={cn(styles.title, "title--2xl")}>Account Details</h1>
      <ChangeAccountDetailsForm className={styles.form} />
    </div>
  );
}
