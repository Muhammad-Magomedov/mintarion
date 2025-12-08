import { useEffect } from "react";
import {
    useQuery,
    useMutation,
    useQueryClient,
    UseQueryOptions,
    UseMutationOptions,
    UseQueryResult
} from "@tanstack/react-query";
import { binanceApi } from "@/shared/services/binance";
import { useMarketTokensStore } from "./store";
import type { IGetTopUSDTokensResponse } from "@/shared/types/services/binance";
import type { ITokenTickerBaseData } from "@/shared/types/web3";
import type { IMarketToken } from "./types";

interface UseTopUSDTokensOptions {
  pair?: string;
  limit?: number;
  as?: "object" | "array";
  enabled?: boolean;
  staleTime?: number;
  refetchInterval?: number;
  updateStore?: boolean;
}

export const useTopTokens = (
  options: UseTopUSDTokensOptions = {}
): UseQueryResult<IGetTopUSDTokensResponse, Error> => {
  const {
    pair = "USDT",
    limit = 10,
    as = "object",
    enabled = true,
    staleTime = 5 * 60 * 1000,
    refetchInterval,
    updateStore = true,
  } = options;

  const mergeData = useMarketTokensStore((state) => state.mergeData);

  const query = useQuery({
    queryKey: ['topTokens', pair, limit, as],
    queryFn: () => binanceApi.getTopTokens(pair, limit, as),
    enabled,
    staleTime,
    refetchInterval,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  useEffect(() => {
    if (updateStore && query.data?.data && as === "object") {
      mergeData(query.data.data as Record<string, IMarketToken>);
    }
  }, [query.data, updateStore, as, mergeData]);

  return query;
};