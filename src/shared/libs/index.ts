export const formatPrice = (price: number): string => {
  if (price && typeof price === "number") {
    return price > 1 ? price.toFixed(2) : price.toPrecision(2);
  } else {
    throw new Error("Invalid price");
  }
};

export const objectToArray = <T extends Record<string, unknown>>(
  inputValue: Record<string, T>
): Array<T & { keyName: string }> => {
  try {
    return Object.keys(inputValue).map((key) => ({
      ...inputValue[key],
      keyName: key,
    }));
  } catch {
    throw new Error("Invalid response");
  }
};
