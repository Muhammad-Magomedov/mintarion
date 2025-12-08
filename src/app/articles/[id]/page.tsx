"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import cn from "classnames";
import { ChevronLeft, ChevronRight, Star, Bookmark } from "lucide-react";
import { RiShareForwardLine } from "react-icons/ri";
import { ArticleCard, useArticle, useArticles, useArticleWithNavigation } from "@/entities/article";
import { Button } from "@/shared/ui/Button/Button";
import {
  formatDateShort,
  formatDateYYYYMMDD,
  isValidISOString,
} from "@/shared/utils";
import styles from "./styles.module.scss";
import type { IArticle } from "@/shared/types/entities/article";

export default function Article() {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const { data: articlesData } = useArticles()
  const { data: currentArticleData } = useArticle(id);
  const { data: nextArticleData } = useArticle(id, { direction: "next" });

  return (
    <div className={styles.content}>
      <div className={cn(styles.header, "bg-[#C5DAC4] dark:bg-transparent dark:border-b-gray-650")}>
        <Link className={cn(styles.headerLink, "text-green-750 dark:text-gray-400")} href="/articles">
          <ChevronLeft height="1em" />
          <span>Back to Articles</span>
        </Link>
        {nextArticleData?.data && (
          <Link className={cn(styles.headerLink, "dark:text-gray-400")} href={`/articles/${nextArticleData.data.id}`}>
            <ChevronLeft height="1em" />
            <span>Next Article</span>
          </Link>
        )}
      </div>
      <div className={styles.body}>
        <div className={cn(styles.bodyContentWrapper, "dark:border-r-gray-650")}>
          <div className={styles.bodyContentHeader}>
            <Button variant="lightGreen">Follow</Button>
            <div className={styles.bodyContentTools}>
              <button
                className={cn(
                  styles.bodyContentToolBtn,
                  "bg-transparent border-green-800 hover:bg-green-20 dark:hover:bg-green-800"
                )}
                type="button"
              >
                <Star className="text-green-750 dark:text-white" height="1em" />
              </button>
              <button
                className={cn(
                  styles.bodyContentToolBtn,
                  "bg-transparent border-green-800 hover:bg-green-20 dark:hover:bg-green-800"
                )}
                type="button"
              >
                <Bookmark className="text-green-750 dark:text-white" height="1em" />
              </button>
              <button
                className={cn(
                  styles.bodyContentToolBtn,
                  "bg-transparent border-green-800 hover:bg-green-20 dark:hover:bg-green-800"
                )}
                type="button"
              >
                <RiShareForwardLine className="text-green-750 dark:text-white" height="1em" />
              </button>
            </div>
          </div>
          <div className={styles.bodyContent}>
            {currentArticleData?.data && (
              <article className={styles.article}>
                <h1 className={cn(styles.articleTitle, "text-neutral-950 dark:text-white")}>{currentArticleData.data.title}</h1>
                <div className={styles.articleMeta}>
                  <div className={styles.userInfo}>
                    <div className={styles.userAvatarWrapper}>
                      {currentArticleData.data.author.avatarUrl &&
                        currentArticleData.data.author.avatarUrl?.length > 0 && (
                          <img className={styles.userAvatar} src="" alt="" />
                        )}
                    </div>
                    {!!currentArticleData.data.author.firstName || !!currentArticleData.data.author.lastName
                      ? <span className={cn(styles.userName, "text-[#999595] dark:text-white")}>{currentArticleData.data.author.firstName} {currentArticleData.data.author.lastName}</span>
                      : <span className="text-[#999595] dark:text-white">Unknown Author</span>}
                  </div>
                  {isValidISOString(new Date(currentArticleData.data.createdAt).toISOString()) ? (
                    <time className="text-[#999595] dark:text-gray-400" dateTime={formatDateYYYYMMDD(currentArticleData.data.createdAt)}>
                      {formatDateShort(currentArticleData.data.createdAt)}
                    </time>
                  ) : (
                    <span></span>
                  )}
                </div>
                <div className={cn(styles.articleContent, "text-[#5B5B5B] dark:text-white")} dangerouslySetInnerHTML={{ __html: currentArticleData.data.content }} />
              </article>
            )}
          </div>
        </div>
        <div className={styles.bodyCardListWrapper}>
          <h3 className={cn(styles.title, "title--2xl font-semibold")}>Recommended</h3>
          <ul className={styles.bodyCardList}>
            {articlesData?.data.map((data) => (
              <ArticleCard
                className={styles.articleCard}
                key={data.id}
                data={data}
                as="li"
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
