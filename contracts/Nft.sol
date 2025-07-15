// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract RealEstateNFT is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("RealEstateNFT", "RENFT") {}

    function mint(string memory tokenURI) public returns (uint256) {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        return newTokenId;
    }

    function tokenCount() public view returns (uint256) {
        return _tokenIds.current();
    }
} 