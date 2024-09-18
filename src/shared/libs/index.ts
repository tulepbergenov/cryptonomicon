export const formatPrice = (price: number): string => {
  if (price && typeof price === "number") {
    return price > 1 ? price.toFixed(2) : price.toPrecision(2);
  } else {
    throw new Error("Invalid price");
  }
};

export const objectToArray = <T>(inputValue: Record<string, T>): Array<T> => {
  try {
    return Object.values(inputValue);
  } catch {
    throw new Error("Invalid response");
  }
};
