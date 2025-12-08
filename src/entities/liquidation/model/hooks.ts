import {
    useQuery,
    UseQueryOptions,
} from "@tanstack/react-query";
import { liquidationsApi } from "./api";
import type { GetLiquidationsParamsType, IGetLiquidationsResponse } from "./types";

const liquidationsKeys = {
  all: ["liquidations"] as const,
  list: (params: GetLiquidationsParamsType = {}) => ["liquidations", "list", params] as const,
};


export const useLiquidations = (
    params: GetLiquidationsParamsType = {},
    options?: Omit<UseQueryOptions<IGetLiquidationsResponse>, "queryKey" | "queryFn">
) => {
    return useQuery({
        queryKey: liquidationsKeys.list(params),
        queryFn: () => liquidationsApi.getLiquidations(params),
        staleTime: 5 * 60 * 1000,
        ...options
    })
}