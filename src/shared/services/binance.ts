import axios from "axios";
import type { IBinanceTickerData, IGetTopUSDTokensResponse } from "../types/services/binance";
import type { ITokenTickerBaseData } from "../types/web3";


export class BinanceAPI {
  async getTopTokens(
    pair: string = "USDT",
    limit: number = 10,
    as: "object" | "array" = "object"
  ): Promise<IGetTopUSDTokensResponse> {
    const url = "https://api.binance.com/api/v3/ticker/24hr";
    const response = await axios.get(url);
    if (![200, 201].includes(response.status)) {
      throw new Error("Failed to fetch Binance data");
    }

    const list: ITokenTickerBaseData[] = response.data
        .filter((item: IBinanceTickerData) => item.symbol.endsWith(pair))
        .map((item: IBinanceTickerData) => ({
          symbol: item.symbol,
          price: parseFloat(item.lastPrice),
          change24h: parseFloat(item.priceChangePercent),
          volume24h: parseFloat(item.quoteVolume),
        }))
        .sort((a: ITokenTickerBaseData, b: ITokenTickerBaseData) => b.volume24h - a.volume24h)
        .slice(0, limit)

    return {
      data: as === "object" ? Object.fromEntries(list.map((item) => [item.symbol, item])) : list
    }
  }
}

export const binanceApi = new BinanceAPI();