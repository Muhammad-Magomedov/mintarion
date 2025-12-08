import cn from "classnames";
import { Button } from "@/shared/ui/Button/Button";
import styles from "./styles.module.scss";


export const SubscriptionAccess: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
    className = "",
    ...props
}) => {
    return (
        <div className={cn(styles.wrapper)}>
            <div className={styles.content}>
                <div className={styles.text}>
                    <h3 className={styles.title}>
                        <span className="text-green-600">Subscribe</span> <span className="light:text-neutral-950 dark:text-white">Now and Unlock Newsfeed Access</span>
                    </h3>
                    <p className={styles.desc}>
                        <span className="text-green-600">Start your free trial today</span>
                        <span className="light:text-neutral-950 dark:text-white">– experience all the benefits without any commitment!</span>
                    </p>
                </div>
                <Button variant="lightGreen">Try It for Free</Button>
            </div>
        </div>
    )
}