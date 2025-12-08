"use client";

import cn from "classnames";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RiTelegram2Fill } from "react-icons/ri";
import { FaXTwitter } from "react-icons/fa6";
import { BsFacebook } from "react-icons/bs";
import { Modal, type IModalProps } from "@/shared/ui/Modal/Modal";
import { Input } from "@/shared/ui/Input/Input";
import { Textarea } from "@/shared/ui/Textarea/Textarea";
import { Button } from "@/shared/ui/Button/Button";
import { editProfileSchema, useEditProfileStore } from "../../model";
import styles from "./styles.module.scss";
import type { EditProfileForm } from "../../model";
import { useEffect } from "react";

export const EditProfileModal: React.FC<
  Omit<IModalProps, "children">
> = (props) => {
  const { modal, updateValue } = useEditProfileStore();

  useEffect(() => console.log("edit profile modal is open", modal.isOpen))

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditProfileForm>({
    resolver: zodResolver(editProfileSchema),
  });

  const onSubmit = () => {
    
  }

  return (
    <Modal
      bodyClassName={styles.body}
      contentVariant="primary"
      showCloseButton
      open={modal.isOpen}
      onOpenChange={(isOpen) => updateValue("modal", { ...modal, isOpen })}
      {...props}
    >
      <h3 className={cn(styles.title, "title--3xl", "dark:text-white")}>
        Edit Profile
      </h3>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.fieldList}>
          <div className={styles.fieldContainer}>
            <Input
              className={styles.field}
              placeholder="Your Name"
              {...register("fullName")}
            />
            {errors.fullName && (
              <p className={cn(styles.errorText, "text-red-500")}>
                {errors.fullName.message}
              </p>
            )}
          </div>
          <div className={styles.fieldContainer}>
            <Textarea
              className={cn(styles.field, styles.textarea)}
              placeholder="Bio"
              {...register("bio")}
            />
            {errors.bio && (
              <p className={cn(styles.errorText, "text-red-500")}>
                {errors.bio.message}
              </p>
            )}
            <div className={cn(styles.fieldDesc, "dark:text-[rgb(91,91,91)]")}>
              Tell readers a bit about yourself — it helps attract more followers
            </div>
          </div>
        </div>
        <div className={styles.fieldListContainer}>
          <h4 className={cn(styles.fieldListContainerTitle, "title--lg", "dark:text-white")}>
            Add your social media
          </h4>
          <div className={styles.fieldList}>
            <div className={styles.fieldContainer}>
              <Input
                className={styles.field}
                classNames={{ content: styles.inputContent }}
                placeholder="https://t.me/"
                startContent={
                  <Button variant="darkGreen" shape="square" disabled>
                    <RiTelegram2Fill height="1em" />
                  </Button>
                }
                {...register("telegramUrl")}
              />
              {errors.telegramUrl && (
                <p className={cn(styles.errorText, "text-red-500")}>
                  {errors.telegramUrl.message}
                </p>
              )}
            </div>
            <div className={styles.fieldContainer}>
              <Input
                className={styles.field}
                classNames={{ content: styles.inputContent }}
                placeholder="https://x.com/"
                startContent={
                  <Button variant="darkGreen" shape="square" disabled>
                    <FaXTwitter height="1em" />
                  </Button>
                }
                {...register("twitterUrl")}
              />
              {errors.twitterUrl && (
                <p className={cn(styles.errorText, "text-red-500")}>
                  {errors.twitterUrl.message}
                </p>
              )}
            </div>
            <div className={styles.fieldContainer}>
              <Input
                className={styles.field}
                classNames={{ content: styles.inputContent }}
                placeholder="https://www.facebook.com/"
                startContent={
                  <Button variant="darkGreen" shape="square" disabled>
                    <BsFacebook height="1em" />
                  </Button>
                }
                {...register("telegramUrl")}
              />
              {errors.facebookUrl && (
                <p className={cn(styles.errorText, "text-red-500")}>
                  {errors.facebookUrl.message}
                </p>
              )}
            </div>
          </div>
        </div>
        <Button className={styles.btn} type="submit" variant="lightGreen">
          Save
        </Button>
      </form>
    </Modal>
  );
};
