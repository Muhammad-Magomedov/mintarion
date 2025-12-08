import type { IGetBaseParams } from "@/shared/types/api";
import type { IPaginationMeta } from "@/shared/types/response";
import { ILiquidationBaseData } from "@/shared/types/entities/liquidation";

export type GetLiquidationsParamsType = IGetBaseParams;

export interface IGetLiquidationsResponse extends IPaginationMeta {
  items: ILiquidationBaseData[];
}
