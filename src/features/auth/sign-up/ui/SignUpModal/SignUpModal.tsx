"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import cn from "classnames";
import { toast } from "sonner";
import { ArrowRight } from "lucide-react";
import { FiAlertTriangle } from "react-icons/fi";
import { AuthModal, OTPInput, type IAuthModalProps } from "@/features/auth/ui";
import { Input } from "@/shared/ui/Input/Input";
import { Checkbox } from "@/shared/ui/Checkbox/Checkbox";
import { Button } from "@/shared/ui/Button/Button";
import {
  signUpStepFirstSchema,
  signUpStepSecondSchema,
  signUpStepThirdSchema,
  SignUpStepFirstInputs,
  SignUpStepSecondInputs,
  SignUpStepThirdInputs,
  useSignUpStore,
} from "../../model";
import { useSignInStore } from "@/features/auth/sign-in/model";
import styles from "./styles.module.scss";
import type { IModalProps } from "@/shared/ui/Modal/Modal";

const modalDescription: Record<number, string> = {
  1: "Please create an account to continue",
  2: "Please enter the code sent to your email to verify your account",
  3: "Create a password to complete your registration",
};

const formFieldError: Partial<
  Record<keyof SignUpStepThirdInputs, Record<string, string>>
> = {
  confirmationCode: {
    invalidCode: "The entered information is not correct. Please try again.",
  },
};

