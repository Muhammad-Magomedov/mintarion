"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import cn from "classnames";
import { CreateArticleButton } from "@/features/create-article";
import { ViewProfileButton } from "@/features/view-user-profile";
import { useAuth } from "@/shared/hooks/auth";
import styles from "./styles.module.scss";

export interface ICreatorDashboardSidebarProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
}

const mainLinks = [
  { label: "Main", href: "/articles/dashboard" },
  { label: "Payment Settings ", href: "/articles/dashboard/payment/settings" },
];

const myArticlesLinks = [
  { label: "Published", href: "/articles/dashboard/list/published" },
  { label: "Scheduled", href: "/articles/dashboard/list/scheduled" },
  { label: "Drafts", href: "/articles/dashboard/list/drafts" },
];

const collectionLinks = [
  { label: "Liked", href: "/articles/dashboard/liked" },
  { label: "Saved", href: "/articles/dashboard/saved" },
];

export const CreatorDashboardSidebar: React.FC<
  ICreatorDashboardSidebarProps
> = ({ className, title = "Creator’s Dashboard" }) => {
  const pathname = usePathname();
  const { user } = useAuth();

  return (
    <aside
      className={cn(
        styles.sidebar,
        "bg-linear-to-b",
        "from-[rgba(197,218,196,0.6)] to-[rgba(197,218,196,0.6)]",
        "dark:from-[rgba(25,29,26,0.6)] dark:to-[rgba(20,25,21,0.6)]",
        className
      )}
    >
      <h3 className={cn(styles.title, "title--lg", "text-neutral-950 dark:text-white")}>
        {title}
      </h3>
      <div className={cn(styles.separator, "bg-[rgba(61,105,60,0.2)] dark:bg-gray-650")}></div>
      <div className={styles.actionBtnList}>
        <CreateArticleButton className={styles.actionBtn} />
        <ViewProfileButton
          className={styles.actionBtn}
          userId={user?.id ?? ""}
        />
      </div>
      {mainLinks.map(({ label, href }) => (
        <React.Fragment key={`mainLinks-${label}-${href}`}>
          <div className={cn(styles.separator, "bg-[rgba(61,105,60,0.2)] dark:bg-gray-650")}></div>
          <Link
            className={cn(
              styles.link,
              pathname.endsWith(href)
                ? "bg-linear-to-tr from-[rgba(48,83,47,0.2)] to-[rgba(149,251,149,0.2)]"
                : "",
              "title--2xl"
            )}
            href={href}
          >
            {label}
          </Link>
        </React.Fragment>
      ))}
      <div className={cn(styles.separator, "bg-[rgba(61,105,60,0.2)] dark:bg-gray-650")}></div>
      <div className={styles.box}>
        <h3 className={cn(styles.boxTitle, "title--lg", "text-neutral-950 dark:text-white")}>
          My Articles
        </h3>
        <ul className={styles.list}>
          {myArticlesLinks.map(({ label, href }) => (
            <li
              className={styles.listItem}
              key={`myArticlesLinks-${label}-${href}`}
            >
              <Link
                className={cn(
                  styles.listItemLink,
                  "text-[#5B5B5B] dark:text-gray-400",
                  pathname.includes(href) ? "text-neutral-950 dark:text-white" : ""
                )}
                href={href}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className={cn(styles.separator, "bg-[rgba(61,105,60,0.2)] dark:bg-gray-650")}></div>
      <div className={styles.box}>
        <h3 className={cn(styles.boxTitle, "title--lg", "text-neutral-950 dark:text-white")}>
          Сollection
        </h3>
        <ul className={styles.list}>
          {collectionLinks.map(({ label, href }) => (
            <li
              className={styles.listItem}
              key={`connectionLinks-${label}-${href}`}
            >
              <Link
                className={cn(
                  styles.listItemLink,
                  "text-[#5B5B5B] dark:text-gray-400",
                  pathname.includes(href) ? "text-neutral-950 dark:text-white" : ""
                )}
                href={href}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};
