"use client";

import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import cn from "classnames";
import { Search } from "lucide-react";
import { SearchForm } from "@/features/search";
import { Select, type ISelectOption } from "@/shared/ui/Select/Select";
import { useArticlesFilterStore } from "../../model/store";
import { useThemeStore } from "@/features/toggle-theme";
import styles from "./styles.module.scss";

export interface ISearchFormData {
  searchText: string;
}

export interface IArticlesFilterProps extends React.HTMLAttributes<HTMLDivElement> {
  classNames?: {
    searchForm?: string;
    categorySelect?: string;
    sortSelect?: string;
  }
}

const categoryOptions: ISelectOption[] = [
  { value: "all", label: "All" },
  { value: "market-analysis", label: "Market Analysis" },
  { value: "trading-strategies", label: "Trading Strategies" },
  { value: "defi-nfts", label: "DeFi & NFTs" },
  { value: "trading-psychology", label: "Trading Psychology" },
];

const sortByOptions: ISelectOption[] = [
  { value: "relevance", label: "Relevance" },
  { value: "latest", label: "Latest" },
  { value: "oldest", label: "Oldest" },
  { value: "most-popular", label: "Most Popular" },
  { value: "least-popular", label: "Least Popular" },
];

export const ArticlesFilter: React.FC<IArticlesFilterProps> = ({
  className = "",
  classNames,
  ...props
}) => {
  const { filters, updateFilter } = useArticlesFilterStore();
  const { theme } = useThemeStore();

  return (
    <div className={cn(styles.content, className)} {...props}>
      <SearchForm
        className={classNames?.searchForm}
        placeholder="Search Articles"
        onValueChange={(value) => updateFilter("search", value)}
      />
      <Select
        className={cn(styles.select, classNames?.categorySelect)}
        value={filters.category}
        options={categoryOptions}
        variant="secondary"
        triggerProps={{
          prefixValue: (
            <span className={cn(styles.selectTogglePrefix, "text-[#999595] dark:text-neutral-300")}>Category</span>
          ),
        }}
        onValueChange={(value) =>
          updateFilter("category", value.length > 0 ? value : "")
        }
      />
      <Select
        className={cn(styles.select, classNames?.sortSelect)}
        value={filters.sortBy}
        options={sortByOptions}
        variant="secondary"
        triggerProps={{
          prefixValue: (
            <span className={cn(styles.selectTogglePrefix, "text-[#999595] dark:text-neutral-300")}>Sort by</span>
          ),
        }}
        onValueChange={(value) =>
          updateFilter("sortBy", value.length > 0 ? value : "")
        }
      />
    </div>
  );
};
