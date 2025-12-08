"use client"

import cn from "classnames";
import { Check, X } from "lucide-react";
import { Button } from "@/shared/ui/Button/Button";
import { useThemeStore } from "@/features/toggle-theme";
import { useCreateArticleStore } from "@/features/create-article";
import styles from "./styles.module.scss";

export interface INewArticleNotificationProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export const NewArticleNotification: React.FC<INewArticleNotificationProps> = ({
  className,
}) => {
  const { theme } = useThemeStore();
  const { updateValue } = useCreateArticleStore();

  return (
    <div
      className={cn(
        styles.content,
        className,
        "bg-linear-to-tr",
        "from-[rgba(48,83,47,1)] to-[rgba(149,251,149,1)] dark:border-green-800",
        "dark:from-[rgba(48,83,47,0.4)] dark:to-[rgba(149,251,149,0.4)] dark:border-green-800"
      )}
    >
      <div className={styles.header}>
        <button className={styles.closeBtn} onClick={() => updateValue("isNewArticlePublished", false)}>
          <X height="1em" />
        </button>
      </div>
      <div className={styles.body}>
        <div className={cn(styles.circle, "bg-linear-to-tr from-green-800 to-green-300")}>
          <Check height="1em" />
        </div>
        <h3 className={cn(styles.title, "title--2xl", "!text-white")}>
          Your article is live!
        </h3>
        <p className={cn(styles.desc, "text-white")}>
          Congratulations — your post has been published successfully. Share it
          with your audience and keep writing!
        </p>
        <Button className={cn(styles.shareBtn)} variant={theme === "dark" ? "darkGreen" : "white"}>Share</Button>
      </div>
    </div>
  );
};
