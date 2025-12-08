"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import cn from "classnames";
import { toast } from "sonner";
import { Camera } from "lucide-react";
import { Input } from "@/shared/ui/Input/Input";
import { Button } from "@/shared/ui/Button/Button";
import { useAuth } from "@/shared/hooks/auth";
import { useUpdateUserOptimistic } from "@/entities/user/model/hooks";
import styles from "./styles.module.scss";

export interface IChangeAccountDetailsFormProps
  extends React.FormHTMLAttributes<HTMLFormElement> {}

export const changeAccountDetailsFormSchema = z.object({
  firstname: z.string().min(1, "First name is required"),
  lastname: z.string().min(1, "Last name is required"),
  email: z.email("Invalid email address"),
  avatar: z.any(),
});

export type IChangeAccountDetailsForm = {
  firstname: string;
  lastname: string;
  email: string;
  avatar: FileList;
};

export const ChangeAccountDetailsForm: React.FC<
  IChangeAccountDetailsFormProps
> = ({ className, ...props }) => {
  const { user, userProfile } = useAuth();
  const { mutate: updateUser, isPending } = useUpdateUserOptimistic();

  const [preview, setPreview] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm<IChangeAccountDetailsForm>({
    resolver: zodResolver(changeAccountDetailsFormSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
    },
  });

  useEffect(() => {
    if (userProfile) {
      reset({
        firstname: userProfile.firstName || "",
        lastname: userProfile.lastName || "",
        email: userProfile.email || "",
        avatar: undefined as any,
      });

      if (userProfile.avatarUrl) {
        setPreview(userProfile.avatarUrl);
      }
    }
  }, [userProfile, reset]);

  const avatar = watch("avatar");

  const handleFileChange = (files: FileList | null) => {
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const onSubmit = (data: IChangeAccountDetailsForm) => {
    const formData = new FormData();
    formData.append("firstname", data.firstname || "");
    formData.append("lastname", data.lastname || "");
    formData.append("email", data.email || "");

    if (data.avatar && data.avatar.length > 0) {
      formData.append("avatar", data.avatar[0]);
    }

    if (user?.id) {
      updateUser(
        { userId: user.id, data: formData },
        {
          onSuccess(response) {
            if (response.success) {
              toast.success("Account details updated!");
            } else {
              toast.error(response.error || "Error during update");
            }
          },
          onError(error) {
            toast.error("Error during change account details");
            console.error("Change account details error:", error);
          },
        }
      );
    }
  };

  return (
    <form
      className={cn(styles.form, className)}
      // @ts-ignore
      onSubmit={handleSubmit(onSubmit)}
      {...props}
    >
      <div className={styles.column}>
        <div className={styles.textInputList}>
          <div className={styles.inputWrapper}>
            <Input
              placeholder="First name"
              {...register("firstname")}
              className={styles.input}
              disabled={isPending}
            />
            {errors.firstname && (
              <span className={styles.errorText}>
                {errors.firstname.message}
              </span>
            )}
          </div>

          <div className={styles.inputWrapper}>
            <Input
              placeholder="Last name"
              {...register("lastname")}
              className={styles.input}
              disabled={isPending}
            />
            {errors.lastname && (
              <span className={styles.errorText}>
                {errors.lastname.message}
              </span>
            )}
          </div>

          <div className={styles.inputWrapper}>
            <Input
              type="email"
              placeholder="Email"
              {...register("email")}
              className={styles.input}
              disabled={isPending}
            />
            {errors.email && (
              <span className={styles.errorText}>{errors.email.message}</span>
            )}
          </div>
        </div>

        <div className={styles.btnList}>
          <Button className={styles.btn} type="submit" disabled={isPending}>
            {isPending ? "Saving..." : "Save All Changes"}
          </Button>
          <Button
            className={styles.btn}
            variant="red"
            onClick={() => reset()}
            disabled={isPending}
          >
            Delete My Data
          </Button>
        </div>
      </div>

      <div className={cn(styles.inputWrapper, styles.avatarInputWrapper)}>
        <label className={styles.avatarLabel}>
          <input
            type="file"
            accept="image/jpeg,image/jpg,image/png"
            {...register("avatar", {
              onChange: (e) => handleFileChange(e.target.files),
            })}
            style={{ display: "none" }}
            disabled={isPending}
          />
          <div className={styles.avatarPreview}>
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className={styles.previewImage}
              />
            ) : (
              <div className={styles.avatarPreviewCircle}>
                <Camera size={24} />
                <span className={cn(styles.username, "text-white")}>
                  {userProfile?.firstName?.slice(0, 1)?.toUpperCase() ?? "U"}
                </span>
              </div>
            )}
          </div>
        </label>
        {errors.avatar && (
          <span className={styles.errorText}>{errors.avatar.message}</span>
        )}
      </div>
    </form>
  );
};
