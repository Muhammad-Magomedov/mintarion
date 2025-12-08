import Link from "next/link";
import cn from "classnames";
import { IRecapBaseData } from "../../model/types";
import styles from "./styles.module.scss";

export type IRecapCardAttributes = React.HTMLAttributes<HTMLDivElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement>;
export interface IRecapCardProps extends IRecapCardAttributes {
  data: IRecapBaseData;
  as?: "div" | "link";
}

export const RecapCard: React.FC<IRecapCardProps> = ({
  className = "",
  data = {
    imgSrc: "",
    title: "",
    description: "",
    url: "",
  },
  as = "div",
  ...props
}) => {
  const { imgSrc, title, description, url } = data;

  const content = (
    <>
      <h4
        className={cn(styles.title, "light:text-neutral-950 dark:text-white")}
      >
        {title?.slice(0, 45)}...
      </h4>
      {imgSrc && imgSrc?.length > 0 && (
        <img className={styles.image} src={imgSrc} alt="" />
      )}
      <p
        className={cn(styles.desc, "light:text-[#5B5B5B] dark:text-[#A4A2A2]")}
      >{`${description.slice(0, 80)}...`}</p>
    </>
  );

  const classname = cn(
    styles.card,
    className,
    "recap-card",
    "bg-gradient-to-b",
    "light:from-green-20 light:to-green-40 light:border-green-800",
    "dark:from-zinc-900 dark:to-neutral-900 dark:border-gray-650"
  );

  if (as === "link") {
    return (
      <Link className={classname} href={url ?? ""} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <div className={classname} {...props}>
      {content}
    </div>
  );
};
