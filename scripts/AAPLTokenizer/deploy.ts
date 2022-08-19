import { deployContract, verifyContract } from "../utils/deployer";
import { writeContract } from "../utils/io";

async function main() {
  const AAPLTokenizer = await deployContract("AAPLTokenizer");
  console.info("AAPLTokenizer deployed to:", AAPLTokenizer.address);

  const AAPLTokenizerProxy = await deployContract("AAPLTokenizerProxy");
  console.info("AAPLTokenizerProxy deployed to:", AAPLTokenizerProxy.address);

  await AAPLTokenizerProxy.setImplementation(AAPLTokenizer.address).wait();

  writeContract("aapl-tokenizer", AAPLTokenizer.address);
  writeContract("aapl-tokenizer-proxy", AAPLTokenizerProxy.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
