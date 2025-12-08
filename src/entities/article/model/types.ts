import type { IUserProfile } from "@/shared/types/entities/user";
import type { IGetBaseParams } from "@/shared/types/api";
import type { IArticle, IArticleBaseData } from "@/shared/types/entities/article";
import type { IPost } from "@/shared/types/entities/post";

export type ArticleType = IArticleBaseData & IPost;

export interface IArticlesFilters {
  search?: string;
  sortBy?: string;
  category?: string;
}

export type GetArticlesParamsType = IGetBaseParams & IArticlesFilters;

export interface IGetArticleQueryParams {
  direction?: "prev" | "next";
}

export interface IGetArticlesResponse {
  data: IArticle[];
}

export interface IGetArticleResponse {
  data: IArticle;
}

export interface IPostArticlePayload extends Omit<IArticle, "id" | "createdAt"> {}

export interface IPostArticleResponse {
  data: {
    id: string;
  }
}
