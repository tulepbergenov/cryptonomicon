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

export type GetCoinPriceResponse = {
  [key: string]: number;
};
