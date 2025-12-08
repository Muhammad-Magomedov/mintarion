"use client";

import { useEffect, useState } from "react";
import cn from "classnames";
import styles from "./styles.module.scss";

interface MobileBlockProps {
  children: React.ReactNode;
  breakpoint?: number; // ширина экрана в пикселях, ниже которой показывается заглушка
}

export const MobileBlock: React.FC<MobileBlockProps> = ({
  children,
  breakpoint = 768, // по умолчанию 768px (планшеты и меньше)
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    // Проверяем при монтировании
    checkMobile();

    // Добавляем слушатель изменения размера окна
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, [breakpoint]);

  // Не рендерим ничего до монтирования, чтобы избежать гидратации
  if (!isMounted) {
    return null;
  }

  if (isMobile) {
    return (
      <div className={cn(styles.container, "light:bg-gradient-to-b light:from-[rgba(243,248,242,0.3)] light:to-[rgba(241,255,238,0.3)] dark:bg-[rgba(17,17,17,1)]")}>
        <div className={styles.content}>
          <h1 className={cn(styles.title, "text-neutral-950 dark:text-white")}>
            Недоступно с телефона
          </h1>
          <p className={cn(styles.message, "text-neutral-700 dark:text-gray-400")}>
            Пожалуйста, откройте приложение на компьютере или планшете
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

