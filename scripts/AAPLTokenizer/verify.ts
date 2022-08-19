import { verifyContract } from "../utils/deployer";
import { readContract } from "../utils/io";

async function main() {
  const AAPLTokenizer = await readContract("aapl-tokenizer");
  await verifyContract(
    AAPLTokenizer.address,
    "contracts/AAPLTokenizer.sol:AAPLTokenizer"
  );

  const AAPLTokenizerProxy = await readContract("aapl-tokenizer-proxy");
  await verifyContract(
    AAPLTokenizerProxy.address,
    "contracts/proxy/AAPLTokenizerProxy.sol:AAPLTokenizerProxy"
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
