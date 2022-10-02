// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "hardhat/console.sol";

contract Storage {
     mapping(string => mapping(uint => string)) private inserts;

    function getCID(string calldata adhar, uint _i) public view returns (string memory) {
        return inserts[adhar][_i];
    }

    function setCID(
        string calldata adhar,
        uint _i,
        string calldata _cid
    ) public {
        inserts[adhar][_i] = _cid;
    }

    function remove(string calldata adhar, uint _i) public {
        delete inserts[adhar][_i];
    }

}