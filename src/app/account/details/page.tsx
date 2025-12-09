"use client";

import { useEffect } from "react";
import cn from "classnames";
import { ChangeAccountDetailsForm } from "@/features/change-account-details";
import { useAuth } from "@/shared/hooks/auth";
import styles from "./styles.module.scss";

export default function Page() {
  const { user, userProfile, refreshUserProfile, loading } = useAuth();

  // Загружаем данные пользователя при переходе на страницу
  useEffect(() => {
    if (!loading && user && !userProfile) {
      refreshUserProfile();
    }
  }, [user, userProfile, loading, refreshUserProfile]);

  return (
    <div className={styles.content}>
      <h1 className={cn(styles.title, "title--2xl")}>Account Details</h1>
      <ChangeAccountDetailsForm className={styles.form} />
    </div>
  );
}
