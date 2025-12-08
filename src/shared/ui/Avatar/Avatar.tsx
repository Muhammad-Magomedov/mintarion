import React from "react";
import cn from "classnames";
import { cva, type VariantProps } from "class-variance-authority";
import styles from "./styles.module.scss";
import type { User } from "@supabase/supabase-js";

export const avatarVariants = cva("", {
  variants: {
    variant: {
      primary: "bg-[linear-gradient(45deg,var(--color-green-800),var(--color-green-300))]"
    }
  },
  defaultVariants: {
    variant: "primary"
  }
})

interface IAvatarProps extends VariantProps<typeof avatarVariants> {
  className?: string;
  imgSrc?: string;
  user?: User | null;
}

export function Avatar({ className = "", variant, imgSrc, user }: IAvatarProps) {
  return (
    <div className={cn(styles.content, avatarVariants({ variant }), className)}>
      {imgSrc ? (
        <img className={styles.image} src={imgSrc} alt="" />
      ) : (
        <span className={styles.caption}>
          {user?.email?.charAt(0).toUpperCase() || "U"}
        </span>
      )}
    </div>
  );
}
