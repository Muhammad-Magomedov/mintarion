import { DailyRecaps } from "@/widgets/DailyRecaps/DailyRecaps"
import { NewsFeed } from "@/widgets/NewsFeed/NewsFeed"
import styles from "./styles.module.scss"

export default function News() {
  return (
    <div className={`${styles.content}`}>
      <DailyRecaps />
      <NewsFeed className={styles.newsFeed} />
    </div>
  )
}
