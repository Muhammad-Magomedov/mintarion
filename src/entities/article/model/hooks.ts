import {
    useQuery,
    useMutation,
    useQueryClient,
    UseQueryOptions,
    UseMutationOptions
} from "@tanstack/react-query";
import { articlesApi } from "./api";
import type { GetArticlesParamsType, IGetArticleQueryParams, IGetArticlesResponse } from "./types";

export const articleKeys = {
  all: ['articles'] as const,
  lists: () => [...articleKeys.all, 'list'] as const,
  list: (params?: GetArticlesParamsType) => [...articleKeys.lists(), params] as const,
  details: () => [...articleKeys.all, 'detail'] as const,
  detail: (id: string, params?: IGetArticleQueryParams) => 
    [...articleKeys.details(), id, params] as const,
  categories: () => [...articleKeys.all, 'categories'] as const,
  filters: () => [...articleKeys.all, 'filters'] as const,
};

export const useArticle = (
  id: string, 
  params?: IGetArticleQueryParams,
  options?: {
    enabled?: boolean;
    staleTime?: number;
  }
) => {
  return useQuery({
    queryKey: articleKeys.detail(id, params),
    queryFn: () => articlesApi.getArticleById(id, params),
    enabled: options?.enabled ?? !!id,
    staleTime: options?.staleTime ?? 5 * 60 * 1000,
  });
};

export const useArticleWithNavigation = (id: string) => {
  const currentArticle = useArticle(id);
  const nextArticle = useArticle(id, { direction: 'next' });
  const prevArticle = useArticle(id, { direction: 'prev' });

  return {
    article: currentArticle,
    nextArticle,
    prevArticle,
    isLoading: currentArticle.isLoading || nextArticle.isLoading || prevArticle.isLoading,
    isError: currentArticle.isError || nextArticle.isError || prevArticle.isError,
  };
};

export const useArticles = (
  params?: GetArticlesParamsType,
  options?: {
    enabled?: boolean;
    staleTime?: number;
  }
) => {
  return useQuery({
    queryKey: articleKeys.list(params),
    queryFn: () => articlesApi.getArticles(params),
    enabled: options?.enabled,
    staleTime: options?.staleTime ?? 5 * 60 * 1000,
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: articleKeys.categories(),
    queryFn: () => articlesApi.getCategories(),
    staleTime: 10 * 60 * 1000,
  });
};

export const useFilters = () => {
  return useQuery({
    queryKey: articleKeys.filters(),
    queryFn: () => articlesApi.getFilters(),
    staleTime: 10 * 60 * 1000,
  });
};