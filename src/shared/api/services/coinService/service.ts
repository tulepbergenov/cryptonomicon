import { AxiosResponse } from "axios";
import { api } from "../../axios";
import {
  ApiResponse,
  GetCoinListResponse,
  GetCoinPriceResponse,
} from "./types";

const getCoinList = (): Promise<AxiosResponse<GetCoinListResponse>> =>
  api.get("data/all/coinlist", {
    params: {
      summary: true,
    },
  });

const getCoinPrice = (
  coin: string
): Promise<AxiosResponse<GetCoinPriceResponse | ApiResponse<unknown>>> =>
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
