import { verifyContract } from "../utils/deployer";
import { readContract } from "../utils/io";

async function main() {
  const AAPLDataFeed = await readContract("aapl-data-feed");
  await verifyContract(
    AAPLDataFeed.address,
    "contracts/AAPLDataFeed.sol:AAPLDataFeed"
  );

  const AAPLDataFeedProxy = await readContract("aapl-data-feed-proxy");
  await verifyContract(
    AAPLDataFeedProxy.address,
    "contracts/proxy/AAPLDataFeedProxy.sol:AAPLDataFeedProxy"
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
