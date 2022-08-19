import { Contract, Transaction } from "ethers";
import { RPC_ENDPOINTS } from "../utils/constants";
import { AAPLDataFeedABI } from "../utils/abis";
import { readContract } from "../utils/io";

import CoreChainService from "./CoreChainService";
import { TransactionReceipt } from "@ethersproject/providers";

class AAPLDataFeedService extends CoreChainService {
  contract: Contract;

  constructor(chainId: keyof typeof RPC_ENDPOINTS) {
    super(chainId);

    const AAPLDataFeed = readContract("aapl-data-feed-proxy");
    this.contract = new Contract(
      AAPLDataFeed.address,
      AAPLDataFeedABI,
      this.wallet
    );
  }

  async setImplementation(implementation: string): Promise<TransactionReceipt> {
    const tx = await this.contract.setImplementation(implementation);
    await tx.wait();
    return tx;
  }
}

export default AAPLDataFeedService;
