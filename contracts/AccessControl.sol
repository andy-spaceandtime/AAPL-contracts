// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";

error AlreadyAdded();
error NotAdded();
error OnlyOperator();
error InvalidAddress();

contract AccessControl is Ownable {
  mapping (address => bool) public operators;

  function addOperator(address _operator) public onlyOwner {
    if(_operator == address(0)) revert InvalidAddress();
    if(operators[_operator]) revert AlreadyAdded();

    operators[_operator] = true;
  }

  function addOperators(address[] calldata _operators) external onlyOwner {
    uint256 length = _operators.length;
    for (uint256 i=0; i<length; i++) {
      addOperator(_operators[i]);
    }
  }

  function revokeOperator(address _operator) public onlyOwner {
    if(_operator == address(0)) revert InvalidAddress();
    if(operators[_operator]) revert NotAdded();

    operators[_operator] = false;
  }

  function revokeOperators(address[] calldata _operators) external onlyOwner {
    uint256 length = _operators.length;
    for (uint256 i=0; i<length; i++) {
      revokeOperator(_operators[i]);
    }
  }

  modifier onlyOperator() {
    if (!operators[_msgSender()]) revert OnlyOperator();
    _;
  } 
}