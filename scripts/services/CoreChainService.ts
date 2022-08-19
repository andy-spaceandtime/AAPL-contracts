import { JsonRpcProvider } from "@ethersproject/providers";
import { Wallet } from "ethers";

import { RPC_ENDPOINTS } from "../utils/constants";

const PRIVATE_KEY = process.env.DEPLOYER_PRIVATE_KEY || "";

class CoreChainService {
  provider: JsonRpcProvider;
  chainId: keyof typeof RPC_ENDPOINTS;
  wallet: Wallet;

  constructor(chainId: keyof typeof RPC_ENDPOINTS) {
    this.provider = new JsonRpcProvider(RPC_ENDPOINTS[chainId]);
    this.chainId = chainId;
    this.wallet = new Wallet(PRIVATE_KEY, this.provider);
  }
}

export default CoreChainService;
