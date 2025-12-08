import axios from "axios";
import camelcaseKeys from "camelcase-keys";
import { baseInstance } from "@/shared/api/baseInstance"
import { envConfig } from "@/shared/config/env";
import type { IBaseMessageData } from "@/shared/types/entities/ai"
import type { IGetMessagesHistoryResponse } from "./types";

export const aiApi = {
    sendMessage: (payload: IBaseMessageData) => {
        
    },

    getMessageHistory: async (userId: string): Promise<IGetMessagesHistoryResponse> => {
        const response = await axios.get(`/api/gpt/history/${userId}`);
        return camelcaseKeys(response.data, { deep: true });
    }
}