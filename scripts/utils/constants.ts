import type { INetwork } from "../interface";

export const INFURA_PROJECT_ID = process.env.INFURA_PROJECT_ID;

/**
 * Uniswap Liquidity Pool
 *
 * Kovan: https://kovan.etherscan.io/address/0x732adbcf29f583b9131cc9795eaa5a8c18b6e7ca#code
 */

export const UNISWAP_PAIR: INetwork<string> = {
  mainnet: "",
  kovan: "0x732AdBCF29f583b9131Cc9795EAA5A8C18B6E7Ca",
};

export const SUPPORT_CHAIN_IDS = {
  mainnet: 1,
  mumbai: 80001,
} as const;

export const RPC_ENDPOINTS = {
  [SUPPORT_CHAIN_IDS.mainnet]: `https://mainnet.infura.io/v3/${INFURA_PROJECT_ID}`,
  [SUPPORT_CHAIN_IDS.mumbai]: "https://rpc.ankr.com/polygon_mumbai",
} as const;
