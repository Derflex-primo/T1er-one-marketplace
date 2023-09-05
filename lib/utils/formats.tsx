export const formatStr = (str?: string) => {
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

//ADMIN read_only
export const options = [
  { value: "smartPhones", label: "Smart phones" },
  { value: "laptops", label: "Laptops" },
  { value: "cameras", label: "Cameras" },
  { value: "camera-lens", label: "Camera lens" },
  { value: "wired-headphones", label: "Wired headphones" },
  { value: "wiredless-headphones", label: "Wiredless headphones" },
  { value: "cords", label: "Cords" },
  { value: "accesories", label: "Accesories" },
  { value: "microphone", label: "Microphones" },
  { value: "chips", label: "Chips" }
];

export const sortedOptions = [...options].sort((a, b) =>
  a.label.localeCompare(b.label)
);


export const fiatCurrencies = {
  USD: "United States Dollar",
  EUR: "Euro",
  JPY: "Japanese Yen",
  GBP: "British Pound",
  AUD: "Australian Dollar",
  CAD: "Canadian Dollar",
  CHF: "Swiss Franc",
  CNY: "Chinese Yuan",
  SEK: "Swedish Krona",
  NZD: "New Zealand Dollar",
  MXN: "Mexican Peso",
  SGD: "Singapore Dollar",
  HKD: "Hong Kong Dollar",
  NOK: "Norwegian Krone",
  KRW: "South Korean Won",
  TRY: "Turkish Lira",
  RUB: "Russian Ruble",
  INR: "Indian Rupee",
  BRL: "Brazilian Real",
  ZAR: "South African Rand",
  ARS: "Argentine Peso",
  PHP: "Philippine Peso",
  PLN: "Polish Zloty",
  IDR: "Indonesian Rupiah",
  MYR: "Malaysian Ringgit",
  CZK: "Czech Koruna",
  // ... total 25, extend to 50
};

export const web3Tokens = {
  ETH: "Ethereum",
  BTC: "Bitcoin",
  BNB: "Binance Coin",
  ADA: "Cardano",
  USDT: "Tether",
  XRP: "XRP",
  DOGE: "Dogecoin",
  DOT: "Polkadot",
  USDC: "USD Coin",
  UNI: "Uniswap",
  LTC: "Litecoin",
  SOL: "Solana",
  LINK: "Chainlink",
  MATIC: "Polygon",
  BCH: "Bitcoin Cash",
  XLM: "Stellar",
  THETA: "Theta",
  VET: "VeChain",
  WBTC: "Wrapped Bitcoin",
  TRX: "TRON",
  // ... total 20, extend to 50
};