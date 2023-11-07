import { BiSolidPlaneTakeOff } from "react-icons/bi";
import { BsFillHouseFill } from "react-icons/bs";
import { CgWebsite } from "react-icons/cg";
import { PiBuildings } from "react-icons/pi";
import { RiBuildingLine } from "react-icons/ri";
import { TbTruckDelivery } from "react-icons/tb";

export const formatStr = (str?: string) => {
  if (!str) return ""; // Return an empty string if `str` is undefined or null
  if (str.length < 12) return str;
  return str.substring(0, 12) + "...";
};

export const formatPinnedStr = (str?: string) => {
  if (!str) return ""; // Return an empty string if `str` is undefined or null
  if (str.length < 10) return str;
  return str.substring(0, 10) + "...";
};


export const formatModel =  (str?: string) => { 
  if (!str) return ""; 
  return str.split(",")[0].trim()
}

export const formatBrowseStr = (str?: string) => {
  if (!str) return ""; // Return an empty string if `str` is undefined or null
  if (str.length < 20) return str;
  return str.substring(0, 20) + "...";
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
  { value: "smartPhones", label: "SmartPhones" },
  { value: "laptops", label: "Laptops" },
  { value: "cameras", label: "Cameras" },
  { value: "camera lens", label: "Camera lenses" },
  { value: "wired headphones", label: "Wired headphones" },
  { value: "wireless headphones", label: "Wireless headphones" },
  { value: "cords", label: "Cords" },
  { value: "accessories", label: "Accessories" },
  { value: "microphone", label: "Microphones" },
  { value: "chips", label: "Chips" },
  { value: "desktop", label: "Desktops" },
  { value: "tablet", label: "Tablets" },
  { value: "monitor", label: "Monitors" },
  { value: "external hard drives", label: "External Hard Drives" },
  { value: "memory cards", label: "Memory Cards" },
  { value: "routers", label: "Routers" },
  { value: "modems", label: "Modems" },
  { value: "network switches", label: "Network Switches" },
  { value: "printer", label: "Printers" },
  { value: "scanner", label: "Scanners" },
  { value: "gaming consoles", label: "Gaming Consoles" },
  { value: "gaming accessories", label: "Gaming Accessories" },
  { value: "software", label: "Software" },
  { value: "server equipment", label: "Server Equipment" },
  { value: "diy electronics", label: "DIY Electronics" },
  { value: "drones", label: "Drones" },
  { value: "virtual reality", label: "Virtual Reality" },
  { value: "smartwatches", label: "SmartWatches" },
  { value: "fitness trackers", label: "Fitness Trackers" },
  { value: "e readers", label: "E-readers" },
  { value: "projectors", label: "Projectors" },
  { value: "televisions", label: "Televisions" },
  { value: "car tech", label: "Car Tech" },
  { value: "home automation", label: "Home Automation" },
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
  DKK: "Danish Krone",
  HUF: "Hungarian Forint",
  CLP: "Chilean Peso",
  PEN: "Peruvian Sol",
  AED: "United Arab Emirates Dirham",
  COP: "Colombian Peso",
  THB: "Thai Baht",
  VND: "Vietnamese Dong",
  PKR: "Pakistani Rupee",
  RON: "Romanian Leu",
  NGN: "Nigerian Naira",
  UAH: "Ukrainian Hryvnia",
  GHS: "Ghanaian Cedi",
  MAD: "Moroccan Dirham",
  QAR: "Qatari Rial",
  BDT: "Bangladeshi Taka",
  JOD: "Jordanian Dinar",
  UYU: "Uruguayan Peso",
  KES: "Kenyan Shilling",
  OMR: "Omani Rial",
  CUP: "Cuban Peso",
  SYP: "Syrian Pound",
  BYN: "Belarusian Ruble",
  DZD: "Algerian Dinar",
  LKR: "Sri Lankan Rupee",
};

// List of 50 web3 tokens
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
  EOS: "EOS",
  AAVE: "Aave",
  SHIB: "Shiba Inu",
  SNX: "Synthetix",
  MKR: "Maker",
  YFI: "yearn.finance",
  COMP: "Compound",
  ZIL: "Zilliqa",
  SUSHI: "SushiSwap",
  FTT: "FTX Token",
  FIL: "Filecoin",
  ICP: "Internet Computer",
  AXS: "Axie Infinity",
  DASH: "Dash",
  CHZ: "Chiliz",
  ATOM: "Cosmos",
  QTUM: "Qtum",
  HBAR: "Hedera Hashgraph",
  REN: "Ren",
  ENJ: "Enjin Coin",
  BAT: "Basic Attention Token",
  ZRX: "0x",
  RSR: "Reserve Rights",
  OMG: "OMG Network",
  ALGO: "Algorand",
  LRC: "Loopring",
  KAVA: "Kava",
  NANO: "Nano",
};

