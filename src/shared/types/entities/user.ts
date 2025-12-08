import type { SubscriptionPlanType } from "./subscription"

export interface IUserProfile {
  id: string
  email: string
  emailConfirmedAt?: string
  authCreatedAt?: string
  firstName?: string
  lastName?: string;
  avatarUrl?: string
  subscriptionPlan?: SubscriptionPlanType;
  created_at?: string
  updated_at?: string
}