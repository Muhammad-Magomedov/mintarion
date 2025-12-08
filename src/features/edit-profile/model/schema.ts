import { z } from "zod";

export const editProfileSchema = z.object({
    fullName: z.string(),
    bio: z.string(),
    telegramUrl: z.string().startsWith("https://t.me/"),
    twitterUrl: z.string().startsWith("https://x.com/"),
    facebookUrl: z.string().startsWith("https://www.facebook.com/")
})

export type EditProfileForm = z.infer<typeof editProfileSchema>;