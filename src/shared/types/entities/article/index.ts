import type { IUserProfile } from "../user";
import type { IPost, IPostBaseData } from "../post";

export type ArticleCategoryType = "All" | string;

export type ArticleAuthorType = Pick<IUserProfile, "id" | "firstName" | "lastName" | "avatarUrl">

export interface IArticleBaseData extends IPostBaseData {
  category: ArticleCategoryType;
  author: ArticleAuthorType;
}

export interface IArticle extends IArticleBaseData {
  content: string;
}