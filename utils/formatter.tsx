
export const formatter = (str: string) => {
  if (str.length < 12) return str;
  return str.substring(0, 12) + "...";
};

export const formatUSDWithComma = (number: number) => {
  return number.toLocaleString("en-US", { style: "currency", currency: "USD" });
};

export const isSeeMore = (description: string) => {
  if(description.length < 50) {
     "See more"
  }
}