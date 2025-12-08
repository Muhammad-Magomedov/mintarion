import type { IGetBaseParams } from "@/shared/types/api";
import type { IPost } from "@/shared/types/entities/post";
import type { INewsBaseData } from "@/shared/types/entities/news";
import type { IPaginationMeta } from "@/shared/types/response";

export type NewsType = INewsBaseData & IPost;

export interface INewsFilters {
  search?: string;
  source?: string;
  category?: string;
}

export type GetNewsParamsType = IGetBaseParams & INewsFilters;

export interface IGetNewsResponse extends IPaginationMeta {
  items: INewsBaseData[];
}
