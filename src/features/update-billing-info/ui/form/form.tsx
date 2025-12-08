"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import cn from "classnames";
import { toast } from "sonner";
import { CiCreditCard1 } from "react-icons/ci";
import { Plus } from "lucide-react";
import { Input } from "@/shared/ui/Input/Input";
import { Select } from "@/shared/ui/Select/Select";
import { Button } from "@/shared/ui/Button/Button";
import styles from "./styles.module.scss";

export const updateBillingInfoFormSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  country: z.string().min(1),
  addressFirst: z.string().min(1),
  addressSecond: z.string().min(1).optional(),
  city: z.string().min(1),
  state: z.string().min(1),
  postalCode: z.string().min(1),
});

export type UpdateBillingInfoForm = z.infer<typeof updateBillingInfoFormSchema>;

export interface IUpdateBillingInfoFormProps
  extends React.FormHTMLAttributes<HTMLFormElement> {}

export const UpdateBillingInfoForm: React.FC<IUpdateBillingInfoFormProps> = ({
  className,
  ...props
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateBillingInfoForm>({
    resolver: zodResolver(updateBillingInfoFormSchema),
  });

  useEffect(() => {
    for (const [key, value] of Object.entries(errors)) {
      if (errors[key as keyof typeof errors]) {
        toast(errors[key as keyof typeof errors]?.message);
      }
    }
  }, [errors]);

  const onSubmit = async (data: UpdateBillingInfoForm) => {
    // console.log(data);
  };

  return (
    <form
      className={cn(styles.form, className)}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        className={styles.input}
        placeholder="First Name"
        {...register("firstName")}
      />
      <Input
        className={styles.input}
        placeholder="Last Name"
        {...register("lastName")}
      />
      <Input
        className={styles.input}
        placeholder="Country"
        {...register("country")}
      />
      <Input
        className={styles.input}
        placeholder="Address line 1"
        {...register("addressFirst")}
      />
      <Input
        className={styles.input}
        placeholder="Address line 2"
        {...register("addressSecond")}
      />
      <Input
        className={styles.input}
        placeholder="City"
        {...register("city")}
      />
      <Input
        className={styles.input}
        placeholder="State"
        {...register("state")}
      />
      <Input
        className={styles.input}
        placeholder="Postal code"
        {...register("postalCode")}
      />
      <Button className={styles.btn} type="submit">
        Update Information
      </Button>
    </form>
  );
};
