export const findTicker = (name: string, tickers: string[]): boolean => {
  const tickerExists = tickers.some(
    (ticker) => ticker.toLowerCase() === name.toLowerCase(),
  );

  return tickerExists;
};
