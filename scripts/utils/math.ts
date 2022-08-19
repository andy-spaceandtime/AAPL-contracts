import { BigNumber, BigNumberish } from "ethers";

export const toLong8 = (value: number): BigNumberish => {
  return BigNumber.from(value).mul(BigNumber.from(100000000));
};