export const SignUpModal: React.FC<Omit<IModalProps, "children">> = (props) => {
  const { modal: signInModal, updateValue: updateSignInState } =
    useSignInStore();
  const { modal: signUpModal, updateValue: updateSignUpState } =
    useSignUpStore();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [confirmationCodeError, setConfirmationCodeError] = useState<
    string | undefined
  >(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const formStepFirst = useForm<SignUpStepFirstInputs>({
    resolver: zodResolver(signUpStepFirstSchema),
    defaultValues: { email: "", isTermsAgreed: false },
  });

  const formStepSecond = useForm<SignUpStepSecondInputs>({
    mode: "onChange",
    resolver: zodResolver(signUpStepSecondSchema),
    defaultValues: { email: "", isTermsAgreed: false },
  });

  const formStepThird = useForm<SignUpStepThirdInputs>({
    resolver: zodResolver(signUpStepThirdSchema),
    defaultValues: { email: "", isTermsAgreed: false, confirmationCode: "" },
  });

  useEffect(() => {
    if (formStepFirst.formState.errors.isTermsAgreed) {
      toast.error(formStepFirst.formState.errors.isTermsAgreed.message);
    }
  }, [formStepFirst.formState.errors.isTermsAgreed]);

  useEffect(() => {
    setConfirmationCodeError(
      formStepSecond.formState.errors.confirmationCode?.message
    );
  }, [formStepSecond.formState.errors.confirmationCode]);

  // Обработка первого шага - отправка кода на email
  const handleStepFirstSubmit = async (data: SignUpStepFirstInputs) => {
    const { email, isTermsAgreed } = data;
    setIsLoading(true);

    try {
      const res = await axios.post("/api/auth/confirmation-code/request", {
        email
      });

      if ([200, 201].includes(res.status)) {
        formStepSecond.setValue("email", email);
        formStepSecond.setValue("isTermsAgreed", isTermsAgreed);
        setStep(2);
        toast.success("Confirmation code sent to your email");
      }
    } catch (err: any) {
      console.error(err);
      const errorMessage = err.response?.data?.error || "Failed to send confirmation code";
      toast.error(errorMessage);
      
      // Показываем специфичные ошибки
      if (err.response?.status === 409) {
        formStepFirst.setError("email", {
          type: "manual",
          message: "User with this email already exists",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Обработка верификации кода
  const handleSubmitConfirmationCode = () => {
    return formStepSecond.handleSubmit(async (data: SignUpStepSecondInputs) => {
      setIsLoading(true);
      
      try {
        const res = await axios.post("/api/auth/confirmation-code/verify", {
          email: data.email,
          code: data.confirmationCode,
        });

        if (res.status === 200) {
          formStepThird.setValue("email", data.email);
          formStepThird.setValue("isTermsAgreed", data.isTermsAgreed);
          formStepThird.setValue("confirmationCode", data.confirmationCode);
          setStep(3);
          toast.success("Email verified successfully");
          setConfirmationCodeError(undefined);
        }
      } catch (e: any) {
        console.error(e);
        const errorMessage = e.response?.data?.error || "Invalid confirmation code";
        formStepSecond.setError("confirmationCode", {
          type: "manual",
          message: errorMessage,
        });
      } finally {
        setIsLoading(false);
      }
    })();
  };

  // Обработка финального шага - создание аккаунта
  const handleStepThirdSubmit = async (data: SignUpStepThirdInputs) => {
    setIsLoading(true);

    try {
      const res = await axios.post("/api/auth/sign-up", {
        email: data.email,
        password: data.password,
        confirmationCode: data.confirmationCode,
      });

      if ([200, 201].includes(res.status)) {
        toast.success("Account created successfully!");
        // Закрываем модал регистрации
        updateSignUpState("modal", { ...signUpModal, isOpen: false });
        
        // Сбрасываем все формы
        formStepFirst.reset();
        formStepSecond.reset();
        formStepThird.reset();
        setStep(1);
        
        // Можно автоматически открыть модал входа или перенаправить
        // updateSignInState("modal", { ...signInModal, isOpen: true });
      }
    } catch (err: any) {
      console.error(err);
      const errorMessage = err.response?.data?.error || "Failed to create account";
      toast.error(errorMessage);

      // Если код истек или недействителен, возвращаем на второй шаг
      if (err.response?.status === 400 && 
          err.response?.data?.error?.includes("confirmation code")) {
        setStep(2);
        toast.error("Please verify your email again");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Повторная отправка кода
  const handleResendCode = async () => {
    const email = formStepSecond.getValues("email");
    setIsLoading(true);
    
    try {
      const res = await axios.post("/api/auth/confirmation-code/request", { email });
      
      if ([200, 201].includes(res.status)) {
        toast.success("New confirmation code sent to your email");
        // Сбрасываем ошибки и значение поля
        formStepSecond.clearErrors("confirmationCode");
        formStepSecond.setValue("confirmationCode", "");
        setConfirmationCodeError(undefined);
      }
    } catch (err: any) {
      console.error(err);
      const errorMessage = err.response?.data?.error || "Failed to resend code";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    switch (step) {
      case 1:
        return formStepFirst.handleSubmit(handleStepFirstSubmit)();
      case 3:
        return formStepThird.handleSubmit(handleStepThirdSubmit)();
    }
  };

  // Сброс состояния при закрытии модала
  const handleModalClose = (isOpen: boolean) => {
    updateSignUpState("modal", { ...signUpModal, isOpen });
    
    if (!isOpen) {
      // Сбрасываем формы и состояние при закрытии
      formStepFirst.reset();
      formStepSecond.reset();
      formStepThird.reset();
      setStep(1);
      setConfirmationCodeError(undefined);
      setIsLoading(false);
    }
  };

  return (
    <AuthModal
      showLayout={![2].includes(step)}
      contentClassName="h-[90vh]"
      bodyClassName="h-[100%] justify-between"
      open={signUpModal.isOpen}
      onOpenChange={handleModalClose}
      bodyContent={{
        top: {
          title: "Sign Up",
          description: modalDescription[step],
        },
        bottom: (
          <div className={cn(styles.bodyContentBottom, "text-[#999595] dark:text-gray-400")}>
            <div>
              {[1, 3].includes(step) && (
                <>
                  <span>Already have an account?</span>&nbsp;
                  <button
                    onClick={() => {
                      updateSignUpState("modal", {
                        ...signUpModal,
                        isOpen: false,
                      });
                      updateSignInState("modal", {
                        ...signInModal,
                        isOpen: true,
                      });
                    }}
                    className="underline"
                    type="button"
                    disabled={isLoading}
                  >
                    Sign in
                  </button>
                </>
              )}
              {step === 2 && (
                <>
                  <span>Don't get anything?</span>&nbsp;
                  <button 
                    className="underline" 
                    type="button"
                    onClick={handleResendCode}
                    disabled={isLoading}
                  >
                    {isLoading ? "Sending..." : "Click here to resend"}
                  </button>
                </>
              )}
            </div>
            <Link href="/support">Support</Link>
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
                    id="termsAgreement"
                    variant="darkGreen"
                    checked={field.value}
                    onValueChange={field.onChange}
                    disabled={isLoading}
                  />
                )}
              />
              <label
                className={cn(styles.formCheckboxLabel, "text-[#5B5B5B] dark:text-gray-400")}
                htmlFor="termsAgreement"
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
              {isLoading ? "Sending..." : "Continue"}
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className={cn(styles.formContent, styles.formOTPContent)}>
            <Controller
              name="confirmationCode"
              control={formStepSecond.control}
              render={({ field }) => (
                <OTPInput
                  onlyDigit
                  value={field.value}
                  onChange={field.onChange}
                  onComplete={(code) => {
                    if (!isLoading && code.length === 6) {
                      field.onChange(code);
                      handleSubmitConfirmationCode();
                    }
                  }}
                  disabled={isLoading}
                />
              )}
            />
            {confirmationCodeError && (
              <div className={styles.formInputError}>
                <FiAlertTriangle height="1em" />
                <span>{confirmationCodeError}</span>
              </div>
            )}
            {isLoading && (
              <div className="text-center text-sm text-gray-500 mt-4">
                Verifying code...
              </div>
            )}
          </div>
        )}

        {step === 3 && (
          <div className={styles.formContent}>
            <Input
              className={styles.formInput}
              classNames={{
                wrapper: styles.formInputWrapper,
                content: styles.formInputContent,
              }}
              placeholder={
                !formStepThird.formState.errors.password
                  ? "Enter your password"
                  : ""
              }
              type="password"
              disabled={isLoading}
              endContent={
                formStepThird.formState.errors.password ? (
                  <div className={styles.formInputError}>
                    <FiAlertTriangle height="1em" />
                    <span>
                      {formStepThird.formState.errors.password?.message}
                    </span>
                  </div>
                ) : (
                  <span></span>
                )
              }
              {...formStepThird.register("password")}
            />
            <Button
              className={styles.formBtn}
              type="submit"
              variant="lightGreen"
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Confirm"}
            </Button>
          </div>
        )}
      </form>
    </AuthModal>
  );
};