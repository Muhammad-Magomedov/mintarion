import cn from "classnames";
import { Star } from "lucide-react";
import { Button } from "@/shared/ui/Button/Button";
import styles from "./styles.module.scss";

export const LatestArticleCard = () => {
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
        <h3 className={cn(styles.cardTitle, "title--lg", "dark:text-white")}>
          Latest Article
        </h3>
      </div>
      <div
        className={cn(
          styles.separator,
          "border-[1px] border-solid w-full h-[1px] bg-[rgba(61,105,60,0.2)] dark:bg-gray-650"
        )}
      ></div>
      <div className={styles.body}>
        <div className={styles.info}>
          <img className={styles.infoImage} src="/img/article/2.png" alt="" />
          <div className={styles.infoCol}>
            <h4 className={styles.infoTitle}>
              Bitcoin surged past $65,000 today...
            </h4>
            <div className={cn(styles.infoMeta, "text-[#5B5B5B] dark:text-neutral-300")}>
              <span className={styles.infoDate}>2025/08/30</span>
              &nbsp;&bull;&nbsp;
              <span className={styles.infoUsername}>Username</span>
            </div>
            <div className={cn(styles.infoLikes, "text-[#5B5B5B] dark:text-neutral-300")}>
              <Star height="1em" />
              <span>0</span>
            </div>
          </div>
        </div>
      </div>
      <div
        className={cn(
          styles.separator,
          "border-[1px] border-solid w-full h-[1px] bg-[rgba(61,105,60,0.2)] dark:bg-gray-650"
        )}
      ></div>
      <div className={styles.footer}>
        <ul className={styles.stats}>
          <li className={styles.statsItem}>
            <span className={styles.statsItemCaption}>Total views</span>
            <span className={styles.statsItemValue}>1234</span>
          </li>
          <li className={styles.statsItem}>
            <span className={styles.statsItemCaption}>Open Rate</span>
            <span className={styles.statsItemValue}>1,1%</span>
          </li>
          <li className={styles.statsItem}>
            <span className={styles.statsItemCaption}>New Followers</span>
            <span className={styles.statsItemValue}>1234</span>
          </li>
        </ul>
        <Button className={styles.cardBtn}>Share Post</Button>
      </div>
    </div>
  );
};
