export type NewsCategoryType = "bullish" | "neutral" | "bearish";
export type NewsSourceType = "SITES" | "TELEGRAM" | "TWITTER";

export interface INewsBaseData {
  ID: string;
  source: NewsSourceType;
  title: string;
  text: string;
  tags: string[];
  top: boolean;
  publishedAt: string;
  url: string;
  author: string;
  contentSource: {
    name: string;
    type: NewsSourceType;
    categories: string[];
  };
  newsType?: string;
  createdAt: string;
  updatedAt: string;
}

export * from "./category"
export * from "./source"