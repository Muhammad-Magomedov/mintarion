import cn from "classnames";
import styles from "./styles.module.scss";

export interface IProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "primary";
  value: number;
}

const themeCn = {
  progress: cn("[&.primary]:dark:bg-gray-400"),
  progressValue: cn(
    "[&.primary]:dark:from-green-800 [&.primary]:dark:to-green-300"
  ),
};

export const Progress: React.FC<IProgressProps> = ({
  className,
  value,
  variant = "primary",
  ...props
}) => {
  return (
    <div
      className={cn(styles.progress, variant, themeCn.progress, className)}
      {...props}
    >
      <div
        className={cn(
          styles.progressValue,
          variant,
          "bg-linear-to-r",
          themeCn.progressValue
        )}
        style={{
          width: Math.abs(value) > 100 ? "100%" : `${Math.abs(value)}%`,
        }}
      ></div>
    </div>
  );
};
