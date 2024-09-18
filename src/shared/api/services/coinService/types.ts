export type GetCoinListResponse = {
  Response: "Success" | "Error";
  Message: string;
  Data: {
    [key: string]: GetCoinListItemResponse;
  };
  RateLimit: Record<string, unknown>;
  HasWarning: boolean;
  Type: number;
};

export type GetCoinListItemResponse = {
  Id: string;
  ImageUrl: string;
  Symbol: string;
  FullName: string;
};

export type GetCoinPriceResponse = {
  [key: string]: number;
};
