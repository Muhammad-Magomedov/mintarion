import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/shared/hooks/auth";
import { userApi } from "./api";

const userKeys = {
  user: ["user"] as const,
};

interface IUpdateUserVariables {
  userId: string;
  data: FormData;
}

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { refreshUserProfile } = useAuth();

  return useMutation({
    mutationFn: ({ userId, data }: IUpdateUserVariables) =>
      userApi.update(userId, data),
    onSuccess: async (response) => {
      if (response.success) {
        await refreshUserProfile();

        queryClient.invalidateQueries({ queryKey: userKeys.user });
      }
    },
    onError: (error) => {
      console.error("Error updating user:", error);
    },
  });
}

export function useUpdateUserOptimistic() {
  const queryClient = useQueryClient();
  const { refreshUserProfile, updateUserProfileOptimistic } = useAuth();

  return useMutation({
    mutationFn: ({ userId, data }: IUpdateUserVariables) =>
      userApi.update(userId, data),

    onMutate: async ({ data }) => {
      const firstname = data.get("firstname") as string | null;
      const lastname = data.get("lastname") as string | null;
      const email = data.get("email") as string | null;
      const avatarFile = data.get("avatar") as File | null;

      const updates: any = {};
      if (firstname) updates.firstName = firstname;
      if (lastname) updates.lastName = lastname;
      if (email) updates.email = email;

      if (avatarFile && avatarFile.size > 0) {
        const previewUrl = URL.createObjectURL(avatarFile);
        updates.avatarUrl = previewUrl;
      }

      updateUserProfileOptimistic(updates);

      return { previousProfile: updates };
    },

    onSuccess: (response) => {
      if (response.success) {
        refreshUserProfile().catch(console.error);
        queryClient.invalidateQueries({ queryKey: userKeys.user });
      }
    },

    onError: (error) => {
      console.error("Error updating user:", error);
      refreshUserProfile().catch(console.error);
    },

    onSettled: () => {},
  });
}
