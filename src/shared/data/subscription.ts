import type { ISubscriptionPlan } from "@/shared/types/entities/subscription";

export const subscriptionPlans: ISubscriptionPlan[] = [
  {
    plan: "LITE",
    description: "For individual investors",
    pricePerMonth: 33.33,
    pricePerYear: 359.97,
    features: [
        "Personalized newsfeed with AI summaries",
        "Weekly project digests",
        "Basic filters & pre-made screeners",
        "Charts and core metrics"
    ],
  },
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
        "Advanced reviews & research"
    ],
  },
  {
    plan: "MAX",
    description: "For teams, funds, and professional users",
    pricePerMonth: 122.22,
    pricePerYear: 1319.97,
    features: [
        "Personalized newsfeed with AI summaries",
        "Weekly project digests",
        "Basic filters & pre-made screeners",
        "Charts and core metrics",
        "Full access to Copilot (AI Assistant)",
        "Advanced reviews & research",
        "Team roles & shared access",
        "CSV exports and API (on request)",
        "Due-diligence reports",
        "Priority support & private community"
    ],
  },
];
