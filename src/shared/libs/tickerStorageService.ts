import { z } from "zod";

const TickerSchema = z.object({
  id: z.string(),
});

const TickersArraySchema = z.array(TickerSchema);

const STORAGE_KEY = "TICKERS";

export const tickerStorageService = {
  isLocalStorageAvailable(): boolean {
    try {
      const testKey = "__localStorageTest__";
      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      console.error("LocalStorage is not available", e);
      return false;
    }
  },

  getTickers(): string[] {
    if (!this.isLocalStorageAvailable()) return [];

    const storedTickers = localStorage.getItem(STORAGE_KEY);

    if (!storedTickers) return [];

    try {
      const parsedTickers = JSON.parse(storedTickers);
      const validatedTickers = TickersArraySchema.parse(parsedTickers);
      return validatedTickers.map((ticker) => ticker.id);
    } catch (e) {
      console.error("Error validating tickers from localStorage", e);
      return [];
    }
  },

  addTicker(id: string): void {
    if (!this.isLocalStorageAvailable()) return;

    const currentTickers = this.getTickers();
    const updatedTickers = [...new Set([...currentTickers, id])];

    try {
      const tickersToStore = updatedTickers.map((tickerId) => ({
        id: tickerId,
      }));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tickersToStore));
    } catch (e) {
      console.error("Error adding ticker to localStorage", e);
    }
  },

  removeTicker(id: string): void {
    if (!this.isLocalStorageAvailable()) return;

    const currentTickers = this.getTickers();
    const updatedTickers = currentTickers.filter((tickerId) => tickerId !== id);

    try {
      const tickersToStore = updatedTickers.map((tickerId) => ({
        id: tickerId,
      }));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tickersToStore));
    } catch (e) {
      console.error("Error removing ticker from localStorage", e);
    }
  },
};
