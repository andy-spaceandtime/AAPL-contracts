import { config as dotenvConfig } from "dotenv";
import { constants } from "ethers";
import * as fs from "fs";
import * as path from "path";
import type { ISupportedNetwork } from "../interface";

dotenvConfig({ path: path.resolve(__dirname, "../../../.env") });

console.log("DEPLOY_NETWORK: ", process.env.DEPLOY_NETWORK);
type FileName = "aapl-tokenizer";

export const getNetwork = (): ISupportedNetwork => {
  const { DEPLOY_NETWORK } = process.env;
  if (!DEPLOY_NETWORK || DEPLOY_NETWORK === "hardhat") return "kovan";
  if (DEPLOY_NETWORK) return DEPLOY_NETWORK as ISupportedNetwork;
  return "mainnet";
};

export const writeContract = (
  contractFileName: FileName,
  address: string,
  args: any = []
) => {
  const NETWORK = getNetwork();

  fs.writeFileSync(
    path.join(__dirname, `${NETWORK}/${contractFileName}.json`),
    JSON.stringify(
      {
        address,
        args,
      },
      null,
      2
    )
  );
};

export const readContract = (contractFileName: FileName): any => {
  const NETWORK = getNetwork();

  try {
    const rawData = fs.readFileSync(
      path.join(__dirname, `${NETWORK}/${contractFileName}.json`)
    );
    const info = JSON.parse(rawData.toString());
    return {
      address: info.address,
      args: info.args,
    };
  } catch (error) {
    return {
      address: constants.AddressZero,
      args: [],
    };
  }
};
