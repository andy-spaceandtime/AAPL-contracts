/* eslint-disable no-unused-vars */
export type ISupportedNetwork = "mainnet" | "kovan";

export type INetwork<T> = { [network in ISupportedNetwork]: T };
