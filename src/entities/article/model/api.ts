import axios from "axios";
import camelcaseKeys from "camelcase-keys";
import { baseInstance } from "@/shared/api/baseInstance";
import type {
  GetArticlesParamsType,
  IGetArticleQueryParams,
  IGetArticlesResponse,
  IGetArticleResponse,
  IPostArticlePayload,
  IPostArticleResponse,
} from "./types";
import type { ICategory } from "@/shared/types/entities/post";
import type { IArticleBaseData } from "@/shared/types/entities/article";

export const articlesApi = {
  createArticle: async (
    data: IPostArticlePayload
  ): Promise<IPostArticleResponse> => {
    const response = await baseInstance.post(`/articles`, data);

    return response.data;
  },

  getArticleById: async (
    id: string,
    params: IGetArticleQueryParams = {}
  ): Promise<IGetArticleResponse> => {
    const response = await baseInstance.get(
      `/articles/${id}?${Object.entries(params)
        .map(([k, v]) => `${k}=${v}`)
        .join("&")}`
    );
    return camelcaseKeys(response.data, { deep: true });
  },

  getArticles: async (
    params: GetArticlesParamsType = {}
  ): Promise<IGetArticlesResponse> => {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(
      ([key, value]) => value && queryParams.append(key, String(value))
    );

    const response = await baseInstance.get(
      `/articles?${queryParams.toString()}`
    );
    return camelcaseKeys(response.data, { deep: true });
  },

  getArticlesByCategory: async (
    category: string | null
  ): Promise<IGetArticlesResponse> => {
    const response = await baseInstance.get(
      `/articles?${category ? `category=${category}` : ""}`
    );
    return response.data;
  },

  getCategories: async (): Promise<{ data: ICategory[] }> => {
    const response = await baseInstance.get(`/articles/categories`);
    return response.data;
  },

  getFilters: async (): Promise<{ data: ICategory[] }> => {
    const response = await baseInstance.get(`/articles/filters`);
    return response.data;
  },
};
