import axios from "axios";
import { baseInstance } from "@/shared/api/baseInstance";
import type { GetLiquidationsParamsType, IGetLiquidationsResponse } from "./types";

export const liquidationsApi = {
  getLiquidations: async (params: GetLiquidationsParamsType = {}): Promise<IGetLiquidationsResponse> => {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(
      ([key, value]) => value && queryParams.append(key, String(value))
    );

    const response = await axios.get(`/api/liquidations?${queryParams.toString()}`);
    return response.data;
  }
};
