import Link from "next/link";
import cn from "classnames";
import { AiOutlineUser } from "react-icons/ai";
import { Button, type IButtonProps } from "@/shared/ui/Button/Button";
import styles from "./styles.module.scss";

export interface IViewProfileButtonProps extends IButtonProps {
  userId: string;
}

export const ViewProfileButton: React.FC<IViewProfileButtonProps> = ({
  className = "",
  children = "View Profile",
  userId = "",
  ...props
}) => {
  return (
    <Link
      className={cn(
        styles.button,
        "bg-linear-to-b from-green-20 to-green-40 text-green-750 border-green-800",
        "dark:bg-linear-to-tr dark:from-[rgba(27,35,29,0.1)] dark:to-[rgba(149,251,149,0.1)] dark:text-white",
        className
      )}
      href={`/articles/profile/${userId}`}
      {...props}
    >
      <AiOutlineUser height="1em" />
      <span className={styles.text}>{children}</span>
    </Link>
  );
};
