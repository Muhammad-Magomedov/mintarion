import Link from "next/link";
import cn from "classnames";
import { ChevronRight } from "lucide-react";
import * as defaultData from "@/shared/temp/data";
import styles from "./styles.module.scss";

export const DraftArticlesCard = () => {
  return (
    <div
      className={cn(
        styles.card,
        "bg-linear-to-b",
        "from-green-20 to-green-40 border-green-800 text-neutral-950",
        "dark:from-zinc-900 dark:to-neutral-900 dark:border-gray-650 dark:text-white"
      )}
    >
      <div className={styles.header}>
        <h3 className={cn(styles.title, "title--lg", "dark:text-white")}>
          Drafts
        </h3>
        <Link
          className={cn(
            styles.headerLink,
            "text-green-750 dark:text-neutral-300"
          )}
          href="/articles/dashboard/list/drafts"
        >
          <span>View all</span>
          <ChevronRight height="1em" />
        </Link>
      </div>
      <div className={styles.body}>
        <ul className={styles.list}>
          {defaultData.articles.slice(0, 4).map(({ id, title }) => (
            <li
              className={cn(
                styles.listItem,
                "bg-linear-to-b",
                "hover:from-slate-250 hover:to-green-200 border-t-[rgba(61,105,60,0.2)]",
                "dark:hover:from-green-850 dark:hover:to-green-900 dark:border-t-gray-650"
              )}
              key={id}
            >
              <div className={styles.listItemText}>
                <h4 className={styles.listItemTitle}>
                  {title.slice(0, 33)}...
                </h4>
                <div
                  className={cn(styles.listItemMeta, "text-[#5B5B5B] dark:text-neutral-300")}
                >
                  Edited 2025/08/30, 14:14
                </div>
              </div>
              <Link
                className={cn(
                  styles.listItemBtn,
                  "bg-linear-to-tr",
                  "hover:from-green-800 hover:to-green-700 hover:text-white border-green-800 text-green-750",
                  "dark:hover:from-green-800 dark:hover:to-green-300 dark:text-white"
                )}
                href="/articles/dashboard/list/drafts"
              >
                Draft
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
