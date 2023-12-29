import axios, { AxiosResponse } from "axios";
import lodashValues from "lodash/values";
import { toast } from "vue3-toastify";
// по приколу лодаш запихнул, я знаю про Object.values)))

export const getCoinList = async (): Promise<string[]> => {
  try {
    const res: AxiosResponse<CoinListResponse> = await axios.get(
      import.meta.env.VITE_COINLIST_API_DOMAIN,
    );

    if (res.data.Response === "Error") {
      toast.error(res.data.Message);

      return [];
    }

    const data: string[] = lodashValues(res.data.Data).map(
      (ticker) => ticker.Symbol,
    );

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.code === "ERR_NETWORK") {
        toast.error(error.message);
      }

      console.log("Axios Error", error);

      return [];
    } else {
      console.log("Error", error);

      return [];
    }
  }
};

interface CoinListResponse {
  Response: string;
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
}
