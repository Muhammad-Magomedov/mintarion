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
import { Button } from "@/shared/ui/Button/Button";
import styles from "./styles.module.scss";

export const addPaymentMethodFormSchema = z.object({
  cardNumber: z.string().length(16),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  validThru: z.string().length(5),
  cvv: z.string().min(3),
});

export type AddPaymentMethodForm = z.infer<typeof addPaymentMethodFormSchema>;

export interface IAddPaymentMethodFormProps
  extends React.FormHTMLAttributes<HTMLFormElement> {}

export const AddPaymentMethodForm: React.FC<IAddPaymentMethodFormProps> = ({
  className,
  ...props
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddPaymentMethodForm>({
    resolver: zodResolver(addPaymentMethodFormSchema),
  });

  useEffect(() => {
    for (const [key, value] of Object.entries(errors)) {
      if (errors[key as keyof typeof errors]) {
        toast(errors[key as keyof typeof errors]?.message);
      }
    }
  }, [errors]);

  const onSubmit = async (data: AddPaymentMethodForm) => {
    // console.log(data);
  };

  return (
    <form
      className={cn(styles.form, className)}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        className={styles.input}
        classNames={{ wrapper: styles.inputWrapper, content: styles.inputContent }}
        placeholder="Card Number"
        {...register("cardNumber")}
        startContent={<CiCreditCard1 height="1em" />}
      />
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
      <div className={styles.row}>
        <Input
          className={styles.input}
          placeholder="Valid thru"
          {...register("validThru")}
        />
        <Input
          className={styles.input}
          placeholder="CVV"
          {...register("cvv")}
        />
      </div>
      <Button className={styles.btn} type="submit">
        <Plus height="1em" />
        <span>Add Payment Method</span>
      </Button>
    </form>
  );
};
