export type TickerType = {
  id: string;
  name: string;
  price: number | "-";
  intervalId: ReturnType<typeof setInterval>;
};
