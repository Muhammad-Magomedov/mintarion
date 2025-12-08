import z from "zod";

export const imageFileSchema = z
  .instanceof(File)
  .refine(
    (file) => file.size <= 5 * 1024 * 1024,
    "File size should be less than 5MB"
  )
  .refine(
    (file) => ["image/jpeg", "image/jpg", "image/png"].includes(file.type),
    "Only JPG/PNG"
  );

export type ImageFileSchema = z.infer<typeof imageFileSchema>;