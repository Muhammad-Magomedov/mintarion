import Link from "next/link";
import cn from "classnames";
import { BsThreeDotsVertical } from "react-icons/bs";
import { ChevronRight, Star } from "lucide-react";
import * as defaultData from "@/shared/temp/data";
import styles from "./styles.module.scss";

export const RecentArticlesCard = () => {
  return (
    <div
      className={cn(
        styles.card,
        "bg-linear-to-b dark:from-zinc-900 dark:to-neutral-900 dark:border-gray-650"
      )}
    >
      <div className={styles.header}>
        <h3 className={cn(styles.title, "title--lg", "dark:text-white")}>
          Recents Article
        </h3>
        <Link className={cn(styles.headerLink, "dark:text-neutral-300")} href="/articles/dashboard">
          <span>View all</span>
          <ChevronRight height="1em" />
        </Link>
      </div>
      <ul className={styles.list}>
        {defaultData.articles.slice(0, 3).map(({ id, title, imgSrc }) => (
          <li
            className={cn(
              styles.listItem,
              "bg-linear-to-b",
              "dark:hover:from-green-850 dark:hover:to-green-900 dark:border-t-gray-650"
            )}
            key={id}
          >
            <div className={styles.listItemLeft}>
              <img className={styles.listItemImage} src={imgSrc} alt="" />
              <div className={styles.listItemInfo}>
                <h4 className={styles.listItemTitle}>
                  {title.slice(0, 33)}...
                </h4>
                <div
                  className={cn(styles.listItemMeta, "dark:text-neutral-300")}
                >
                  <span className={styles.listItemDate}>2025/08/30</span>
                  &nbsp;&bull;&nbsp;
                  <span className={styles.listItemUsername}>Username</span>
                </div>
                <div className={cn(styles.listItemLikes, "dark:text-neutral-300")}>
                  <Star height="1em" />
                  <span>0</span>
                </div>
              </div>
            </div>
            <div className={styles.listItemRight}>
              <ul className={styles.listItemStats}>
                <li className={styles.listItemStatsItem}>
                  <span className={styles.listItemStatsValue}>1234</span>
                  <span
                    className={cn(
                      styles.listItemStatsDesc,
                      "dark:text-neutral-300"
                    )}
                  >
                    Followers
                  </span>
                </li>
                <li className={styles.listItemStatsItem}>
                  <span className={styles.listItemStatsValue}>1234</span>
                  <span
                    className={cn(
                      styles.listItemStatsDesc,
                      "dark:text-neutral-300"
                    )}
                  >
                    Views
                  </span>
                </li>
                <li className={styles.listItemStatsItem}>
                  <span className={styles.listItemStatsValue}>1,1%</span>
                  <span
                    className={cn(
                      styles.listItemStatsDesc,
                      "dark:text-neutral-300"
                    )}
                  >
                    Opened
                  </span>
                </li>
              </ul>
              <BsThreeDotsVertical height="1.5em" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
