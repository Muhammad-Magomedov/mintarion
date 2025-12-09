"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Suspense } from "react";

import { ArticlesHeader } from "@/widgets/ArticlesHeader/ArticlesHeader";
import { ArticlesSlider } from "@/widgets/ArticlesSlider/ArticlesSlider";
import { ArticlesGrid } from "@/widgets/ArticlesGrid/ArticlesGrid";
import styles from "./styles.module.scss";

function ArticlesContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const hasNoParams = searchParams.toString() === "";

  return (
    <div className={styles.content}>
      <ArticlesHeader />
      <div className={styles.body}>
        {hasNoParams ? (
          <>
            <div className={styles.bodyTop}>
              <ArticlesSlider
                loop
                className={styles.bodyTopSlider}
                title="Spotlight"
                spaceBetween={10}
                cardProps={{ size: "lg", showFollowBtn: true }}
              />
              <ArticlesGrid
                className={styles.bodyTopCenterCardList}
                title="Latest articles"
                filter="latest"
                cols={1}
                limit={3}
                cardProps={{ size: "sm" }}
                showLink
              />
              <ArticlesGrid
                className={styles.bodyTopRightCardList}
                title="Trending"
                filter="trending"
                cols={1}
                limit={3}
                cardProps={{ size: "sm" }}
                showLink
              />
            </div>
            <ArticlesGrid
              className={styles.cardList}
              title="Cryptocurrency Basics"
              category="cryptocurrency-basics"
              cols={5}
              limit={5}
              cardProps={{ orientation: "vertical", size: "md" }}
              showLink
            />
          </>
        ) : (
          <ArticlesGrid
            className={styles.cardList}
            category="cryptocurrency-basics"
            cols={5}
            limit={10}
            cardProps={{ orientation: "vertical", size: "md" }}
          />
        )}
      </div>
    </div>
  );
}

export default function Articles() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ArticlesContent />
    </Suspense>
  );
}
