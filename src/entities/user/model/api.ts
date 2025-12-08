import { baseInstance } from "@/shared/api/baseInstance";

export const userApi = {
  update: async (userId: string, data: FormData) => {
    const response = await baseInstance.put(`/users/${userId}`, data);
    return response.data;
  },
};
