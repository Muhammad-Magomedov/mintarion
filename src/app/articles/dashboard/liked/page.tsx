import cn from "classnames";
import { ArticlesFilter } from "@/features/filter-articles";
import { CreateArticleButton } from "@/features/create-article";
import { ArticlesGrid } from "@/widgets/ArticlesGrid/ArticlesGrid";
import styles from "./styles.module.scss";

export default function LikedArticlesPage() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={cn(styles.title, "title--2xl")}>Liked Articles</h1>
      </div>
      <div className={styles.body}>
        <div className={styles.row}>
          <ArticlesFilter />
          <CreateArticleButton />
        </div>
        <ArticlesGrid
          className={styles.cardList}
          category="cryptocurrency-basics"
          cols={5}
          limit={10}
          cardProps={{ orientation: "vertical", size: "md" }}
        />
      </div>
    </div>
  );
}
