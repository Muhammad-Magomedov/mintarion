"use client";

import { useState } from "react";
import Link from "next/link";
import cn from "classnames";
import { useWindowSize } from "react-use";
import { cva, type VariantProps } from "class-variance-authority";
import { Star, Bookmark } from "lucide-react";
import { RiShareForwardLine } from "react-icons/ri";
import { LiaUserPlusSolid } from "react-icons/lia";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  isValidISOString,
  formatDateYYYYMMDD,
  formatDateShort,
  getObjValueByNumber,
} from "@/shared/utils";
import { Button } from "@/shared/ui/Button/Button";
import { Modal, type IModalProps } from "@/shared/ui/Modal/Modal";
import styles from "./styles.module.scss";
import type { IArticleBaseData } from "@/shared/types/entities/article";

export const variants = cva("", {
  variants: {
    variant: {
      primary:
        "bg-gradient-to-b from-green-20 to-green-40 border-green-800 dark:from-zinc-900 dark:to-neutral-900 dark:border-gray-650",
    },
    size: {
      sm: styles.sm,
      md: styles.md,
      lg: styles.md,
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "sm",
  },
});

export type ArticleCardElementType = React.HTMLAttributes<HTMLDivElement> &
  React.LiHTMLAttributes<HTMLLIElement>;
export type ArticleCardBasePropsType = ArticleCardElementType &
  VariantProps<typeof variants>;

export interface IArticleCardProps extends ArticleCardBasePropsType {
  contentClassname?: string;
  orientation?: "horizontal" | "vertical";
  as?: "li" | "div";
  showFollowBtn?: boolean;
  data: IArticleBaseData;
}

type Sizes = NonNullable<VariantProps<typeof variants>["size"]>;

const maxLength: Record<number, Record<string, Record<Sizes, number>>> = {
  1920: {
    title: {
      lg: 105,
      md: 96,
      sm: 44,
    },
  },
  768: {
    title: {
      lg: 70,
      md: 50,
      sm: 30,
    },
  },
};

export const ArticleCard: React.FC<IArticleCardProps> = ({
  className = "",
  contentClassname = "",
  variant,
  size,
  orientation = "horizontal",
  as = "div",
  showFollowBtn = false,
  data,
  ...props
}) => {
  const [currentAuthorId, setCurrentAuthorId] = useState<string | null>();

  // const { width: windowWidth, height: windowHeight } = useWindowSize();
  const { id, title, href, imgSrc, category, author, createdAt } = data;

  const wrapperCn = cn(styles.wrapper, variants({ variant, size }), className);

  // Используем заглушку, если изображение не указано
  const imageSrc = imgSrc || "/img/article/3.png";

  const element = (
    <div className={cn(styles.content, styles[orientation], contentClassname)}>
      <img
        className={styles.image}
        style={{ height: "80%" }}
        src={imageSrc}
        alt=""
      />
      <div className={styles.text}>
        <div className={cn(styles.meta, "text-[#5B5B5B] dark:text-gray-400")}>
          <span className={styles.category} data-category={category}>
            {category}
          </span>
          {isValidISOString(createdAt) ? (
            <time dateTime={formatDateYYYYMMDD(createdAt)}>
              {formatDateShort(createdAt)}
            </time>
          ) : (
            <span></span>
          )}
        </div>
        <h4 className={styles.title}>
          <Link
            className="text-neutral-950 dark:text-white"
            href={`/articles/${id}`}
          >
            {title.slice(0, maxLength[1920].title[size ?? "md"])}...
          </Link>
        </h4>
        <div className={styles.footer}>
          <div className={styles.author}>
            <Link className={styles.authorInfo} href={`/users/${author.id}`}>
              <div className={styles.authorAvatarWrapper}>
                {author.avatarUrl && (
                  <img
                    className={styles.authorAvatar}
                    src={author.avatarUrl}
                    alt=""
                  />
                )}
              </div>
              {!!author.firstName || !!author.lastName ? (
                <span
                  className={cn(
                    styles.authorName,
                    "text-[#5B5B5B] dark:text-gray-400 dark:hover:text-white"
                  )}
                >
                  {author.firstName} {author.lastName}
                </span>
              ) : (
                <span
                  className={cn(
                    styles.authorName,
                    "text-[#5B5B5B] dark:text-gray-400 dark:hover:text-white"
                  )}
                >
                  Unknown Author
                </span>
              )}
            </Link>
            {showFollowBtn && (
              <Button
                onClick={() => setCurrentAuthorId(author.id)}
                className={styles.authorBtn}
                variant="lightGreen"
              >
                Follow
              </Button>
            )}
          </div>
          <button className={styles.contextMenuTrigger} type="button">
            <BsThreeDotsVertical height="1em" color="#A4A2A2" />
          </button>
          {/* <ContextMenuModal open /> */}
        </div>
      </div>
    </div>
  );

  if (as === "li") {
    return (
      <li className={wrapperCn} {...props}>
        {element}
      </li>
    );
  }

  return (
    <div className={wrapperCn} {...props}>
      {element}
    </div>
  );
};

export const ContextMenuModal: React.FC<Omit<IModalProps, "children">> = (
  props
) => {
  return (
    <Modal
      overlayClassName={styles.contextMenuModalOverlay}
      variant="darkGreen"
      {...props}
    >
      <div className={styles.contextMenuBody}>
        <ul className={styles.contextMenuList}>
          <li className={styles.contextMenuListItem}>
            <button type="button">
              <Star height="1em" />
              <span>Like article</span>
            </button>
          </li>
          <li className={styles.contextMenuListItem}>
            <button type="button">
              <Bookmark height="1em" />
              <span>Save article</span>
            </button>
          </li>
          <li className={styles.contextMenuListItem}>
            <button type="button">
              <RiShareForwardLine height="1em" />
              <span>Share article</span>
            </button>
          </li>
        </ul>
        <div className={styles.contextMenuSeparator}></div>
        <ul className={styles.contextMenuList}>
          <li className={styles.contextMenuListItem}>
            <button type="button">
              <LiaUserPlusSolid height="1em" />
              <span>Like article</span>
            </button>
          </li>
        </ul>
      </div>
    </Modal>
  );
};
