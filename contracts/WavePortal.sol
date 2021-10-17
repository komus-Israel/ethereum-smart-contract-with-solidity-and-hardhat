//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

import 'hardhat/console.sol';



contract WavePortal {

    uint256 totalWaves;
    address[] wavedAddresses;


    constructor() {
        console.log('Wave logs of wallet addresses');
    }

    function wave() public {
        totalWaves += 1;
        console.log('%s wallet address has waved', msg.sender);
        wavedAddresses.push(msg.sender);

        //msg.sender is the address of the person calling the function
    }

    function getTotalWaves() public view returns (uint256) {
        console.log('Total waves: %d', totalWaves);
        return totalWaves;
    }

    function getAddresses() public returns (address[] memory){
        return wavedAddresses;
    }

}