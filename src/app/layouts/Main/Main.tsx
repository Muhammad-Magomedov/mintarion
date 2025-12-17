"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import cn from "classnames";
import { Header } from "@/widgets/Header/Header";
import { AppSidebar } from "@/widgets/AppSidebar/AppSidebar";
import { Footer } from "@/widgets/Footer";
import { useThemeStore } from "@/features/toggle-theme";
import { CopilotChat, useCopilotStore } from "@/features/ask-copilot";
import { SignInModal, SignUpModal } from "@/features/auth";
import { ErrorModal } from "@/features/show-error-modal";
import styles from "./styles.module.scss";

interface Props {
  children: React.ReactNode;
  routes: string[];
}

export const MainLayout: React.FC<Props> = ({ children, routes = [] }) => {
  const { chat, updateValue: updateCopilotState } = useCopilotStore();
  const pathname = usePathname();
  const theme = useThemeStore((state) => state.theme);
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    const route = routes.find((s) => pathname.includes(s));
    setIsActive(route ? true : false);

    updateCopilotState("chat", { ...chat, meta: undefined });
  }, [pathname]);

  return (
    <>
      {isActive ? (
        <div
          className={cn(
            styles.layout,
            styles[theme],
            "light:bg-gradient-to-b light:from-[rgba(243,248,242,0.3)] light:to-[rgba(241,255,238,0.3)] dark:bg-[rgba(17,17,17,1)]"
          )}
        >
          <Header
            className={cn(
              styles.header,
              "border-b-[1px] border-solid border-slate-200 dark:border-gray-650"
            )}
          />
          <div className={styles.content}>
            <AppSidebar
              className={cn(
                styles.sidebar,
                "border-r-[1px] border-solid border-slate-200 dark:border-gray-650"
              )}
            />
            <div className={styles.page}>{children}</div>
            <CopilotChat />
          </div>
          <Footer />
          <SignInModal />
          <SignUpModal />
          <ErrorModal />
        </div>
      ) : (
        <>{children}</>
      )}
    </>
  );
};
