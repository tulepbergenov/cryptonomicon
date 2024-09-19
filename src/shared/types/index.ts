import { GetCoinListItemResponse } from "../api";

export type TickerType = {
  id: string;
  name: string;
  price: number | "-";
  intervalId: ReturnType<typeof setInterval>;
};

export type CoinType = GetCoinListItemResponse & {
  keyName: string;
};
