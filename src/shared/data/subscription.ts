import type { ISubscriptionPlan } from "@/shared/types/entities/subscription";

export const subscriptionPlans: ISubscriptionPlan[] = [
  {
    plan: "PRO",
    description: "For active traders and researchers",
    pricePerMonth: 77.77,
    pricePerYear: 839.92,
    features: [
      "Full access to MintaLab AI Copilot",
      "Advanced review & weekly digests",
      "Personalized newsfeed",
    ],
  },
];
