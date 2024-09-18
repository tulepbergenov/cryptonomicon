import { AxiosError, AxiosResponse } from "axios";
import { api } from "../axios";

export const getCoinList = (): Promise<
  AxiosResponse<GetCoinListResponse, AxiosError>
> =>
  api.get("data/all/coinlist", {
    params: {
      summary: true,
    },
  });

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
