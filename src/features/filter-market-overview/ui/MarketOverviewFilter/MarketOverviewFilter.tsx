"use client";

import cn from "classnames";
import { v4 as uuidv4 } from "uuid";
import { Checkbox } from "@/shared/lib/shadcn/ui/checkbox";
import { Select, type ISelectOption } from "@/shared/ui/Select/Select";
import { useThemeStore } from "@/features/toggle-theme";
import { useMarketOverviewFilterSettingsStore } from "../../model";
import styles from "./styles.module.scss";

const exchangeList: ISelectOption[] = [
  { value: "All exchanges", label: "All exchanges" },
  { value: "Binance", label: "Binance" },
];

const tokensSortTypeList: ISelectOption[] = [
  { value: "Auto", label: "Auto" },
  { value: "Manually", label: "Manually" },
];

const newsTypesList: ISelectOption[] = [
  { value: "all", label: "All" },
  { value: "bullish", label: "Bullish" },
  { value: "neutral", label: "Neutral" },
  { value: "bearish", label: "Bearish" },
];

export const MarketOverviewFilter: React.FC<
  React.HtmlHTMLAttributes<HTMLDivElement>
> = ({ className = "", ...props }) => {
  const { theme } = useThemeStore();
  const state = useMarketOverviewFilterSettingsStore();

  return (
    <div className={cn(styles.content, className)}>
      <div className={cn(styles.checkboxWrapper, styles.checkboxWrapperFirst)}>
        <Checkbox
          id="tokenFavouritesOnly"
          checked={state.settings.favoritesOnly}
          onCheckedChange={(checked: boolean) =>
            state.updateSettings("favoritesOnly", checked)
          }
        />
        <label className="text-green-750 dark:text-white" htmlFor="tokenFavouritesOnly">Favorites only</label>
      </div>
      <Select
        className={styles.select}
        value={exchangeList[0].value}
        options={exchangeList}
        variant="primary"
        triggerProps={{ className: styles.selectTrigger }}
        onValueChange={(value) => null}
      />
      <Select
        className={cn(styles.select, styles.tokensSortSelect)}
        value={tokensSortTypeList[0].value}
        options={tokensSortTypeList}
        variant="primary"
        triggerProps={{ className: styles.selectTrigger, enableIcon: false }}
        onValueChange={(value) => null}
      />
      <div className={cn(styles.checkboxWrapper, styles.checkboxWrapperSecond)}>
        <Checkbox
          id="showNews"
          checked={state.settings.showNews}
          onCheckedChange={(checked: boolean) =>
            state.updateSettings("showNews", checked)
          }
        />
        <label className="text-green-750 dark:text-white" htmlFor="showNews">Show news</label>
      </div>
      <Select
        className={styles.select}
        value={state.settings.newsType ?? "All"}
        options={newsTypesList}
        variant="primary"
        triggerProps={{ className: styles.selectTrigger }}
        onValueChange={(value) => state.setSettings({ ...state.settings, newsType: value })}
      />
    </div>
  );
};
