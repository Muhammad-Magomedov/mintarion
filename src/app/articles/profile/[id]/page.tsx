import cn from "classnames";
import { UserInfoCard } from "@/widgets/UserInfoCard/UserInfoCard";
import { ArticlesGrid } from "@/widgets/ArticlesGrid/ArticlesGrid";
import { EditProfileModal } from "@/features/edit-profile/ui";
import { ArticlesFilter } from "@/features/filter-articles";
import * as defaultData from "@/shared/temp/data";
import styles from "./styles.module.scss";
import type { IUser } from "@/entities/user";
import type { IArticleBaseData } from "@/shared/types/entities/article";

export default function ProfilePage() {
  return (
    <div className={styles.page}>
      <UserInfoCard className={styles.userInfoCard} data={defaultData.profile} />
      <div className={styles.articlesFilterContainer}>
        <h2 className={cn(styles.title, "title--2xl")}>
          Articles
        </h2>
        <ArticlesFilter />
      </div>
      <ArticlesGrid
        className={styles.cardList}
        category="cryptocurrency-basics"
        cols={5}
        limit={10}
        cardProps={{ orientation: "vertical", size: "md" }}
      />
      <EditProfileModal />
    </div>
  );
}
