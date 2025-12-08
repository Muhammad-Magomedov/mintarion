"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import cn from "classnames";
import { Button, type IButtonProps } from "@/shared/ui/Button/Button";
import styles from "../styles.module.scss";

interface IGoogleSignInButtonProps extends IButtonProps {
  callbackUrl?: string;
  className?: string;
}

export const GoogleSignInButton: React.FC<IGoogleSignInButtonProps> = ({
  children = "Continue with Google",
  className,
  callbackUrl = "/",
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      // Используем NextAuth для Google авторизации
      await signIn("google", { 
        callbackUrl,
        redirect: true 
      });
    } catch (error) {
      console.error("Google sign in error:", error);
      setIsLoading(false);
    }
  };

  return (
    <Button
      className={cn(
        styles.authBtn,
        className,
        "text-neutral-950 dark:text-white"
      )}
      onClick={handleGoogleSignIn}
      disabled={isLoading}
      variant="outline-darkGreen"
      hover
    >
      <div className={styles.authBtnRow}>
        <img src="/img/icons/socials/with-color/google.svg" alt="" />
        <span>{isLoading ? "Loading..." : children}</span>
      </div>
    </Button>
  );
};