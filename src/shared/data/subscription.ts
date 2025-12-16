import type { ISubscriptionPlan } from "@/shared/types/entities/subscription";

export const subscriptionPlans: ISubscriptionPlan[] = [
  {
    plan: "PRO",
    description: "For active traders and researchers",
    pricePerMonth: 77.77,
    pricePerYear: 839.92,
    features: [
      "Personalized newsfeed with AI summaries",
      "Weekly project digests",
      "Basic filters & pre-made screeners",
      "Charts and core metrics",
      "Full access to Copilot (AI Assistant)",
      "Advanced reviews & research",
    ],
  },
];
