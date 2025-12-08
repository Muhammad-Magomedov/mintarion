import Link from "next/link";
import cn from "classnames";
import { v4 as uuidv4 } from "uuid";
import { getTimeAgoStr } from "@/shared/utils";
import styles from "./styles.module.scss";
import type { INewsBaseData } from "@/shared/types/entities/news";

export type NewsCardAttributesType = React.HTMLAttributes<HTMLDivElement> &
  React.LiHTMLAttributes<HTMLLIElement>;
export type NewsCardType = HTMLDivElement | HTMLLIElement;
export interface INewsCardProps extends NewsCardAttributesType {
  variant: "default" | "green" | "yellow" | "red";
  as?: "li" | "div";
  data: INewsBaseData;
}

export const NewsCard: React.FC<INewsCardProps> = ({
  className = "",
  variant = "green",
  as = "div",
  data = {
    id: uuidv4(),
    title: "",
    text: "",
    source: "",
    url: "",
    createdAt: new Date().toISOString(),
  },
  ...props
}) => {
  const { title, text, source, url, createdAt } = data;
  const classname = cn(
    styles.card,
    styles[`variant-${variant}`],
    className,
    "news-card",
    `news-card--${variant}`
  );
  const contentClassname = cn(styles.content);

  const content = (
    <div className={contentClassname}>
      <h4 className={styles.title}>
        <Link href={url ?? "/"} target="_blank">{title?.slice(0, 100) ?? text?.slice(0, 100)}...</Link>
      </h4>
      <div className={styles.row}>
        <div className={styles.meta}>
          <span>{getTimeAgoStr(createdAt)}</span>&nbsp;&bull;&nbsp;
          <span>{source}</span>
        </div>
        <span></span>
      </div>
    </div>
  );

  if (as === "li") {
    return <li className={classname} {...props}>{content}</li>;
  }

  return (
    <div className={classname} {...props}>{content}</div>
  );
};
