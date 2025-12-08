"use client";

import { useEffect } from "react";
import Link from "next/link";
import cn from "classnames";
import { ChevronsUpDown, ChevronRight, Settings } from "lucide-react";
import {
  MarketOverviewFilter,
  useMarketOverviewFilterSettingsStore,
} from "@/features/filter-market-overview";
import { useThemeStore } from "@/features/toggle-theme";
import { NewsCard, useNews } from "@/entities/news";
import { useLiquidations } from "@/entities/liquidation";
import {
  MarketTokenRow,
  useMarketTokensStore,
  useTopTokens,
} from "@/entities/market-token";
import { binanceApi } from "@/shared/services/binance";
import { getTimeAgoStr } from "@/shared/utils";
import styles from "./styles.module.scss";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  setCurrentTicker: React.Dispatch<React.SetStateAction<string>>;
}

export const MarketOverview: React.FC<Props> = ({
  className = "",
  setCurrentTicker,
  ...props
}) => {
  const { theme } = useThemeStore();

  const marketOverviewSettings = useMarketOverviewFilterSettingsStore(
    (state) => state.settings
  );
  const { data: marketTokensData, updateData: updateMarketTokensData } =
    useMarketTokensStore();
  const { isLoading, error } = useTopTokens({
    pair: "USDT",
    limit: 10,
    as: "object",
    refetchInterval: 30000,
    updateStore: true,
  });
  const { data: newsData } = useNews({ source: "SITES" });
  const { data: liquidations } = useLiquidations();

  const getNewsCardVariantByCategory = (category: string) => {
    switch (category) {
      case "bullish":
        return "green";
      case "neutral":
        return "yellow";
      case "bearish":
        return "red";
      default:
        return "green";
    }
  };

  return (
    <div
      className={cn(
        styles.content,
        className,
        "light:bg-green-20",
        "dark:bg-green-980"
      )}
      {...props}
    >
      <div className={cn(styles.body, "bg-[rgba(255,255,255,0.8)] dark:bg-[rgba(13,13,13,0.6)] dark:border-gray-650")}>
        <MarketOverviewFilter className={cn(styles.marketOverviewFilter)} />
        <table
          className={cn(
            styles.table,
            "border-t-[1px] border-solid",
            "light:border-[#F3F3F3]",
            "dark:border-[#202020]"
          )}
        >
          <thead
            className={cn(
              "border-b-[1px] border-solid",
              "light:border-[#F3F3F3]",
              "dark:border-[#424040]"
            )}
          >
            <tr>
              <th>
                <Settings
                  className="cursor-pointer"
                  color={theme === "dark" ? "#D4D4D4" : "#8F8E8F"}
                />
              </th>
              <th className="border-r-[1px] border-solid light:border-r-[#F3F3F3] text-[#8F8E8F] font-normal dark:border-r-[#202020] dark:text-[#A4A2A2]">
                <div className="flex justify-between items-center">
                  <span>Search</span>
                  <ChevronsUpDown style={{ width: 18 }} />
                </div>
              </th>
              <th className="border-r-[1px] border-solid light:border-r-[#F3F3F3] text-[#8F8E8F] font-normal dark:border-r-[#202020] dark:text-[#A4A2A2]">
                Price
              </th>
              <th className="border-r-[1px] border-solid light:border-r-[#F3F3F3] text-[#8F8E8F] font-normal dark:border-r-[#202020] dark:text-[#A4A2A2]">
                24h Chg
              </th>
              <th className="border-r-[1px] border-solid light:border-r-[#F3F3F3] text-[#8F8E8F] font-normal dark:border-r-[#202020] dark:text-[#A4A2A2]">24h Volume</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(marketTokensData)
              .filter(
                ([ticker, data]) =>
                  (marketOverviewSettings.favoritesOnly && data.isLiked) ||
                  !marketOverviewSettings.favoritesOnly
              )
              .map(([ticker, data]) => (
                <MarketTokenRow
                  className={cn(
                    "cursor-pointer border-b-[1px] border-solid",
                    "border-[#F3F3F3]",
                    "dark:border-[#202020]"
                  )}
                  onTickerClick={() => setCurrentTicker(ticker)}
                  onLike={(ticker) =>
                    updateMarketTokensData(ticker, {
                      ...data,
                      isLiked: !data.isLiked,
                    })
                  }
                  data={data}
                  ticker={ticker}
                  key={ticker}
                />
              ))}
          </tbody>
        </table>
      </div>
      <div className={cn(styles.footer, "bg-green-50 dark:bg-[rgba(13,13,13,0.6)] dark:border-gray-650")}>
        {marketOverviewSettings.showNews && (
          <>
            <div className={styles.liquidationNewsHeader}>
              <span className="text-green-750 dark:text-neutral-300">
                Last Liquidation
              </span>
              <Link
                className={cn(styles.footerLink, "text-green-750 dark:text-neutral-300")}
                href="/news"
              >
                <span>See all latest</span>
                <ChevronRight />
              </Link>
            </div>
            <ul className={styles.newsList}>
              {liquidations?.items
                ?.map((data) => (
                  <li
                    className={cn(
                      styles.newsListItem,
                      styles.default,
                      "bg-linear-to-b from-green-20 to-green-40 border-green-800 text-neutral-950 dark:from-zinc-900 dark:to-neutral-900 dark:border-gray-650 dark:text-white"
                    )}
                  >
                    <Link
                      className={styles.newsListItemContent}
                      href={data?.linkID ?? "/"}
                      target="_blank"
                    >
                      <span>{data?.text}</span>
                    </Link>
                  </li>
                ))}
            </ul>
          </>
        )}
      </div>
      <div className={cn(styles.footer, "bg-green-50 dark:bg-[rgba(13,13,13,0.6)] dark:border-gray-650")}>
        {marketOverviewSettings.showNews && (
          <>
            <Link
              className={cn(styles.footerLink, "text-green-750 dark:text-neutral-300")}
              href="/news"
            >
              <span>See all latest</span>
              <ChevronRight />
            </Link>
            <ul className={styles.newsList}>
              {newsData?.items
                ?.filter(
                  (item) =>
                    item.newsType === marketOverviewSettings.newsType ||
                    marketOverviewSettings.newsType === "all"
                )
                ?.map((data) => (
                  <NewsCard
                    key={data.ID}
                    data={data}
                    variant={getNewsCardVariantByCategory(
                      data?.newsType ?? "green"
                    )}
                    as="li"
                  />
                ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};
