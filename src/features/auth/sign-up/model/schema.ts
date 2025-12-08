import { z } from "zod";

const baseSchema = z.object({
  email: z.email({ message: "Please enter a valid email address" }),
  isTermsAgreed: z.boolean().refine((val) => val === true, {
    message: "You should agree with terms",
  }),
});

export const signUpStepFirstSchema = baseSchema;

export const signUpStepSecondSchema = baseSchema.extend({
  confirmationCode: z
    .string()
    .length(6, { message: "Confirmation code must be 6 digits" })
    .regex(/^\d+$/, { message: "Confirmation code must contain only digits" }),
});

export const signUpStepThirdSchema = signUpStepSecondSchema.extend({
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export type SignUpStepFirstInputs = z.infer<typeof signUpStepFirstSchema>;
export type SignUpStepSecondInputs = z.infer<typeof signUpStepSecondSchema>;
export type SignUpStepThirdInputs = z.infer<typeof signUpStepThirdSchema>;
