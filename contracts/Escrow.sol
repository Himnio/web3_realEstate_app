//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

interface IERC721 {
    function transferFrom(
        address _from,
        address _to,
        uint256 _id
    ) external;
}

contract Escrow {

    address public nftAddress;
    address payable public seller;
    address public inspector;
    address public lender;

    constructor(address payable  _seller, address  _lender,address  _inspector, address  _nftAddress){
        nftAddress = _nftAddress;
        seller = _seller;
        inspector = _inspector;
        lender = _lender;
    }
}
