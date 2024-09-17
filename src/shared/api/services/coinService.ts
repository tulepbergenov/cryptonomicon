import axios, { AxiosError, AxiosResponse } from "axios";

export const getCoinList = (): Promise<
  AxiosResponse<GetCoinListResponse, AxiosError>
> => axios.get(import.meta.env.VITE_COINLIST_API_DOMAIN);

export type GetCoinListResponse = {
  Response: "Success" | "Error";
  Message: string;
  Data: {
    [key: string]: {
      Id: string;
      ImageUrl: string;
      Symbol: string;
      FullName: string;
    };
  };
  RateLimit: Record<string, unknown>;
  HasWarning: boolean;
  Type: number;
};
