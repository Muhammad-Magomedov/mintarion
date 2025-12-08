import cn from "classnames";
import { BsThreeDotsVertical } from "react-icons/bs";
import { ArticlesFilter, CategoryTabs } from "@/features/filter-articles";
import { CreateArticleButton } from "@/features/create-article";
import styles from "./styles.module.scss";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    title?: string;
}

export const ArticlesHeader: React.FC<Props> = ({
    className = "",
    title = "Mintarion Articles",
    ...props
}) => {
    return (
        <div className={cn(styles.content, className)}>
            <div className={styles.top}>
                <h3 className={cn(styles.title, "title--2xl")}>{title}</h3>
                <div className={styles.tools}>
                    <ArticlesFilter />
                    <CreateArticleButton />
                    <button className={styles.moreBtn} type="button">
                        <BsThreeDotsVertical height="1em" />
                    </button>
                </div>
            </div>
            <div className={styles.bottom}>
                <CategoryTabs />
            </div>
        </div>
    )
}