import Link from "next/link";
import cn from "classnames";
import { ChevronRight } from "lucide-react";
import * as defaultData from "@/shared/temp/data";
import styles from "./styles.module.scss";

export const ResourcesGrid = () => {
  return (
    <div
      className={cn(
        styles.content,
        "bg-linear-to-b",
        "from-green-20 to-green-40 border-green-800 text-neutral-950",
        "dark:from-zinc-900 dark:to-neutral-900 dark:border-gray-650 dark:text-white"
      )}
    >
      <div className={styles.header}>
        <h3 className={cn(styles.title, "title--lg", "dark:text-white")}>
          Resources
        </h3>
        <Link
          className={cn(styles.headerLink, "text-green-750 dark:text-neutral-300")}
          href="/articles/dashboard"
        >
          <span>View all</span>
          <ChevronRight height="1em" />
        </Link>
      </div>
      <div className={styles.body}>
        <ul className={styles.grid}>
          {defaultData.resources.map(({ id, imgSrc, title, description }) => (
            <li
              className={cn(
                styles.gridItem,
                "bg-linear-to-b",
                "hover:from-slate-250 hover:to-green-200 border-t-[rgba(61,105,60,0.2)]",
                "dark:hover:from-green-850 dark:hover:to-green-900 dark:border-gray-650"
              )}
              key={id}
            >
              <img className={styles.gridItemImage} src={imgSrc} alt="" />
              <div className={styles.gridItemText}>
                <h4 className={styles.gridItemTitle}>{title}</h4>
                <p className={cn(styles.gridItemDesc, "text-[#5B5B5B] dark:text-neutral-300")}>{description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
