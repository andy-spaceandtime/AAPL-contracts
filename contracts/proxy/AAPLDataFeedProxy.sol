// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "../abstract/Proxy.sol";

contract AAPLDataFeedProxy is Proxy {
  constructor() {
    admin = msg.sender;
  }
}
