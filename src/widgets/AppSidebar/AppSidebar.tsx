"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import cn from "classnames";
import {
  Chart,
  Flash,
  Category2,
  Notepad2,
  Teacher,
  BitcoinConvert,
  type IconProps,
} from "iconsax-react";
import { ToggleTheme } from "@/features/toggle-theme";
import styles from "./styles.module.scss";
import type { IListItem } from "@/shared/types/component";

interface IMenuItem extends Omit<IListItem, "icon"> {
  icon: (props: IconProps) => React.ReactNode;
}

const menuList: IMenuItem[] = [
  {
    id: uuidv4(),
    label: "Chart",
    icon: (props) => <Chart {...props} />,
    href: "/chart",
  },
  {
    id: uuidv4(),
    label: "News",
    icon: (props) => <Flash {...props} />,
    href: "/news",
  },
  // {
  //   id: uuidv4(),
  //   label: "Tools",
  //   icon: (props) => <Category2 {...props} />,
  //   href: "/tools",
  // },
  {
    id: uuidv4(),
    label: "Articles",
    icon: (props) => <Notepad2 {...props} />,
    href: "/articles",
  },
  // {
  //   id: uuidv4(),
  //   label: "Learning",
  //   icon: (props) => <Teacher {...props} />,
  //   href: "/learning",
  // },
  // {
  //   id: uuidv4(),
  //   label: "Exchange",
  //   icon: (props) => <BitcoinConvert {...props} />,
  //   href: "/exchange",
  // },
];

export const AppSidebar: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className = "",
  ...props
}) => {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        styles.sidebar,
        className,
        "bg-green-50 dark:bg-[rgba(13,13,13,0.6)]"
      )}
      {...props}
    >
      <div className={styles.content}>
        <nav className={styles.menu}>
          <ul className={styles.menuList}>
            {menuList.map(({ id, label, icon, href }) => (
              <li
                className={cn(
                  styles.menuListItem,
                  pathname.includes(href) ? styles.active : "",
                  pathname.includes(href)
                    ? "bg-linear-to-b from-slate-250 to-green-200 dark:from-green-850 dark:to-green-900"
                    : "hover:bg-linear-to-b hover:from-slate-250 hover:to-green-200 dark:hover:from-green-850 dark:hover:to-green-900"
                )}
                key={id}
              >
                <Link href={href}>
                  {icon({
                    color: pathname.includes(href)
                      ? "rgb(48, 83, 47)"
                      : "rgb(164, 162, 162)",
                  })}
                  <span
                    className={cn(
                      pathname.includes(href)
                        ? "text-neutral-950 dark:text-white"
                        : "text-neutral-950 dark:text-gray-400"
                    )}
                  >
                    {label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <ToggleTheme />
      </div>
    </aside>
  );
};
