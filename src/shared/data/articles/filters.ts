import type { IFilter } from "@/shared/types/entities/post";

export const filters: IFilter[] = [
  {
    id: "32243b64-2a89-4e2b-a538-2b1ef458c30b",
    slug: "trending",
    name: "Trending",
    description: "Shows the most popular and discussed articles.",
    createdAt: "2025-09-27T00:00:00.000Z",
    updatedAt: "2025-09-27T00:00:00.000Z",
  },
  {
    id: "422e9823-f611-4e25-97b6-c36d05d0e4e8",
    slug: "popular",
    name: "Popular",
    description: "Highlights articles with the highest views and engagement.",
    createdAt: "2025-09-27T00:00:00.000Z",
    updatedAt: "2025-09-27T00:00:00.000Z",
  },
];