import { deployContract } from "../utils/deployer";
import { writeContract } from "../utils/io";

async function main() {
  const AAPLDataFeed = await deployContract("AAPLDataFeed");
  console.info("AAPLDataFeed deployed to:", AAPLDataFeed.address);

  writeContract("aapl-data-feed", AAPLDataFeed.address);

  const AAPLDataFeedProxy = await deployContract("AAPLDataFeedProxy");
  console.info("AAPLDataFeedProxy deployed to:", AAPLDataFeedProxy.address);

  writeContract("aapl-data-feed-proxy", AAPLDataFeedProxy.address);

  const tx = await AAPLDataFeedProxy.setImplementation(AAPLDataFeed.address);
  await tx.wait();

  console.log("Set Implementation: ", tx);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
