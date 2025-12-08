"use client";

import { useMemo } from "react";
import cn from "classnames";
import { NewsFilter, useFilteredNews } from "@/features/filter-news";
import {
  useCopilotStore,
  type ICopilotChat,
} from "@/features/ask-copilot";
import { NewsCard } from "@/entities/news";
import styles from "./styles.module.scss";
import type { INewsBaseData } from "@/shared/types/entities/news";

const copilotMeta: ICopilotChat["meta"] = {
  refferer: {
    text: "Explain this article, Conclusions",
  },
  imgSrc: "/img/coin/coins.svg",
  tags: ["Bullish"],
  title:
    "Bitcoin surged past $65,000 today, driven by renewed investor optimism and growing institutional interest.",
  source: "CoinDesk",
  createdAt: "2025-09-10T17:53:08.170Z",
};

export const NewsFeed: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className = "",
  ...props
}) => {
  const { chat, updateValue: updateCopilotState } = useCopilotStore();
  const { data } = useFilteredNews();
  const filteredNewsData = useMemo(() => {
    const news = data?.items;
    if (!news) {
      return {
        bullish: [],
        neutral: [],
        bearish: [],
      };
    }

    return {
      bullish: news.filter((item) => item.newsType === "bullish"),
      neutral: news.filter((item) => item.newsType === "neutral"),
      bearish: news.filter((item) => item.newsType === "bearish"),
    };
  }, [data]);

  const handleCardClick = (data: INewsBaseData) => {
    const { title, tags, source, createdAt } = data;

    updateCopilotState("chat", {
      ...chat,
      isOpen: true,
      meta: {
        refferer: {
          text: "Explain this news"
        },
        tags,
        title,
        source,
        createdAt
      }
    })
  }

  return (
    <div className={cn(styles.content, className)} {...props}>
      <NewsFilter />
      <div className={styles.boxList}>
        <div
          className={cn(
            styles.box,
            "bg-gradient-to-b from-green-300 to-green-800",
            "dark:from-gray-550 dark:to-gray-650"
          )}
        >
          <div
            className={cn(
              styles.boxContent,
              "bg-gradient-to-b from-green-20 to-green-40",
              "dark:from-zinc-900 dark:to-neutral-900"
            )}
          >
            <div className={styles.boxHeader}>
              <h3 className={cn(styles.boxTitle, "title--2xl")}>Bullish</h3>
              <span className="circle circle--green" />
            </div>
            <ul className={styles.boxCardList}>
              {filteredNewsData.bullish.map((data) => (
                <NewsCard
                  key={data.ID}
                  data={data}
                  as="li"
                  variant="green"
                  onClick={() => handleCardClick(data)}
                />
              ))}
            </ul>
          </div>
        </div>
        <div
          className={cn(
            styles.box,
            "bg-gradient-to-b from-green-300 to-green-800",
            "dark:from-gray-550 dark:to-gray-650"
          )}
        >
          <div
            className={cn(
              styles.boxContent,
              "bg-gradient-to-b from-green-20 to-green-40",
              "dark:from-zinc-900 dark:to-neutral-900"
            )}
          >
            <div className={styles.boxHeader}>
              <h3 className={cn(styles.boxTitle, "title--2xl")}>Neutral</h3>
              <span className="circle circle--yellow" />
            </div>
            <ul className={styles.boxCardList}>
              {filteredNewsData.neutral.map((data) => (
                <NewsCard
                  key={data.ID}
                  data={data}
                  as="li"
                  variant="yellow"
                  onClick={() => handleCardClick(data)}
                />
              ))}
            </ul>
          </div>
        </div>
        <div
          className={cn(
            styles.box,
            "bg-gradient-to-b from-green-300 to-green-800",
            "dark:from-gray-550 dark:to-gray-650"
          )}
        >
          <div
            className={cn(
              styles.boxContent,
              "bg-gradient-to-b from-green-20 to-green-40",
              "dark:from-zinc-900 dark:to-neutral-900"
            )}
          >
            <div className={styles.boxHeader}>
              <h3 className={cn(styles.boxTitle, "title--2xl")}>Bearish</h3>
              <span className="circle circle--red" />
            </div>
            <ul className={styles.boxCardList}>
              {filteredNewsData.bearish.map((data) => (
                <NewsCard
                  key={data.ID}
                  data={data}
                  as="li"
                  variant="red"
                  onClick={() => handleCardClick(data)}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
