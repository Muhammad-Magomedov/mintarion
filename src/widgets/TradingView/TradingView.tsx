"use client";

import { useEffect, useRef } from "react";
import cn from "classnames";
import { useThemeStore } from "@/features/toggle-theme";
import styles from "./styles.module.scss";

interface ITradingViewChartProps extends React.HTMLAttributes<HTMLDivElement> {
  settings?: {
    symbol?: string;
    interval?: string;
  }
}

declare global {
  interface Window {
    TradingView: any;
  }
}

export const TradingViewChart: React.FC<ITradingViewChartProps> = ({
  className = "",
  settings = {
    symbol: "BTCUSD",
    interval: "1",
  }
}) => {
  const { symbol, interval } = settings;

  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useThemeStore();

  useEffect(() => {
    if (!containerRef.current) return;

    containerRef.current.innerHTML = "";

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: `BINANCE:${symbol}`,
      interval: interval,
      timezone: "Etc/UTC",
      theme: theme,
      style: "1",
      locale: "en",
      enable_publishing: false,
      allow_symbol_change: true,
      calendar: false,
      studies: [
        // 'RSI@tv-basicstudies',
        // 'MACD@tv-basicstudies',
        // 'MASimple@tv-basicstudies',
        // 'BB@tv-basicstudies'
      ],
      support_host: "https://www.tradingview.com",
    });

    containerRef.current.appendChild(script);

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, [symbol, interval, theme]);

  return (
    <div className={cn(styles.container, className)}>
      <div ref={containerRef} style={{ height: "100%", width: "100%" }} />
      <div className="tradingview-widget-copyright">
        <a
          href={`https://tradingview.com/symbols/${symbol}/?exchange=BINANCE`}
          rel="noopener nofollow"
          target="_blank"
        >
        </a>
      </div>
    </div>
  );
};
