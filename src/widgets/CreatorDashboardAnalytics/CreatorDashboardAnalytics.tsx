import cn from "classnames";
import styles from "./styles.module.scss";
import { ImNotification } from "react-icons/im";
import * as defaultData from "@/shared/temp/data";

export const CreatorDashboardAnalytics: React.FC = () => {
  return (
    <div className={styles.infoBoxList}>
      <div
        className={cn(
          styles.infoBox,
          "bg-linear-to-b",
          "from-green-20 to-green-40 border-green-800",
          "dark:from-zinc-900 dark:to-neutral-900 border-gray-650"
        )}
      >
        <div className={cn(styles.infoBoxHeader, "text-green-750 dark:text-neutral-300")}>
          <span className={styles.infoBoxDesc}>All followers</span>
          <ImNotification height="1em" />
        </div>
        <h3 className={cn(styles.infoBoxValue, "text-neutral-950 dark:text-white")}>
          {defaultData.profileStatistics.followers}
        </h3>
      </div>
      <div
        className={cn(
          styles.infoBox,
          "bg-linear-to-b",
          "from-green-20 to-green-40 border-green-800",
          "dark:from-zinc-900 dark:to-neutral-900 border-gray-650"
        )}
      >
        <div className={cn(styles.infoBoxHeader, "text-green-750 dark:text-neutral-300")}>
          <span className={styles.infoBoxDesc}>30 day views</span>
          <ImNotification height="1em" />
        </div>
        <h3 className={cn(styles.infoBoxValue, "text-neutral-950 dark:text-white")}>
          {defaultData.profileStatistics.views}
        </h3>
      </div>
      <div
        className={cn(
          styles.infoBox,
          "bg-linear-to-b",
          "from-green-20 to-green-40 border-green-800",
          "dark:from-zinc-900 dark:to-neutral-900 border-gray-650"
        )}
      >
        <div className={cn(styles.infoBoxHeader, "text-green-750 dark:text-neutral-300")}>
          <span className={styles.infoBoxDesc}>30 days open rate</span>
          <ImNotification height="1em" />
        </div>
        <h3 className={cn(styles.infoBoxValue, "text-neutral-950 dark:text-white")}>
          {defaultData.profileStatistics.openRate}
        </h3>
      </div>
    </div>
  );
};
