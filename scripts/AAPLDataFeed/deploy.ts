import { deployContract, verifyContract } from "../utils/deployer";
import { writeContract } from "../utils/io";
import { SUPPORT_CHAIN_IDS } from "../utils/constants";
import AAPLDataFeedService from "../services/AAPLDataFeedService";

async function main() {
  const AAPLDataFeed = await deployContract("AAPLDataFeed");
  console.info("AAPLDataFeed deployed to:", AAPLDataFeed.address);

  writeContract("aapl-data-feed", AAPLDataFeed.address);

  const AAPLDataFeedProxy = await deployContract("AAPLDataFeedProxy");
  console.info("AAPLDataFeedProxy deployed to:", AAPLDataFeedProxy.address);

  writeContract("aapl-data-feed-proxy", AAPLDataFeedProxy.address);

  // const NETWORK = (process.env.DEPLOY_NETWORK ||
  //   "mumbai") as keyof typeof SUPPORT_CHAIN_IDS;

  // const service = new AAPLDataFeedService(SUPPORT_CHAIN_IDS[NETWORK]);
  // const tx = await service.setImplementation(AAPLDataFeedProxy.address);
  // console.log("Set Implementation: ", tx);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
