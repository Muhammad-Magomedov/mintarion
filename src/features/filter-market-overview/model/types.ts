import type { NewsCategoryType, CentralizedExchangeType } from "@/shared/types/data";
import { INewsBaseData } from "@/shared/types/entities/news";

export interface IMarketOverviewFilterSettings {
    favoritesOnly: boolean;
    exchange: "All" | CentralizedExchangeType;
    mode: "auto" | "manual";
    showNews: boolean;
    newsType: INewsBaseData["newsType"];
}