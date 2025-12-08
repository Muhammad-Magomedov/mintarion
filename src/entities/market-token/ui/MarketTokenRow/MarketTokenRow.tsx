import cn from "classnames";
import { Star } from "lucide-react";
import { useThemeStore } from "@/features/toggle-theme";
import { formatNumber } from "@/shared/utils";
import styles from "./styles.module.scss";
import type { IMarketToken } from "../../model";

export interface IMarketTokenRowProps
  extends React.HTMLAttributes<HTMLTableRowElement> {
  classNames?: {
    td?: string;
  };
  variant?: "lightGreen" | "darkGreen" | "white" | "black";
  ticker: string;
  data: IMarketToken;
  onLike?: (ticker: string) => void;
  onTickerClick?: () => void;
}

export const MarketTokenRow: React.FC<IMarketTokenRowProps> = ({
  className = "",
  classNames = {
    td: "",
  },
  variant = "darkGreen",
  ticker,
  data = {
    isLiked: false,
    symbol: "",
    price: 0,
    change24h: 0,
    volume24h: 0,
  },
  onLike,
  onTickerClick,
  ...props
}) => {
  const { isLiked, symbol, price, change24h, volume24h } = data;
  const { theme } = useThemeStore();

  return (
    <tr className={cn(styles.row, className)} {...props}>
      <td onClick={() => onLike && onLike(ticker)}>
        {theme === "dark" ? (
          <Star
            className={styles.star}
            color={isLiked ? "rgb(48, 83, 47)" : "#fff"}
            fill={isLiked ? "rgba(80, 124, 79, 0.4)" : ""}
          />
        ) : (
          <Star
            className={styles.star}
            color={isLiked ? "" : "#8F8E8F"}
            fill={isLiked ? "rgb(61, 105, 60)" : "transparent"}
          />
        )}
      </td>
      <td
        className="border-r-[1px] border-solid border-r-[#F3F3F3] text-neutral-950 font-semibold underline dark:border-r-[#202020] dark:text-white"
        onClick={() => onTickerClick && onTickerClick()}
      >
        {symbol}
      </td>
      <td className="border-r-[1px] border-solid border-r-[#F3F3F3] text-neutral-950 dark:border-r-[#202020] dark:text-white">
        ${formatNumber(price)}
      </td>
      <td className="border-r-[1px] border-solid border-r-[#F3F3F3] text-neutral-950 dark:border-r-[#202020] dark:text-white">
        {change24h.toLocaleString("en", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
        %
      </td>
      <td className="border-r-[1px] border-solid border-r-[#F3F3F3] text-neutral-950 dark:border-r-[#202020] dark:text-white">
        ${formatNumber(volume24h)}
      </td>
    </tr>
  );
};
