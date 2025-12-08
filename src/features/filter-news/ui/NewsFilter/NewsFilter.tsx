"use client";

import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import cn from "classnames";
import { Search } from "lucide-react";
import { SearchForm } from "@/features/search";
import { Select, type ISelectOption } from "@/shared/ui/Select/Select";
import { useNewsFilterStore, useSources, useCategories } from "../../model";
import { useThemeStore } from "@/features/toggle-theme";
import styles from "./styles.module.scss";

export interface ISearchFormData {
  searchText: string;
}

export const NewsFilter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className = "",
  ...props
}) => {
  const { filters, updateFilter } = useNewsFilterStore();
  const { data: sourcesData } = useSources();
  const { data: categoriesData } = useCategories();
  const { theme } = useThemeStore();

  const [sourceOptions, setSourceOptions] = useState<ISelectOption[]>([
    { value: "All", label: "All" }
  ]);

  const [categoryOptions, setCategoryOptions] = useState<ISelectOption[]>([
    { value: "All", label: "All" }
  ]);

  useEffect(() => {
    sourcesData?.data &&
      setSourceOptions([
        ...sourceOptions,
        ...sourcesData.data.map(({ slug, name }) => ({ value: slug, label: name }))
      ]);
  }, [sourcesData]);

  useEffect(() => {
    categoriesData?.data &&
      setCategoryOptions([
        ...categoryOptions,
        ...categoriesData.data.map(({ slug, name }) => ({ value: slug, label: name }))
      ]);
  }, [categoriesData]);

  return (
    <div className={cn(styles.content, className)} {...props}>
      <SearchForm
        placeholder="Search News"
        onValueChange={(value) => updateFilter("search", value)}
      />
      <Select
        className={styles.select}
        value={filters.source}
        options={sourceOptions}
        variant="secondary"
        triggerProps={{ prefixValue: <span className={cn(styles.selectTogglePrefix, "text-[#999595] dark:text-neutral-300")}>Source</span> }}
        onValueChange={(value) =>
          updateFilter("source", value.length > 0 ? value : "")
        }
      />
      <Select
        className={styles.select}
        value={filters.category}
        options={categoryOptions}
        variant="secondary"
        triggerProps={{
          prefixValue: (
            <span className={cn(styles.selectTogglePrefix,  "text-[#999595] dark:text-neutral-300")}>Category</span>
          ),
        }}
        onValueChange={(value) =>
          updateFilter("category", value.length > 0 ? value : "")
        }
      />
    </div>
  );
};
