import cn from "classnames";
import { useSignInStore } from "../../model";
import styles from "./styles.module.scss";

export const SignInButton = () => {
  const { modal, updateValue } = useSignInStore();

  return (
    <button
      onClick={() => updateValue("modal", { ...modal, isOpen: true })}
      className={cn(styles.button, "light:text-neutral-950", "dark:text-white")}
      type="button"
    >
      Sign in
    </button>
  );
};
