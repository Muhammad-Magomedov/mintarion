"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import cn from "classnames";
import { Bookmark, Upload, Star } from "lucide-react";
import { RiTelegram2Fill } from "react-icons/ri";
import { FaXTwitter } from "react-icons/fa6";
import { BsFacebook } from "react-icons/bs";
import { RxCrop } from "react-icons/rx";
import { EditProfileButton } from "@/features/edit-profile/ui";
import { Avatar } from "@/shared/ui/Avatar/Avatar";
import { Button } from "@/shared/ui/Button/Button";
import { useAuth } from "@/shared/hooks/auth";
import { useThemeStore } from "@/features/toggle-theme";
import { useShowConnectionsStore } from "@/features/show-user-connections/model";
import styles from "./styles.module.scss";
import type { IUser } from "@/entities/user";

export interface IUserInfoCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  data: Omit<IUser, "subscriptionPlan">;
  enableEdit?: boolean;
}

export const UserInfoCard: React.FC<IUserInfoCardProps> = ({
  className,
  data,
  enableEdit = false,
}) => {
  const [isEditor, setIsEditor] = useState<boolean>(enableEdit);

  const { theme } = useThemeStore();

  const { id: userId } = useParams();
  const { user } = useAuth();

  const {
    modal: connectionModalState,
    updateValue: updateConnectionModalState,
  } = useShowConnectionsStore();

  useEffect(() => {
    if (!enableEdit) {
      setIsEditor(user?.id === userId || user?.id === data.id);
    }
  }, [user]);

  return (
    <div
      className={cn(
        styles.card,
        className,
        "bg-linear-to-tr",
        "from-[rgba(48,83,47,1)] to-[rgba(149,251,149,1)] border-green-800",
        "dark:from-[rgba(48,83,47,0.1)] dark:to-[rgba(149,251,149,0.1)] dark:border-green-800"
      )}
    >
      {isEditor && (
        <div className={styles.actionBtnList}>
          <button
            className={cn(
              styles.actionBtn,
              "bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.3)]",
              "dark:bg-[rgba(164,162,162,0.1)] dark:hover:bg-[rgba(164,162,162,0.3)]"
            )}
            type="button"
          >
            <Upload height="1em" />
          </button>
          <button
            className={cn(
              styles.actionBtn,
              "bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.3)]",
              "dark:bg-[rgba(164,162,162,0.1)] dark:hover:bg-[rgba(164,162,162,0.3)]"
            )}
            type="button"
          >
            <RxCrop height="1em" />
          </button>
        </div>
      )}
      <div className={styles.info}>
        <Avatar className={styles.avatar} imgSrc={data?.avatarUrl} />
        <h3 className={cn(styles.fullName, "title--2xl !text-white")}>
          {data?.firstName} {data?.lastName}
        </h3>
        <p className={styles.bio}>{data?.bio}</p>
        <div className={styles.btnList}>
          <button
            className={cn(
              styles.btn,
              "light:bg-linear-to-b from-[rgba(243,248,242,0.3)] to-[rgba(241,255,238,0.3)]",
              "dark:bg-transparent dark:border-green-800 dark:hover:border-green-700 dark:text-[#C9C9C9]"
            )}
            onClick={() =>
              updateConnectionModalState("modal", {
                ...connectionModalState,
                isOpen: true,
              })
            }
          >
            <span className="dark:text-white">{data?.followingCount ?? 0}</span>
            <span>following</span>
          </button>
          <button
            className={cn(
              styles.btn,
              "light:bg-linear-to-b from-[rgba(243,248,242,0.3)] to-[rgba(241,255,238,0.3)]",
              "dark:bg-transparent dark:border-green-800 dark:hover:border-green-700 dark:text-[#C9C9C9]"
            )}
            onClick={() =>
              updateConnectionModalState("modal", {
                ...connectionModalState,
                isOpen: true,
              })
            }
          >
            <span className="dark:text-white">{data?.followersCount ?? 0}</span>
            <span>followers</span>
          </button>
          {isEditor && (
            <>
              <Link
                className={cn(
                  styles.btn,
                  styles.md,
                  "light:bg-linear-to-b from-[rgba(243,248,242,0.3)] to-[rgba(241,255,238,0.3)]",
                  "dark:bg-transparent dark:border-green-800 dark:hover:border-green-700 dark:text-[#C9C9C9]"
                )}
                href="/articles/dashboard/saved"
              >
                <Bookmark className="dark:text-white" height="1em" />
                <span>Saved</span>
              </Link>
              <Link
                className={cn(
                  styles.btn,
                  styles.md,
                  "light:bg-linear-to-b from-[rgba(243,248,242,0.3)] to-[rgba(241,255,238,0.3)]",
                  "dark:bg-transparent dark:border-green-800 dark:hover:border-green-700 dark:text-[#C9C9C9]"
                )}
                href="/articles/dashboard/liked"
              >
                <Star className="dark:text-white" height="1em" />
                <span>Liked</span>
              </Link>
            </>
          )}
        </div>
        <div className={styles.socials}>
          {data?.telegramUrl && (
            <Button
              className={styles.socialBtn}
              variant={theme === "dark" ? "darkGreen" : "white"}
              shape="square"
              as="link"
              href={data.telegramUrl}
            >
              <RiTelegram2Fill height="1em" />
            </Button>
          )}
          {data?.twitterUrl && (
            <Button
              className={styles.socialBtn}
              variant={theme === "dark" ? "darkGreen" : "white"}
              shape="square"
              as="link"
              href={data.twitterUrl}
            >
              <FaXTwitter height="1em" />
            </Button>
          )}
          {data?.facebookUrl && (
            <Button
              className={styles.socialBtn}
              variant={theme === "dark" ? "darkGreen" : "white"}
              shape="square"
              as="link"
              href={data.facebookUrl}
            >
              <BsFacebook height="1em" />
            </Button>
          )}
        </div>
      </div>
      {isEditor && <EditProfileButton className={styles.editProfileBtn} />}
    </div>
  );
};
