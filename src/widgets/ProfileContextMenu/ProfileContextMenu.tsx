"use client"

import React, { forwardRef, type Ref } from "react";
import Link from "next/link";
import cn from "classnames";
import { Avatar } from "@/shared/ui/Avatar/Avatar";
import { useAuth } from "@/shared/hooks/auth";
import styles from "./styles.module.scss";

export const ProfileContextMenu = forwardRef((props: React.HTMLAttributes<HTMLDivElement>, ref: Ref<HTMLDivElement>) => {
  const { className, ...restProps } = props;
  const { user, userProfile, signOut } = useAuth();

  const classNames = {
    btn: cn(
      styles.btn,
      "bg-linear-30",
      "hover:from-green-800 hover:to-green-700"
    ),
  };

  return (
    <div
      className={cn(
        styles.content,
        "bg-linear-to-b",
        "from-green-700 to-green-800 dark:from-green-850 dark:to-green-900 dark:border-gray-650",
        className
      )}
      ref={ref}
      {...restProps}
    >
      <div className={styles.header}>
        <Avatar user={user} />
        <div className={styles.userInfo}>
          <h4 className={cn(styles.userName, "dark:text-white")}>
            {userProfile?.firstName} {userProfile?.lastName}
          </h4>
          <span className={cn(styles.userEmail, "dark:text-gray-400")}>
            {userProfile?.email}
          </span>
        </div>
      </div>
      <div className={cn(styles.separator, "bg-gray-200", "dark:bg-gray-650")}></div>
      <div className={styles.body}>
        <div className={styles.btnList}>
          <Link className={classNames.btn} href="/account/details">
            Account & Settings
          </Link>
          <Link className={classNames.btn} href="/account/subscription">
            Subscription
          </Link>
        </div>
        <div className={cn(styles.separator, "bg-gray-200", "dark:bg-gray-650")}></div>
        <div className={styles.btnList}>
          <Link className={classNames.btn} href="/articles/dashboard">
            Creator’s Tools
          </Link>
        </div>
        <div className={cn(styles.separator, "bg-gray-200", "dark:bg-gray-650")}></div>
        <div className={styles.btnList}>
          <button onClick={signOut} className={classNames.btn} type="button">
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
})