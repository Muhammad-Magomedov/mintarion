import { useRef, useState } from "react";
import cn from "classnames";
import { Input, type IInputProps } from "@/shared/ui/Input/Input";
import styles from "./styles.module.scss";

export interface OTPInputProps extends Omit<IInputProps, "onChange"> {
  value?: string;
  onChange?: (value: string) => void;
  onlyDigit?: boolean;
  length?: number;
  className?: string;
  wrapperClassname?: string;
  onComplete?: (code: string) => void;
}

export const OTPInput: React.FC<OTPInputProps> = ({
  value = "",
  onChange,
  onlyDigit = false,
  length = 6,
  className = "",
  wrapperClassname = "",
  onComplete,
  ...props
}) => {
  const values = value.split("").concat(Array(length).fill("")).slice(0, length);
  const inputsRef = useRef<Array<HTMLInputElement | null>>(Array(length).fill(null));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    if (onlyDigit && /\D/.test(e.target.value)) {
      return;
    }

    const val = e.target.value.slice(-1);
    const newValues = [...values];
    newValues[idx] = val;
    const newValue = newValues.join("");
    onChange?.(newValue);

    if (val && idx < length - 1) {
      inputsRef.current[idx + 1]?.focus();
    }

    if (newValues.every((v) => v !== "")) {
      onComplete?.(newValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
    if (e.key === "Backspace" && values[idx] === "" && idx > 0) {
      inputsRef.current[idx - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const paste = e.clipboardData.getData("text").slice(0, length).split("");
    const newValue = paste.join("");
    onChange?.(newValue);
    if (paste.length === length) {
      onComplete?.(newValue);
    }
    e.preventDefault();
  };

  return (
    <div className={cn(styles.wrapper, wrapperClassname)}>
      {Array.from({ length }).map((_, idx) => (
        <Input
          key={idx}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={values[idx] || ""}
          onChange={(e) => handleChange(e, idx)}
          onKeyDown={(e) => handleKeyDown(e, idx)}
          onPaste={handlePaste}
          ref={(el) => {
            inputsRef.current[idx] = el;
          }}
          className={cn(styles.input, className)}
          {...props}
        />
      ))}
    </div>
  );
};
