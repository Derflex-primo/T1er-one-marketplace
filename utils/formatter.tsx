export const formatter = (str?: string) => {
  if (!str) return ""; // Return an empty string if `str` is undefined or null
  if (str.length < 12) return str;
  return str.substring(0, 12) + "...";
};
export const formatUSDWithComma = (number?: number) => {
  if (number === undefined || number === null) {
    return "$0"; // or some default value
  }
  return number.toLocaleString("en-US", { style: "currency", currency: "USD" });
};

export const isSeeMore = (description: string) => {
  if (description.length < 50) {
    ("See more");
  }
};
