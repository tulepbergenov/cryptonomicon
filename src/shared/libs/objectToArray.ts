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
