"use client"

import { useRouter, useSearchParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { UseQueryOptions } from "@tanstack/react-query";
import { useArticles, GetArticlesParamsType, IGetArticlesResponse } from "@/entities/article";
import { useArticlesFilterStore } from "./store";
import { articlesApi } from '@/entities/article';

export const useFilteredArticles = (
    params: GetArticlesParamsType = {},
    options?: Omit<UseQueryOptions<IGetArticlesResponse>, "queryKey" | "queryFn">
) => {
    const { filters } = useArticlesFilterStore();
    return useArticles({ ...params, ...filters }, options);
}

export const useUrlParams = (paramKey: string, defaultValue = 'all') => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentParam = searchParams.get(paramKey)

  const handleParamChange = (value: string) => {
    const params = new URLSearchParams(searchParams)
    
    if (value === defaultValue) {
      params.delete(paramKey)
    } else {
      params.set(paramKey, value)
    }
    
    router.push(`/articles?${params.toString()}`)
  }

  return {
    currentParam: currentParam || defaultValue,
    handleParamChange
  }
}

export const useCategories = () => {
  return useQuery({
    queryKey: ['articles', 'categories'],
    queryFn: articlesApi.getCategories
  })
}

export const useFilters = () => {
  return useQuery({
    queryKey: ['articles', 'filters'],
    queryFn: articlesApi.getFilters
  })
}

export const useCategoryTabs = () => {
  const { currentParam, handleParamChange } = useUrlParams('category', 'all')
  
  const { data: categories } = useQuery({
    queryKey: ['articles', 'categories'],
    queryFn: articlesApi.getCategories
  })

  return {
    categories,
    currentCategory: currentParam,
    handleCategoryChange: handleParamChange
  }
}

export const useFilterTabs = () => {
  const { currentParam, handleParamChange } = useUrlParams('filter', 'latest')

  const { data: filters } = useQuery({
    queryKey: ['articles', 'filters'],
    queryFn: articlesApi.getFilters
  })
  
  return {
    filters,
    currentFilter: currentParam,
    handleFilterChange: handleParamChange
  }
}

export const useArticlesList = () => {
  const searchParams = useSearchParams()
  const category = searchParams.get('category')

  const { data: articles, isLoading } = useQuery({
    queryKey: ['articles', category],
    queryFn: () => articlesApi.getArticlesByCategory(category)
  })

  return {
    articles: articles?.data,
    isLoading
  }
}