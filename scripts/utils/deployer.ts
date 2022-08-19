import { ethers, run } from "hardhat";

export const deployContract = async (contractName: string, args: any = []) => {
  const Contract = await ethers.getContractFactory(contractName);
  const contract = await Contract.deploy(...args);
  await contract.deployed();

  return contract;
};

export const verifyContract = async (
  contractAddress: string,
  contract: string,
  args: any = []
) => {
  try {
    await run("verify:verify", {
      address: contractAddress,
      contract,
      constructorArguments: args,
    });
  } catch (error) {
    console.log(`${contract} verification error: `, error);
  }
};