// DEAlS

export const gadgetDealTypes = [
  { value: "early-bird", label: "Early Bird Discount" },
  { value: "trade-in", label: "Trade-In Offer" },
  { value: "bundle", label: "Bundle Deal" },
  { value: "launch-special", label: "Launch Special" },
  { value: "student-discount", label: "Student Discount" },
  { value: "refurbished-discount", label: "Refurbished Discount" },
  { value: "seasonal-sale", label: "Seasonal Sale" },
];

// ADD ALL LOGISTIS PER COUNTRY

export const logisticsPartnersPH = [
  { value: "lbc", label: "LBC Express" },
  { value: "jnt", label: "J&T Express" },
  { value: "jrs", label: "JRS Express" },
  { value: "2go", label: "2GO Express" },
  { value: "xpost", label: "Xpost (Ninja Van)" },
  { value: "grabexpress", label: "GrabExpress" },
  { value: "mr-speedy", label: "Mr. Speedy" },
];

/// Browse logic

export default function splitWord(category: string) {
  const result = category.replace(/([a-z])([A-Z])/g, "$1 $2");
  // Convert the second word to lowercase
  const words = result.split(" ");
  if (words.length > 1) {
    words[1] = words[1].toLowerCase();
    return words.join(" ");
  }
  return result;
}

export const discountOptions = [
  "All Discounts",
  "10% off",
  "20% off", 
  "30% off",
  "40% off",
  "50% off",
  "60% off",
];

export const storageCapacity = [
  "32GB",
  "64GB",
  "128GB",
  "256GB",
  "512GB",
  "1TB",
  "2TB and above",
];

export const connectivityOptions = [
  "Bluetooth",
  "Wi-Fi",
  "NFC",
  "USB",
  "LTE/5G",
  "Ethernet",
  "Satellite Communication",
  "Infrared (IR)",
  "HDMI",
  "DisplayPort",
  "Audio Jack",
  "SD Card Slot",
  "SIM Card Slot",
  "GPS",
  "Zigbee and Z-wave",
  "MQTT (for IoT devices)",
];

export const displayTechnologies = [
  "LCD",
  "TFT-LCD",
  "IPS-LCD",
  "TN",
  "LED",
  "OLED",
  "AMOLED",
  "Super AMOLED",
  "QLED",
  "Mini-LED",
  "Plasma",
  "E-Ink",
  "MicroLED",
  "Retina Display",
  "HDR",
];

export const screenRefreshRates = [
  "60Hz",
  "75Hz",
  "90Hz",
  "120Hz",
  "144Hz",
  "165Hz",
  "240Hz",
  "360Hz",
];

export const ramCapacities = [
  "2GB",
  "4GB",
  "6GB",
  "8GB",
  "12GB",
  "16GB",
  "32GB",
  "64GB",
  "128GB",
];

export const operatingSystems = [
  "Windows",
  "macOS",
  "watchOS",
  "iPadOS",
  "Linux",
  "Android",
  "iOS",
  "Chrome OS",
  "Ubuntu",
  "Fedora",
  "Debian",
  "FreeBSD",
  "Solaris",
];


export const processorCores = [
  "Single Core",
  "Dual Core",
  "Quad Core",
  "Hexa Core",
  "Octa Core",
  "Deca Core",
  "12 Cores",
  "16 Cores",
  "24 Cores",
  "32 Cores",
  "64 Cores"
];

const currentYear = new Date().getFullYear();
export const releaseYears = Array.from(
  { length: 10 },
  (_, idx) => currentYear - idx
);

export const customerRatings = [
  "5 stars",
  "4 stars & up",
  "3 stars & up",
  "2 stars & up",
  "1 star & up",
];


// BRAND

export const brandListed = [
  "Apple",
  "AstroGaming",
  
]


 // PARCEL


 export const currentStep = '';

 export const steps = {
   website: <CgWebsite size={49} />,
   warehouse: <PiBuildings size={49} />,
   plane: <BiSolidPlaneTakeOff size={49} />,
   customs: <RiBuildingLine size={47} />,
   truck: <TbTruckDelivery size={50} />,
   home: <BsFillHouseFill size={45} />,
 };


 type StepMessages = {
  [key: string]: string;
};


 export const stepMessages: StepMessages = {
  website: "Your order is being processed.",
  warehouse: "Your parcel is at the warehouse.",
  plane: "Your parcel is on its way to you, flying high!",
  customs: "Your parcel is clearing customs.",
  truck: "Your parcel is out for delivery.",
  home: "Your parcel has been delivered to your home."
};

