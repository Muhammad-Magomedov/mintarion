"use client";

import Link from "next/link";
import cn from "classnames";
import { ChevronRight } from "lucide-react";
import {
  ArticleCard,
  useArticles,
} from "@/entities/article";
import styles from "./styles.module.scss";
import type { IArticleCardProps } from "@/entities/article";
import type { IArticleBaseData } from "@/shared/types/entities/article";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  category?: IArticleBaseData["category"];
  filter?: string;
  title?: string;
  cols: number;
  limit?: number;
  showLink?: boolean;
  linkText?: string;
  cardProps?: Omit<IArticleCardProps, "data">;
}

export const ArticlesGrid: React.FC<Props> = ({
  className,
  category,
  filter,
  title,
  cols = 1,
  limit = 3,
  showLink,
  linkText = "See all",
  cardProps,
  ...props
}) => {
  const { data } = useArticles();

  return (
    <div className={cn(styles.content, className)} {...props}>
      <div className={styles.header}>
        {title ? (
          <h3 className={cn(styles.title, "title--2xl")}>{title}</h3>
        ) : (
          <span></span>
        )}
        {showLink && linkText && (
          <Link
            className={cn(styles.headerLink, "text-green-750 dark:text-neutral-300")}
            href={`/articles?${filter ? `filter=${filter}` : ""}${category ? `category=${category}` : ""}`}
          >
            <span>{linkText}</span>
            <ChevronRight height="1em" />
          </Link>
        )}
      </div>
      <div className={styles.body}>
        <ul
          className={cn(styles.cardList)}
          style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
        >
          {data?.data.slice(0, limit).map((data) => (
            <ArticleCard data={data} as="li" key={data.id} {...cardProps} />
          ))}
        </ul>
      </div>
    </div>
  );
};
