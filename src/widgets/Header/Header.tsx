"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import cn from "classnames";
import { IoMdNotificationsOutline } from "react-icons/io";
import { SearchForm } from "@/features/search";
import { AskCopilotButton, CopilotChat } from "@/features/ask-copilot";
import { SignInButton, SignUpButton } from "@/features/auth";
import { Avatar } from "@/shared/ui/Avatar/Avatar";
import { Button } from "@/shared/ui/Button/Button";
import { useAuth } from "@/shared/hooks/auth";
import { useThemeStore } from "@/features/toggle-theme";
import { ProfileContextMenu } from "../ProfileContextMenu/ProfileContextMenu";
import styles from "./styles.module.scss";

const AuthSkeleton = () => (
  <div className="flex items-center gap-2 animate-pulse">
    <div className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded"></div>
    <div className="w-8 h-8 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
  </div>
);

export const Header: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className = "",
  ...props
}) => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState<boolean>(false);
  const profileContextMenuRef = useRef<HTMLDivElement | null>(null);
  const profileTriggerRef = useRef<HTMLButtonElement | null>(null);
  const { user, session, userProfile, loading } = useAuth();
  const { theme } = useThemeStore();
  const pathname = usePathname();

  useEffect(() => {
    const handleWindowClick = (e: MouseEvent) => {
      if (
        profileContextMenuRef.current &&
        !profileContextMenuRef.current.contains(e.target as Node) &&
        profileTriggerRef.current &&
        !profileTriggerRef.current.contains(e.target as Node)
      ) {
        setIsProfileMenuOpen(false);
      }
    };

    if (isProfileMenuOpen) {
      window.addEventListener("click", handleWindowClick);
    }

    return () => {
      window.removeEventListener("click", handleWindowClick);
    };
  }, [isProfileMenuOpen]);

  useEffect(() => {
    setIsProfileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(styles.header, className, "bg-green-50 dark:bg-green-980")}
      {...props}
    >
      <div className={styles.content}>
        <div className={cn(styles.box, styles.left)}>
          <Link className={styles.headerLink} href="/">
            <img className={styles.logo} src="/img/logo.png" alt="logo" />
            <span className="text-neutral-950 dark:text-white">MINTARION</span>
          </Link>
        </div>
        <div className={cn(styles.box, styles.center)}>
          <SearchForm
            className={styles.searchForm}
            placeholder="Search or jump to..."
            showList
          />
          <AskCopilotButton border={theme === "dark"} />
        </div>
        <div className={cn(styles.box, styles.right)}>
          <div className={styles.socials}>
            <Button variant={theme === "dark" ? "primary" : "darkGreen"} shape="square" border={theme === "dark"} as="link" href="https://t.me/mintarion_labs">
              <img src="/img/icons/socials/telegram.svg" alt="telegram" />
            </Button>
            <Button variant={theme === "dark" ? "primary" : "darkGreen"} shape="square" border={theme === "dark"} as="link" href="https://x.com/mintarion">
              <img src="/img/icons/socials/x.svg" alt="x" />
            </Button>
          </div>
          {session ? (
            <div className={styles.profileInfo}>
              <Button variant={theme === "dark" ? "outline-darkGreen" : "primary"} shape="square">
                <IoMdNotificationsOutline color={theme !== "dark" ? "#3D693C" : ""} height="1em" />
              </Button>
              <button
                ref={profileTriggerRef}
                className={styles.profileMenuTrigger}
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              >
                <Avatar user={user} />
              </button>
            </div>
          ) : (
            <div className={styles.authBtnList}>
              <SignInButton />
              <SignUpButton />
            </div>
          )}
        </div>
        {user && isProfileMenuOpen && (
          <ProfileContextMenu className={styles.profileMenu} ref={profileContextMenuRef} />
        )}
      </div>
    </header>
  );
};