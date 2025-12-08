"use client";

import { useEffect } from "react";
import cn from "classnames";
import { Star } from "lucide-react";
import { ImNotification } from "react-icons/im";
import { UserInfoCard } from "@/widgets/UserInfoCard/UserInfoCard";
import { CreatorDashboardArticlesCard } from "@/widgets/CreatorDashboardArticlesCard/CreatorDashboardArticlesCard";
import { CreatorDashboardAnalytics } from "@/widgets/CreatorDashboardAnalytics/CreatorDashboardAnalytics";
import { LatestArticleCard } from "@/widgets/LatestArticleCard/LatestArticleCard";
import { DraftArticlesCard } from "@/widgets/DraftArticlesCard/DraftArticlesCard";
import { RecentArticlesCard } from "@/widgets/RecentArticlesCard/RecentArticlesCard";
import { ResourcesGrid } from "@/widgets/ResourcesGrid/ResourcesGrid";
import {
  NewArticleNotification,
  useCreateArticleStore,
} from "@/features/create-article";
import { UserAchievementsCard } from "@/features/show-user-achievements";
import { Button } from "@/shared/ui/Button/Button";
import { useAuth } from "@/shared/hooks/auth";
import * as defaultData from "@/shared/temp/data";
import styles from "./styles.module.scss";

export default function DashboardPage() {
  const { isNewArticlePublished } = useCreateArticleStore();
  const { user, userProfile, session } = useAuth();

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={cn(styles.title, "title--2xl")}>Main</h1>
      </div>
      <div className={styles.body}>
        {isNewArticlePublished && <NewArticleNotification />}
        <UserInfoCard
          className={styles.userInfoCard}
          data={defaultData.profile}
          enableEdit={true}
        />
        <UserAchievementsCard />
        <CreatorDashboardAnalytics />
        <div className={styles.articlesDataGrid}>
          <LatestArticleCard />
          <DraftArticlesCard />
        </div>
        <CreatorDashboardArticlesCard
          title="Recents Article"
          viewAll={{ isVisible: true, href: "/articles/dashboard" }}
        />
        <ResourcesGrid />
      </div>
    </div>
  );
}
