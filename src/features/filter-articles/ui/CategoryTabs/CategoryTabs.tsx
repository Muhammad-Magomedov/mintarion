"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import cn from "classnames";
import { useCategoryTabs, useFilterTabs } from "../../model/hooks";
import styles from "./styles.module.scss";

export const CategoryTabs: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className = "",
  ...props
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const hasNoParams = searchParams.toString() === "";

  const { categories, currentCategory, handleCategoryChange } =
    useCategoryTabs();
  const { filters, currentFilter, handleFilterChange } = useFilterTabs();

  // Получаем реальные значения из URL, а не defaultValue
  const actualCategory = searchParams.get("category");
  const actualFilter = searchParams.get("filter");

  return (
    <div className={cn(styles.content, className)}>
      <div className={styles.btnList}>
        <button
          onClick={() => router.push("/articles")}
          className={cn(
            styles.btn,
            "text-[#999595] dark:text-neutral-300",
            pathname === "/articles" &&
              hasNoParams &&
              cn(styles.active, "bg-green-600")
          )}
          type="button"
        >
          Explore
        </button>

        {filters?.data?.map((filter) => (
          <button
            key={filter.id}
            onClick={() =>
              handleFilterChange(
                actualFilter !== filter.slug ? filter.slug : ""
              )
            }
            className={cn(
              styles.btn,
              "text-[#999595] dark:text-neutral-300",
              actualFilter === filter.slug && cn(styles.active, "bg-green-600")
            )}
            type="button"
          >
            {filter.name}
          </button>
        ))}

        {categories?.data?.map((category) => (
          <button
            key={category.id}
            onClick={() =>
              handleCategoryChange(
                actualCategory !== category.slug ? category.slug : ""
              )
            }
            className={cn(
              styles.btn,
              "text-[#999595] dark:text-neutral-300",
              actualCategory === category.slug &&
                cn(styles.active, "bg-green-600")
            )}
            type="button"
          >
            {category.name}
          </button>
        ))}
      </div>
      <div
        className={cn(
          styles.line,
          "bg-linear-to-r from-[#DCDCDC] to-[#CDE1D0] dark:from-[#424040] dark:to-[#2B332E]"
        )}
      ></div>
    </div>
  );
};
