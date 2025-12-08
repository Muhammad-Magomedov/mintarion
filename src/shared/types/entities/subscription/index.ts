export type SubscriptionPlanType =
  | "LITE"
  | "PRO"
  | "MAX";

export interface ISubscriptionPlan {
  plan: SubscriptionPlanType;
  description: string;
  pricePerMonth: number;
  pricePerYear: number;
  features: string[];
}
