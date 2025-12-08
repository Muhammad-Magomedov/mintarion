import axios from "axios";
import { baseInstance } from "@/shared/api/baseInstance";
import type { GetNewsParamsType, IGetNewsResponse } from "./types";
import type { ICategory, ISource } from "@/shared/types/entities/news";

export const newsApi = {
  getNews: async (params: GetNewsParamsType = {}): Promise<IGetNewsResponse> => {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(
      ([key, value]) => value && queryParams.append(key, String(value))
    );

    // const response = await baseInstance.get(`/news/${queryParams.toString()}`);
    const response = await axios.get(`/api/news?${queryParams.toString()}`);
    return response.data;
  },

  getTopNews: async(): Promise<Pick<IGetNewsResponse, "items" | "total">> => {
    const response = await axios.get("/api/news/top");
    return response.data;
  },
  
  getSources: async(): Promise<{ data: ISource[] }> => {
    const response = await baseInstance.get(`/news/sources`);
    return response.data;
  },

  getCategories: async(): Promise<{ data: ICategory[] }> => {
    const response = await baseInstance.get(`/news/categories`);
    return response.data;
  }
};
