import {
    useQuery,
    UseQueryOptions,
} from "@tanstack/react-query";
import { newsApi } from "./api";
import type { GetNewsParamsType, IGetNewsResponse } from "./types";

const newsKeys = {
  all: ["news"] as const,
  list: (params: GetNewsParamsType = {}) => ["news", "list", params] as const,
  topList: ["news", "list", "top"] as const,
};


export const useNews = (
    params: GetNewsParamsType = {},
    options?: Omit<UseQueryOptions<IGetNewsResponse>, "queryKey" | "queryFn">
) => {
    return useQuery({
        queryKey: newsKeys.list(params),
        queryFn: () => newsApi.getNews(params),
        staleTime: 5 * 60 * 1000,
        ...options
    })
}

export const useTopNews = (
    options?: Omit<UseQueryOptions<Pick<IGetNewsResponse, "items" | "total">>, "queryKey" | "queryFn">
) => {
    return useQuery({
        queryKey: newsKeys.topList,
        queryFn: () => newsApi.getTopNews(),
        staleTime: 5 * 60 * 1000,
        ...options
    })
}
