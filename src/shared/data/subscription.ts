import type { ISubscriptionPlan } from "@/shared/types/entities/subscription";

export const subscriptionPlans: ISubscriptionPlan[] = [
  {
    plan: "PRO",
    description: "For active traders and researchers",
    pricePerMonth: 39,
    pricePerYear: 420,
    features: [
      "Full access to MintaLab AI Copilot",
      "Advanced review & weekly digests",
      "Personalized newsfeed",
    ],
  },
];
