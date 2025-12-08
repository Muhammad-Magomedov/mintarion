"use client";

import cn from "classnames";
import { Modal, type IModalProps } from "@/shared/ui/Modal/Modal";
import { Button } from "@/shared/ui/Button/Button";
import { GoogleSignInButton } from "../GoogleSignInButton/GoogleSignInButton";
import { useThemeStore } from "@/features/toggle-theme";
import styles from "./styles.module.scss";
import sharedStyles from "../styles.module.scss";

export interface IAuthModalProps extends IModalProps {
  showLayout?: boolean;
  bodyContent?: {
    top: {
      title?: string;
      description?: string;
      content?: React.ReactNode;
    };
    center?: React.ReactNode;
    bottom?: React.ReactNode;
  };
}

export const AuthModal: React.FC<IAuthModalProps> = ({
  children,
  showLayout,
  bodyContent,
  bodyClassName = "",
  ...props
}) => {
  const { theme } = useThemeStore();

  return (
    <Modal
      {...props}
      bodyClassName={cn(styles.body, bodyClassName)}
      showCloseButton
    >
      <div className={styles.bodyTop}>
        <div className={styles.bodyTopText}>
          {bodyContent?.top?.title && (
            <h3
              className={cn(
                styles.bodyTopTitle,
                "title--3xl text-neutral-950 dark:text-white"
              )}
            >
              {bodyContent.top.title}
            </h3>
          )}
          {bodyContent?.top?.description && (
            <p
              className={cn(
                styles.bodyTopDesc,
                "text-[#5B5B5B] dark:text-neutral-300"
              )}
            >
              {bodyContent?.top.description}
            </p>
          )}
          {bodyContent?.top?.content}
        </div>
        <div className={styles.bodyTopContent}>{children}</div>
      </div>
      <div className={styles.bodyCenter}>
        {showLayout && (
          <>
            <span
              className={cn(
                styles.bodyCenterLine,
                "bg-gradient-to-r dark:from-[#171C18] dark:to-[#4D4B4B]"
              )}
            ></span>
            <span className={styles.bodyCenterText}>or</span>
            <span
              className={cn(
                styles.bodyCenterLine,
                "bg-gradient-to-r dark:via-[#4D4B4B] dark:to-[#171C18]"
              )}
            ></span>
          </>
        )}
        {bodyContent?.center}
      </div>
      <div className={styles.bodyBottom}>
        {showLayout && (
          <div className={styles.btnList}>
            <GoogleSignInButton />
            {/* <Button
              className={cn(sharedStyles.authBtn, "text-neutral-950 dark:text-white")}
              variant="primaryOutline"
              hover
            >
              <div className={sharedStyles.authBtnRow}>
                <img src={`/img/icons/socials/with-color${theme !== "dark" ? "/black" : ""}/apple.svg`} alt="" height="1em" />
                <span>Continue with Apple</span>
              </div>
            </Button>
            <Button
              className={cn(sharedStyles.authBtn, "text-neutral-950 dark:text-white")}
              variant="primaryOutline"
              hover
            >
              <div className={sharedStyles.authBtnRow}>
                <img src={`/img/icons/socials/with-color${theme !== "dark" ? "/black" : ""}/x.svg`} alt="" height="1em" />
                <span>Continue with X</span>
              </div>
            </Button>
            <Button
              className={cn(sharedStyles.authBtn, "text-neutral-950 dark:text-white")}
              variant="primaryOutline"
              hover
            >
              <div className={sharedStyles.authBtnRow}>
                <img src="/img/icons/socials/with-color/facebook.svg" alt="" height="1em" />
                <span>Continue with Facebook</span>
              </div>
            </Button> */}
          </div>
        )}
        {bodyContent?.bottom}
      </div>
    </Modal>
  );
};
