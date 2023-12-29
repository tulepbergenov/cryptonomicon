import axios from "axios";
import lodashValues from "lodash/values";
// по приколу лодаш запихнул, я знаю про Object.values)))

export const getCoinList = async (): Promise<string[]> => {
  const res = await axios.get(
    "https://min-api.cryptocompare.com/data/all/coinlist?summary=true",
  );

  const data: string[] = lodashValues(res.data.Data).map(
    (ticker) => ticker.Symbol,
  );

  return data;
};
