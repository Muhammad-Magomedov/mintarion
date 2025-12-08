"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import cn from "classnames";
import { toast } from "sonner";
import { FiAlertTriangle } from "react-icons/fi";
import { AuthModal, type IAuthModalProps } from "@/features/auth/ui";
import { Input } from "@/shared/ui/Input/Input";
import { Checkbox } from "@/shared/ui/Checkbox/Checkbox";
import { Button } from "@/shared/ui/Button/Button";
import { supabase } from "@/shared/lib/supabase/client";
import {
  signInStepFirstSchema,
  signInStepSecondSchema,
  SignInStepFirstInputs,
  SignInStepSecondInputs,
  useSignInStore,
} from "../../model";
import { useSignUpStore } from "@/features/auth/sign-up/model";
import styles from "./styles.module.scss";
import type { IModalProps } from "@/shared/ui/Modal/Modal";

const modalDescription: Record<number, string> = {
  1: "Please enter your email to sign in",
  2: "Please enter your password to complete sign in"
};

export const SignInModal: React.FC<Omit<IModalProps, "children">> = (props) => {
  const { modal: signInModal, updateValue: updateSignInState } =
    useSignInStore();
  const { modal: signUpModal, updateValue: updateSignUpState } =
    useSignUpStore();

  const [step, setStep] = useState<1 | 2>(1);
  const [isLoading, setIsLoading] = useState(false);

  const formStepFirst = useForm<SignInStepFirstInputs>({
    resolver: zodResolver(signInStepFirstSchema),
    defaultValues: { email: "", isTermsAgreed: false },
  });

  const formStepSecond = useForm<SignInStepSecondInputs>({
    resolver: zodResolver(signInStepSecondSchema),
    defaultValues: { email: "", isTermsAgreed: false },
  });

  useEffect(() => {
    if (formStepFirst.formState.errors.isTermsAgreed) {
      toast.error(formStepFirst.formState.errors.isTermsAgreed.message);
    }
  }, [formStepFirst.formState.errors.isTermsAgreed]);

  const handleStepFirstSubmit = async (data: SignInStepFirstInputs) => {
    const { email, isTermsAgreed } = data;
    setIsLoading(true);

    try {
      formStepSecond.setValue("email", email);
      formStepSecond.setValue("isTermsAgreed", isTermsAgreed);
      setStep(2);
    } catch (err: any) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleStepSecondSubmit = async (data: SignInStepSecondInputs) => {
    setIsLoading(true);

    try {
      const res = await axios.post("/api/auth/sign-in", {
        email: data.email,
        password: data.password,
      });

      if ([200, 201].includes(res.status)) {
        toast.success("Successfully signed in!");

        // console.log(res.data);

        updateSignInState("modal", { ...signInModal, isOpen: false });
        formStepFirst.reset();
        formStepSecond.reset();
        setStep(1);
      }
    } catch (err: any) {
      console.error(err);
      
      const errorMessage = err.response?.data?.error || "Failed to sign in";
      toast.error(errorMessage);

      if (err.response?.status === 401) {
        const error = err.response.data.error;
        
        if (error === "Invalid email or password") {
          formStepSecond.setError("password", {
            type: "manual",
            message: "Invalid email or password",
          });
        } else if (error === "Please verify your email address") {
          toast.error("Please verify your email address before signing in");
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    switch (step) {
      case 1:
        return formStepFirst.handleSubmit(handleStepFirstSubmit)();
      case 2:
        return formStepSecond.handleSubmit(handleStepSecondSubmit)();
    }
  };

  const handleModalClose = (isOpen: boolean) => {
    updateSignInState("modal", { ...signInModal, isOpen });
    
    if (!isOpen) {
      formStepFirst.reset();
      formStepSecond.reset();
      setStep(1);
      setIsLoading(false);
    }
  };

  const handleBackToFirstStep = () => {
    setStep(1);
    formStepSecond.clearErrors();
  };

  return (
    <AuthModal
      showLayout
      open={signInModal.isOpen}
      onOpenChange={handleModalClose}
      bodyContent={{
        top: {
          title: "Sign In",
          description: modalDescription[step],
        },
        bottom: (
          <div className={cn(styles.bodyContentBottom, "text-[#999595] dark:text-gray-400")}>
            <div>
              <span>Don't have an account?</span>&nbsp;
              <button
                onClick={() => {
                  updateSignInState("modal", { ...signInModal, isOpen: false });
                  updateSignUpState("modal", { ...signUpModal, isOpen: true });
                }}
                className="underline"
                type="button"
                disabled={isLoading}
              >
                Sign up
              </button>
            </div>
            <div className="flex gap-4">
              {step === 2 && (
                <button
                  onClick={handleBackToFirstStep}
                  className="underline"
                  type="button"
                  disabled={isLoading}
                >
                  Back
                </button>
              )}
              <Link href="/support">Support</Link>
            </div>
          </div>
        ),
      }}
      {...props}
    >
      <form className={styles.form} onSubmit={handleSubmit}>
        {step === 1 && (
          <div className={styles.formContent}>
            <Input
              className={styles.formInput}
              classNames={{
                wrapper: styles.formInputWrapper,
                content: styles.formInputContent,
              }}
              placeholder={
                !formStepFirst.formState.errors.email ? "Enter your email" : ""
              }
              type="email"
              disabled={isLoading}
              endContent={
                formStepFirst.formState.errors.email ? (
                  <div className={styles.formInputError}>
                    <FiAlertTriangle height="1em" />
                    <span>{formStepFirst.formState.errors.email?.message}</span>
                  </div>
                ) : (
                  <span></span>
                )
              }
              {...formStepFirst.register("email")}
            />
            <div className={styles.formCheckboxWrapper}>
              <Controller
                control={formStepFirst.control}
                name="isTermsAgreed"
                render={({ field }) => (
                  <Checkbox
                    id="signInTermsAgreement"
                    variant="darkGreen"
                    checked={field.value}
                    onValueChange={field.onChange}
                    disabled={isLoading}
                  />
                )}
              />
              <label
                className={cn(styles.formCheckboxLabel, "text-[#999595] dark:text-gray-400")}
                htmlFor="signInTermsAgreement"
              >
                I agree to{" "}
                <span className="underline cursor-pointer">Privacy Policy</span>{" "}
                and{" "}
                <span className="underline cursor-pointer">
                  Terms of Service
                </span>
              </label>
            </div>
            <Button
              className={styles.formBtn}
              type="submit"
              variant="lightGreen"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Continue"}
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className={styles.formContent}>
            <Input
              className={styles.formInput}
              classNames={{
                wrapper: styles.formInputWrapper,
                content: styles.formInputContent,
              }}
              placeholder={
                !formStepSecond.formState.errors.password
                  ? "Enter your password"
                  : ""
              }
              type="password"
              disabled={isLoading}
              autoFocus
              endContent={
                formStepSecond.formState.errors.password ? (
                  <div className={styles.formInputError}>
                    <FiAlertTriangle height="1em" />
                    <span>
                      {formStepSecond.formState.errors.password?.message}
                    </span>
                  </div>
                ) : (
                  <span></span>
                )
              }
              {...formStepSecond.register("password")}
            />

            {/* <div className="text-right mb-4">
              <Link 
                href="/forgot-password" 
                className="text-sm underline text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              >
                Forgot password?
              </Link>
            </div> */}

            <Button
              className={styles.formBtn}
              type="submit"
              variant="lightGreen"
              disabled={isLoading}
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>
          </div>
        )}
      </form>
    </AuthModal>
  );
};