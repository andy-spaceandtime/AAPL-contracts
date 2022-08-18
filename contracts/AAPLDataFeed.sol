// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./AccessControl.sol";
import "./interfaces/IUniswapPool.sol";
import "./interfaces/IAAPLTokenizer.sol";

error SameAAPLPrice();

contract AAPLDataFeed is AccessControl  {
  /// @dev AAPLT Token contract
  address public AAPL_TOKEN;

  /// @dev Uniswap V3 Pool contract
  address public UNISWAP_POOL;

  /// @dev Latest AAPL PRICE
  uint256 public latestPrice;

  /// @dev Latest AAPL PRICE timestamp
  uint256 public updatedAt;

  function _mint() private {
    IAAPLTokenizer token = getAAPL();
    (uint256 price, ) = getLatestPrice();
    token.mint(address(this), 100 * 10**18);
  }

  function _burn() private {
    IAAPLTokenizer token = getAAPL();
    token.burn(address(this), 100 * 10**18);
  }

  function setAAPL(address _aapl) external onlyOwner {
    AAPL_TOKEN = _aapl;
  }

  function setLatestPrice(uint256 _price) external {
    if (latestPrice == _price) {
      revert SameAAPLPrice();
    }

    if (latestPrice > _price) {
      _burn();
    } else {
      _mint();
    }

    latestPrice = _price;
    updatedAt = block.timestamp;
    emit NewPrice(latestPrice, updatedAt);
  }

  function getLatestPrice() public view returns (uint256, uint256) {
    return (latestPrice, updatedAt);
  }

  function getAAPL() public view returns (IAAPLTokenizer) {
    return IAAPLTokenizer(AAPL_TOKEN);
  }

  event NewPrice(uint256 timestamp, uint256 price);
}
