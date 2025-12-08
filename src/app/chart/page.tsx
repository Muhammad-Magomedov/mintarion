"use client"

import { useEffect, useState } from "react";
import cn from "classnames";
import { TradingViewChart } from "@/widgets/TradingView/TradingView";
import { MarketOverview } from "@/widgets/MarketOverview/MarketOverview";
import styles from "./styles.module.scss";


export default function Chart() {
  const [currentTicker, setCurrentTicker] = useState<string>("BTCUSD")

  return (
    <div className={styles.content}>
      <TradingViewChart className={styles.chart} settings={{ symbol: currentTicker }} />
      <MarketOverview className={styles.marketOverview} setCurrentTicker={setCurrentTicker} />
    </div>
  )
}
