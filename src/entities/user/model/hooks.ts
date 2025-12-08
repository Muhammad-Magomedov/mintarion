import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/shared/hooks/auth';
import { userApi } from './api';

const userKeys = {
  user: ['user'] as const,
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
      console.error('Error updating user:', error);
    }
  });
}

export function useUpdateUserOptimistic() {
  const queryClient = useQueryClient();
  const { refreshUserProfile, updateUserProfileOptimistic } = useAuth();
  
  return useMutation({
    mutationFn: ({ userId, data }: IUpdateUserVariables) => 
      userApi.update(userId, data),
    
    onMutate: async ({ data }) => {
      // Получаем данные из FormData
      const firstname = data.get('firstname') as string | null;
      const lastname = data.get('lastname') as string | null;
      const email = data.get('email') as string | null;
      const avatarFile = data.get('avatar') as File | null;
      
      // Подготавливаем обновления
      const updates: any = {};
      if (firstname) updates.firstName = firstname;
      if (lastname) updates.lastName = lastname;
      if (email) updates.email = email;
      
      // Создаем временный URL для аватара
      if (avatarFile && avatarFile.size > 0) {
        const previewUrl = URL.createObjectURL(avatarFile);
        updates.avatarUrl = previewUrl;
      }
      
      // Оптимистично обновляем UI
      updateUserProfileOptimistic(updates);
      
      // Возвращаем контекст для возможного отката
      return { previousProfile: updates };
    },
    
    onSuccess: async (response) => {
      if (response.success) {
        // Обновляем данные из сервера для получения реального URL аватара
        await refreshUserProfile();
        queryClient.invalidateQueries({ queryKey: userKeys.user });
      }
    },
    
    onError: async (error, variables, context) => {
      console.error('Error updating user:', error);
      // Откатываем оптимистичное обновление
      await refreshUserProfile();
    },
    
    onSettled: () => {
      // Очищаем временные URL объектов
      // (это произойдет автоматически при обновлении с реальным URL)
    }
  });
}