"use client";

import cn from "classnames";
import { Check, ChevronRight, X } from "lucide-react";
import { Progress } from "@/shared/ui/Progress/Progress";
import {
  useShowUserAchievementsStore,
  calculateProgress,
  type IShowUserAchievementsStore,
} from "../../model";
import styles from "./styles.module.scss";

export interface IUserAchievementsCardProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const achievementList: Array<{
  key: keyof IShowUserAchievementsStore["achievements"];
  label: string;
}> = [
  { key: "isProfileLinkShared", label: "Share your profile link" },
  { key: "hasMinReadersCount", label: "Get your first 10 readers" },
  { key: "isFirstArticlePublished", label: "Publish your first article" },
  { key: "isProfileCompleted", label: "Complete your profile" },
];

export const UserAchievementsCard: React.FC<
  IUserAchievementsCardProps
> = () => {
  const state = useShowUserAchievementsStore();
  const { isCardVisible, achievements } = state;

  return (
    <div
      className={cn(
        styles.card,
        "bg-linear-to-b",
        "from-green-20 to-green-40 border-green-800 text-neutral-950",
        "dark:from-zinc-900 dark:to-neutral-900 dark:border-gray-650 dark:text-white"
      )}
      style={{ display: !isCardVisible ? "none" : "" }}
    >
      <div className={styles.header}>
        <div className={styles.headerText}>
          <h3 className={cn(styles.title, "title--lg", "dark:text-white")}>
            Getting Started!
          </h3>
          <p className={cn(styles.desc, "text-[#5B5B5B] dark:text-neutral-300")}>
            Take these first steps to grow your voice and reach your audience
          </p>
        </div>
        <button className={styles.closeBtn}>
          <X height="1em" />
        </button>
      </div>
      <div
        className={cn(
          styles.separator,
          "border-[1px] border-solid w-full h-[1px] bg-[rgba(61,105,60,0.2)] dark:bg-gray-650"
        )}
      ></div>
      <div className={styles.body}>
        <Progress className={styles.progress} value={calculateProgress(state)} />
        <ul className={styles.list}>
          {achievementList.map(({ key, label }) => (
            <li
              className={cn(
                styles.listItem,
                "bg-linear-to-tr",
                "from-green-20 to-green-40",
                "dark:from-[rgba(48,83,47,0.05)] dark:to-[rgba(149,251,149,0.05)]",
                achievements[key]
                  ? "light:from-[rgba(197,218,196,0.6)] light:to-[rgba(197,218,196,0.6)] border-green-800 dark:border-gray-650"
                  : "border-green-800 dark:border-green-800"
              )}
              key={`${key}-${label}`}
            >
              <div className={styles.listItemLeft}>
                <div
                  className={cn(
                    styles.listItemCircle,
                    "bg-linear-to-tr",
                    "border-green-800",
                    achievements[key] && "from-green-800 to-green-300"
                  )}
                >
                  {achievements[key] && (
                    <Check className={cn(styles.listItemCheckIcon, "text-white")} height="1em" />
                  )}
                </div>
                <span className={cn(styles.listItemDesc, achievements[key] && "text-green-600 dark:text-gray-400")}>{label}</span>
              </div>
              <div className={styles.listItemRight}>
                {!achievements[key] && (
                  <ChevronRight
                    className={styles.listItemChevron}
                    height="1em"
                  />
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
