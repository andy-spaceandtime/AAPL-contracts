// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./AccessControl.sol";

contract AAPLTokenizer is ERC20, AccessControl {

  constructor() ERC20("AAPL Tokenizer", "AAPLT") {
    operators[_msgSender()] = true;
  }

  function mint(address _who, uint256 _amount) public onlyOperator {
    _mint(_who, _amount);
  }

  function burn(address _who, uint256 _amount) public onlyOwner {
    _burn(_who, _amount);
  }
}
