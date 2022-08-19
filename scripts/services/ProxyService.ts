import { Contract } from "ethers";
import { RPC_ENDPOINTS } from "../utils/constants";
import { AAPLDataFeedProxyABI } from "../utils/abis";
import { readContract } from "../utils/io";

import CoreChainService from "./CoreChainService";
import { TransactionReceipt } from "@ethersproject/providers";

class ProxyService extends CoreChainService {
  proxy: Contract;

  constructor(chainId: keyof typeof RPC_ENDPOINTS) {
    super(chainId);

    const AAPLDataFeed = readContract("aapl-data-feed-proxy");
    this.proxy = new Contract(
      AAPLDataFeed.address,
      AAPLDataFeedProxyABI,
      this.wallet
    );
  }

  async setImplementation(implementation: string): Promise<TransactionReceipt> {
    const tx = await this.proxy.setImplementation(implementation);
    await tx.wait();
    return tx;
  }
}

export default ProxyService;
