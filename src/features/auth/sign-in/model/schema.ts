import { z } from "zod";

export const signInStepFirstSchema = z.object({
    email: z.email({ message: "Please enter a valid email address" }),
    isTermsAgreed: z.boolean().refine((val) => val === true, {
        message: "You should agree with terms"
    })
})

export const signInStepSecondSchema = z.object({
    email: z.email(),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
    isTermsAgreed: z.boolean().refine((val) => val === true, {
        message: "You should agree with terms"
    })
})

export type SignInStepFirstInputs = z.infer<typeof signInStepFirstSchema>;
export type SignInStepSecondInputs = z.infer<typeof signInStepSecondSchema>;
