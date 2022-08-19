import { BigNumberish, Contract } from "ethers";
import { RPC_ENDPOINTS } from "../utils/constants";
import { AAPLDataFeedABI } from "../utils/abis";
import { readContract } from "../utils/io";
import { toLong8 } from "../utils/math";

import ProxyService from "./ProxyService";
import { TransactionReceipt } from "@ethersproject/providers";

class AAPLDataFeedService extends ProxyService {
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

  async setLatestPrice(price: number): Promise<TransactionReceipt> {
    const tx = await this.contract.setLatestPrice(toLong8(price));
    await tx.wait();
    return tx;
  }

  async getLatestPrice(): Promise<[BigNumberish, BigNumberish]> {
    return this.contract.latestPrice();
  }
}

export default AAPLDataFeedService;
