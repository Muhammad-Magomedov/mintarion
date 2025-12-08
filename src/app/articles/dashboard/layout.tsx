import { CreatorDashboardSidebar } from "@/widgets/CreatorDashboardSidebar/CreatorDashboardSidebar";
import styles from "./layout.module.scss";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.layout}>
      <CreatorDashboardSidebar className={styles.sidebar} />
      <div className={styles.body}>
        {children}
      </div>
    </div>
  )
}
