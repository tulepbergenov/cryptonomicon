import { AxiosResponse } from "axios";
import { api } from "../../axios";
import { GetCoinListResponse, GetCoinPriceResponse } from "./types";

const getCoinList = (): Promise<AxiosResponse<GetCoinListResponse>> =>
  api.get("data/all/coinlist", {
    params: {
      summary: true,
    },
  });

const getCoinPrice = (
  coin: string
): Promise<AxiosResponse<GetCoinPriceResponse>> =>
  api.get("data/price", {
    params: {
      fsym: coin,
      tsyms: "USD",
      api_key: import.meta.env.VITE_CRYPTOCOMPARE_API_KEY,
    },
  });

export const coinService = {
  getCoinList,
  getCoinPrice,
};
