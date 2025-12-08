import type { IArticleBaseData } from "@/shared/types/entities/article";
import type { INewsBaseData } from "@/shared/types/entities/news";
import type { IUser } from "@/entities/user";

export const profile: Omit<IUser, "subscriptionPlan"> = {
  id: "77842e7e-e530-4ba3-aa55-8dd20562fa70",
  firstName: "Jacob",
  lastName: "Carter",
  avatarUrl: "/img/profile/avatar.jpg",
  bio: "Trading expert and financial markets analyst. Writing articles on strategies, market insights, and risk management",
  followingCount: 10,
  followersCount: 10,
  telegramUrl: "https://t.me",
  twitterUrl: "https://x.com",
  facebookUrl: "https://www.facebook.com",
};

export const profileStatistics = {
  followers: 1,
  views: 1,
  openRate: 1
}

export const articles: IArticleBaseData[] = [
  {
    id: "e11eda4b-7df0-4edf-a92d-833fbb91fcf1",
    category: "Market Analysis",
    imgSrc: "/img/article/2.png",
    title:
      "Bitcoin surged past $65,000 today, driven by renewed investor optimism and growing institutional interest",
    href: "/articles",
    createdAt: "2025-09-27T16:17:12.049Z",
    author: {
      id: "77842e7e-e530-4ba3-aa55-8dd20562fa70",
      firstName: "Jacob",
      lastName: "Carter",
      avatarUrl: "/img/profile/avatar.jpg",
    },
  },
  {
    id: "e11eda4b-7df0-4edf-a92d-833fbb91fcf2",
    category: "Market Analysis",
    imgSrc: "/img/article/2.png",
    title:
      "Bitcoin surged past $65,000 today, driven by renewed investor optimism and growing institutional interest",
    href: "/articles",
    createdAt: "2025-09-27T16:17:12.049Z",
    author: {
      id: "77842e7e-e530-4ba3-aa55-8dd20562fa70",
      firstName: "Jacob",
      lastName: "Carter",
      avatarUrl: "/img/profile/avatar.jpg",
    },
  },
  {
    id: "e11eda4b-7df0-4edf-a92d-833fbb91fcf3",
    category: "Market Analysis",
    imgSrc: "/img/article/2.png",
    title:
      "Bitcoin surged past $65,000 today, driven by renewed investor optimism and growing institutional interest",
    href: "/articles",
    createdAt: "2025-09-27T16:17:12.049Z",
    author: {
      id: "77842e7e-e530-4ba3-aa55-8dd20562fa70",
      firstName: "Jacob",
      lastName: "Carter",
      avatarUrl: "/img/profile/avatar.jpg",
    },
  },
  {
    id: "e11eda4b-7df0-4edf-a92d-833fbb91fcf4",
    category: "Market Analysis",
    imgSrc: "/img/article/2.png",
    title:
      "Bitcoin surged past $65,000 today, driven by renewed investor optimism and growing institutional interest",
    href: "/articles",
    createdAt: "2025-09-27T16:17:12.049Z",
    author: {
      id: "77842e7e-e530-4ba3-aa55-8dd20562fa70",
      firstName: "Jacob",
      lastName: "Carter",
      avatarUrl: "/img/profile/avatar.jpg",
    },
  },
  {
    id: "e11eda4b-7df0-4edf-a92d-833fbb91fcf5",
    category: "Market Analysis",
    imgSrc: "/img/article/2.png",
    title:
      "Bitcoin surged past $65,000 today, driven by renewed investor optimism and growing institutional interest",
    href: "/articles",
    createdAt: "2025-09-27T16:17:12.049Z",
    author: {
      id: "77842e7e-e530-4ba3-aa55-8dd20562fa70",
      firstName: "Jacob",
      lastName: "Carter",
      avatarUrl: "/img/profile/avatar.jpg",
    },
  },
  {
    id: "e11eda4b-7df0-4edf-a92d-833fbb91fcf6",
    category: "Market Analysis",
    imgSrc: "/img/article/2.png",
    title:
      "Bitcoin surged past $65,000 today, driven by renewed investor optimism and growing institutional interest",
    href: "/articles",
    createdAt: "2025-09-27T16:17:12.049Z",
    author: {
      id: "77842e7e-e530-4ba3-aa55-8dd20562fa70",
      firstName: "Jacob",
      lastName: "Carter",
      avatarUrl: "/img/profile/avatar.jpg",
    },
  },
];

export const resources: Array<{ id: string; imgSrc: string; title: string; description: string }> = [
  { id: "e11eda4b-7df0-4edf-a92d-833fbb91fcfz", imgSrc: "/img/article/2.png", title: "When should I turn on paid subscriptions?", description: "An easy guide to earning money for your work" },
  { id: "e11eda4b-7df0-4edf-a92d-833fbb91fcfx", imgSrc: "/img/article/2.png", title: "When should I turn on paid subscriptions?", description: "An easy guide to earning money for your work" },
  { id: "e11eda4b-7df0-4edf-a92d-833fbb91fcfv", imgSrc: "/img/article/2.png", title: "When should I turn on paid subscriptions?", description: "An easy guide to earning money for your work" },
  { id: "e11eda4b-7df0-4edf-a92d-833fbb91fcfn", imgSrc: "/img/article/2.png", title: "When should I turn on paid subscriptions?", description: "An easy guide to earning money for your work" },
]