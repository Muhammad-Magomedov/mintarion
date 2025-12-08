"use client";

import { useEffect } from "react";
import { Moon, Sun1 } from "iconsax-react";
import cn from "classnames";
import { useThemeStore } from "../../model/store";
import { Button } from "@/shared/ui/Button/Button";
import styles from "./styles.module.scss";

export const ToggleTheme: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className = "",
  ...props
}) => {
  const { theme, setTheme } = useThemeStore((state) => state);

  useEffect(() => {
    if (document) {
      switch (theme) {
        case "light":
          document.documentElement.classList.remove("dark");
          document.documentElement.classList.add("light");
          break;
        case "dark":
          document.documentElement.classList.remove("light");
          document.documentElement.classList.add("dark");
          break;
      }

      // Принудительно обновляем стили input элементов при переключении темы
      // Находим все input элементы и принудительно обновляем их стили
      const allInputs = document.querySelectorAll(
        'input[type="text"], input[type="email"], input[type="password"], input:not([type])'
      );
      allInputs.forEach((input) => {
        const element = input as HTMLInputElement;
        const isFocused = document.activeElement === element;

        // Принудительно обновляем цвет текста в зависимости от темы
        const textColor = theme === "dark" ? "#fff" : "#000";
        element.style.color = textColor;

        // Если есть значение, принудительно обновляем стили через изменение и восстановление значения
        if (element.value) {
          const originalValue = element.value;

          // Временно изменяем значение, чтобы заставить браузер пересчитать стили
          requestAnimationFrame(() => {
            element.value = "";
            requestAnimationFrame(() => {
              element.value = originalValue;
              element.style.color = textColor;
              if (isFocused) {
                element.focus();
              }
            });
          });
        } else {
          // Даже если нет значения, обновляем цвет
          element.style.color = textColor;
        }
      });
    }
  }, [theme]);

  return (
    <div
      className={cn(
        styles.content,
        styles[theme],
        "light:border-transparent light:bg-gradient-to-r light:from-[#DCDCDC] light:to-[#BEBEBE] light:bg-clip-border",
        "dark:border-transparent dark:bg-[linear-gradient(45deg,_#575656,_#424040)] dark:bg-clip-border",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          styles.body,
          "light:bg-[linear-gradient(to_bottom,_#F3F8F2,_#F1FFEE)]",
          "dark:bg-[rgba(35, 144, 80, 0.05)]"
        )}
      >
        <Button
          className={styles.btn}
          type="button"
          shape="square"
          variant={theme === "dark" ? "darkGreen" : "transparent"}
          onClick={() => setTheme("dark")}
        >
          <Moon color={theme === "dark" ? "#fff" : "#A4A2A2"} size={20} />
        </Button>
        <Button
          className={styles.btn}
          type="button"
          shape="square"
          variant={theme === "light" ? "darkGreen" : "transparent"}
          onClick={() => setTheme("light")}
        >
          <Sun1 color={theme === "light" ? "#fff" : "#A4A2A2"} size={24} />
        </Button>
      </div>
    </div>
  );
};
