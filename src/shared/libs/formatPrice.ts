export const formatPrice = (price: number): string | never => {
  if (typeof price !== "number" || isNaN(price)) {
    throw new Error("Invalid price value. Expected a valid number.");
  }

  if (price < 0) {
    throw new Error("Price must be a positive number.");
  }

  try {
    return price >= 1 ? price.toFixed(2) : price.toPrecision(2);
  } catch (error) {
    console.error("Error formatting price:", error);
    throw new Error("Failed to format price.");
  }
};
