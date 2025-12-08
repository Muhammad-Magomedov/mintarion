import { AccountSidebar } from "@/widgets/AccountSidebar/AccountSidebar";
import styles from "./layout.module.scss";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.wrapper}>
      <AccountSidebar className={styles.sidebar} />
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
}
