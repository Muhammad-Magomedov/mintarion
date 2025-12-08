import type { SubscriptionPlanType } from "@/shared/types/entities/subscription";

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
  bio: string;
  followingCount: number;
  followersCount: number;
  telegramUrl: string;
  twitterUrl: string;
  facebookUrl: string;
  subscriptionPlan: SubscriptionPlanType | null;
}

export interface IUpdateUserRequest {
  first_name?: string;
  last_name?: string;
  email?: string;
  avatar?: File;
}

export interface IUpdateUserResponse {
  success: boolean;
  user?: IUser;
  error?: string;
}
