import * as dotenv from "dotenv";

import { HardhatUserConfig } from "hardhat/config";
import { NetworkUserConfig } from "hardhat/types";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";

dotenv.config();

const SUPPORTED_CHAINS = {
  arbitrum: 42161,
  avalanche: 43114,
  fuji: 43113,
  bsc: 56,
  hardhat: 31337,
  mainnet: 1,
  optimism: 10,
  polygon: 137,
  mumbai: 80001,
  rinkeby: 4,
  kovan: 42,
};

const SUPPORTED_CHAIN_NAMES = [
  "arbitrum",
  "avalanche",
  "fuji",
  "bsc",
  "mainnet",
  "optimism",
  "polygon",
  "mumbai",
  "rinkeby",
  "kovan",
];

const DEPLOYER: string = process.env.DEPLOYER_PRIVATE_KEY || "";
if (!DEPLOYER) {
  throw new Error("Please set your DEPLOYER_PRIVATE_KEY in a .env file");
}

const INFURA_PROJECT_ID: string = process.env.INFURA_PROJECT_ID || "";
if (!INFURA_PROJECT_ID) {
  throw new Error("Please set your INFURA_PROJECT_ID in a .env file");
}

const etherscanApiKey: string = process.env.ETHERSCAN_API_KEY || "";
if (!etherscanApiKey) {
  throw new Error("Please set your ETHERSCAN_API_KEY in a .env file");
}

function getChainConfig(
  chain: keyof typeof SUPPORTED_CHAINS
): NetworkUserConfig {
  let jsonRpcUrl: string;
  switch (chain) {
    case "avalanche":
      jsonRpcUrl = "https://api.avax.network/ext/bc/C/rpc";
      break;
    case "fuji":
      jsonRpcUrl = "https://api.avax-test.network/ext/bc/C/rpc";
      break;
    case "bsc":
      jsonRpcUrl = "https://bsc-dataseed1.binance.org";
      break;
    case "mumbai":
      jsonRpcUrl = "https://matic-mumbai.chainstacklabs.com";
      break;
    case "polygon":
      jsonRpcUrl = "https://polygon-rpc.com";
      break;
    default:
      jsonRpcUrl = "https://" + chain + ".infura.io/v3/" + INFURA_PROJECT_ID;
  }
  return {
    accounts: [DEPLOYER],
    chainId: SUPPORTED_CHAINS[chain],
    url: jsonRpcUrl,
  };
}

function getNetworkConfig() {
  return SUPPORTED_CHAIN_NAMES.reduce((value, CHAIN_NAME) => {
    value[CHAIN_NAME] = getChainConfig(
      CHAIN_NAME as keyof typeof SUPPORTED_CHAINS
    );
    return value;
  }, {} as any);
}

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.9",
      },
    ],
  },
  networks: getNetworkConfig(),
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: {
      mainnet: etherscanApiKey,
      kovan: etherscanApiKey,
    },
  },
};

export default config;
