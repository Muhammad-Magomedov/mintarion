"use client";

import { useEffect, useState } from "react";
import cn from "classnames";
import { Modal, IModalProps } from "@/shared/ui/Modal/Modal";
import { Search } from "lucide-react";
import { FollowButton } from "@/features/follow-user";
import { Avatar } from "@/shared/ui/Avatar/Avatar";
import { Input } from "@/shared/ui/Input/Input";
import { useShowConnectionsStore } from "../../model";
import styles from "./styles.module.scss";
import type { IUser } from "@/entities/user";

export interface IConnectionsModalProps extends Omit<IModalProps, "children"> {
  title?: string;
}

const defaultData = {
  followersCount: 10,
  followingCount: 10,
  user: {
    id: "e421d6d2-8437-4d20-9f00-d668845aeaf7",
    firstName: "Jacob",
    lastName: "Carter",
    avatarUrl: "/img/profile/avatar.jpg",
    bio: "Trading expert and financial markets analyst. Writing articles on strategies, market insights, and risk management",
    followersCount: 10,
    followingCount: 10,
    telegramUrl: "https://t.me",
    twitterUrl: "https://x.com",
    facebookUrl: "https://www.facebook.com",
  },
};

export const ConnectionsModal: React.FC<IConnectionsModalProps> = (props) => {
  const [followers, setFollowers] = useState<IUser[]>(
    new Array(defaultData.followersCount).fill(defaultData.user)
  );
  const [following, setFollowing] = useState<IUser[]>(
    new Array(defaultData.followingCount).fill(defaultData.user)
  );
  const [currentList, setCurrentList] = useState<IUser[]>([]);

  const { modal, activeTab, updateValue } = useShowConnectionsStore();

  useEffect(() => {
    switch (activeTab) {
      case "followers":
        setCurrentList(followers);
        break;
      case "following":
        setCurrentList(following);
        break;
    }
  }, [activeTab]);

  return (
    <Modal
      bodyClassName={styles.body}
      open={modal.isOpen}
      onOpenChange={(isOpen) => updateValue("modal", { ...modal, isOpen })}
      showCloseButton
      {...props}
    >
      <h3 className={cn(styles.title, "title--3xl", "text-neutral-950 dark:text-white")}>
        {activeTab === "followers" && "Followers"}
        {activeTab === "following" && "Following"}
      </h3>
      <div className={styles.bodyContent}>
        <div className={styles.tabList}>
          <button
            className={cn(
              styles.tab,
              activeTab === "followers" ? "active" : "",
              "bg-linear-to-tr",
              "from-green-20 to-green-20 border-green-800 text-green-750 [&.active]:from-green-700 [&.active]:to-green-800 [&.active]:text-white",
              "dark:from-transparent dark:to-transparent [&.active]:dark:from-[rgba(48,83,47,0.4)] [&.active]:dark:to-[rgba(149,251,149,0.4)]",
              "dark:border-green-800 dark:hover:border-green-700 dark:text-[#C9C9C9] [&.active]:text-white"
            )}
            onClick={() => updateValue("activeTab", "followers")}
          >
            <span>Followers</span>
            <span>{defaultData.followersCount.toLocaleString("en-US")}</span>
          </button>
          <button
            className={cn(
              styles.tab,
              activeTab === "following" ? "active" : "",
              "bg-linear-to-tr",
              "from-green-20 to-green-20 border-green-800 text-green-750 [&.active]:from-green-700 [&.active]:to-green-800 [&.active]:text-white",
              "dark:from-transparent dark:to-transparent [&.active]:dark:from-[rgba(48,83,47,0.4)] [&.active]:dark:to-[rgba(149,251,149,0.4)]",
              "dark:border-green-800 dark:hover:border-green-700 dark:text-[#C9C9C9] [&.active]:text-white"
            )}
            onClick={() => updateValue("activeTab", "following")}
          >
            <span>Following</span>
            <span>{defaultData.followingCount.toLocaleString("en-US")}</span>
          </button>
        </div>
        <Input
          className={styles.searchInput}
          classNames={{ content: styles.searchInputContent }}
          startContent={
            <button type="button">
              <Search height="1em" />
            </button>
          }
          placeholder="Search..."
        />
        <ul className={cn(styles.users, "!border-green-800 dark:!border-gray-650")}>
          {currentList.map((data) => (
            <li
              className={cn(
                styles.user,
                "bg-linear-to-b",
                "border-t-[rgba(61,105,60,0.2)] hover:from-slate-250 hover:to-green-200",
                "dark:border-t-gray-650 dark:hover:from-green-850 dark:hover:to-green-900"
              )}
              key={data.id}
            >
              <Avatar className={styles.userAvatar} imgSrc={data?.avatarUrl} />
              <h5 className={cn(styles.userFullName, "text-neutral-950 dark:text-white")}>
                {data?.firstName} {data?.lastName}
              </h5>
              <FollowButton className={styles.userFollowBtn} userId={data.id} />
            </li>
          ))}
        </ul>
      </div>
    </Modal>
  );
};
