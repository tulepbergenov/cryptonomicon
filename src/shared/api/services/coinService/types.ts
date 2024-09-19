export type GetCoinListResponse = ApiResponse<{
  [key: string]: GetCoinListItemResponse;
}>;

export type ApiResponse<T> = {
  Response: "Success" | "Error";
  Message: string;
  Data: T;
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
