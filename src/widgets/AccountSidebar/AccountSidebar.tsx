"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import cn from "classnames";
import { Avatar } from "@/shared/ui/Avatar/Avatar";
import { useAuth } from "@/shared/hooks/auth";
import styles from "./styles.module.scss";

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

const links = [
  { label: "Account Details", href: "/account/details" },
  { label: "Subscription Plans", href: "/account/subscription" },
  { label: "Billing Settings", href: "/account/billing" },
];

export const AccountSidebar: React.FC<Props> = ({ className, ...props }) => {
  const pathname = usePathname();
  const { user, userProfile } = useAuth();

  return (
    <aside
      className={cn(
        styles.content,
        "bg-[linear-gradient(to_bottom,rgba(197,218,196,0.6),rgba(197,218,196,0.6))]",
        "dark:bg-[linear-gradient(to_bottom,_rgba(25,29,26,0.6),_rgba(20,25,21,0.6))]",
        className
      )}
      {...props}
    >
      <div className={styles.header}>
        <Avatar user={user} />
        <h5
          className={cn(
            styles.name,
            "text-neutral-950 dark:text-white font-medium"
          )}
        >
          {userProfile?.firstName} {userProfile?.lastName}
        </h5>
      </div>
      <div
        className={cn(styles.separator, "bg-slate-200 dark:bg-gray-650")}
      ></div>
      <div className={styles.body}>
        <ul className={styles.navList}>
          {links.map(({ label, href }) => (
            <li className={styles.navListItem} key={`${label}-${href}`}>
              <Link
                className={cn(
                  styles.navLink,
                  pathname.includes(href)
                    ? cn(
                        styles.active,
                        "bg-[linear-gradient(45deg,_rgb(149,251,149,0.2),_rgba(48,83,47,0.2))] text-[#0D0D0C]",
                        "dark:bg-[linear-gradient(45deg,_rgb(48,83,47,0.2),_rgba(149,251,149,0.2))] dark:text-white"
                      )
                    : cn(
                        "text-[#5B5B5B] dark:text-gray-400",
                        "dark:hover:bg-[linear-gradient(45deg,_rgb(48,83,47,0.2),_rgba(149,251,149,0.2))] dark:hover:text-white"
                      )
                )}
                href={href}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};
