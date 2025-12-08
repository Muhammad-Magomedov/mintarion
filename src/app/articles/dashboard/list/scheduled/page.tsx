"use client"

import { useRouter } from "next/navigation";
import cn from "classnames";
import { ArticlesFilter } from "@/features/filter-articles";
import { CreateArticleButton } from "@/features/create-article";
import { CreatorDashboardArticlesCard } from "@/widgets/CreatorDashboardArticlesCard/CreatorDashboardArticlesCard";
import styles from "../styles.module.scss";

export default function ScheduledArticlesPage() {
  const router = useRouter();

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={cn(styles.title, "title--2xl")}>My Articles</h1>
      </div>
      <div className={styles.body}>
        <div className={styles.row}>
          <div className={styles.tabs}>
            <button
              className={cn(
                styles.tab,
                "border-green-800 text-green-750",
                "dark:text-[#C9C9C9]"
              )}
              onClick={() => router.push("/articles/dashboard/list/published")}
              type="button"
            >
              <span>Published</span>
              <span>10</span>
            </button>
            <button
              className={cn(
                styles.tab,
                "bg-linear-to-b from-green-700 to-green-800 text-white",
                "dark:bg-linear-to-tr dark:from-[rgba(48,83,47,0.4)] dark:to-[rgba(149,251,149,0.4)]"
              )}
              onClick={() => router.push("/articles/dashboard/list/scheduled")}
              type="button"
            >
              <span>Scheduled</span>
              <span>10</span>
            </button>
            <button
              className={cn(
                styles.tab,
                "border-green-800 text-green-750",
                "dark:text-[#C9C9C9]"
              )}
              onClick={() => router.push("/articles/dashboard/list/drafts")}
              type="button"
            >
              <span>Drafts</span>
              <span>10</span>
            </button>
          </div>
          <CreateArticleButton className={styles.createArticleBtn} />
        </div>
        <ArticlesFilter className={styles.articlesFilter} classNames={{ searchForm: styles.articlesFilterSearchForm }} />
        <CreatorDashboardArticlesCard title="Scheduled" />
      </div>
    </div>
  );
}
