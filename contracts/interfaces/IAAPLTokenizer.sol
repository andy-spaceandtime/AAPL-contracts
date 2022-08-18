// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface IAAPLTokenizer {
  function mint(address, uint256) external;

  function burn(address, uint256) external;
}