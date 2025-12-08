import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { useNews, GetNewsParamsType, IGetNewsResponse, newsApi } from "@/entities/news";
import { useNewsFilterStore } from "./store";

export const useFilteredNews = (
    params: GetNewsParamsType = {},
    options?: Omit<UseQueryOptions<IGetNewsResponse>, "queryKey" | "queryFn">
) => {
    const { filters } = useNewsFilterStore();
    return useNews({ ...params, ...filters }, options);
}

export const useSources = () => {
  return useQuery({
    queryKey: ['news', 'sources'],
    queryFn: newsApi.getSources
  })
}

export const useCategories = () => {
  return useQuery({
    queryKey: ['news', 'categories'],
    queryFn: newsApi.getCategories
  })
}