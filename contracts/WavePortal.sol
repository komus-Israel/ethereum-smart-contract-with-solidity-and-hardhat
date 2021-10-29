//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

import 'hardhat/console.sol';



contract WavePortal {

    uint256 totalWaves;
    address[] wavedAddresses;

    /*
        We will be using this to help generate a random number
     */

     uint256 private seed;

    /*
        events
     */

     event NewWave(address indexed from, uint256 timestamp, string message);

     /*
        struct is a custom datatype where we can customize what we want to hold inside it
     */

     struct Wave {
         address waver; // address of the user who waved
         string message; // The message the user sent
         uint256 timestamp; // The timestamp when the user waved
     }

     /**
        I declare a variable waves that lets me store an array of structs
        This is what lets me hold all the waves anyone ever sends to me
      */

      Wave[] waves;

    mapping(address => uint256) public lastWavedAt;


    constructor() payable {
        console.log('I am an ethereum smart contract');

        /*
        set the initial seed
         */

         seed = (block.timestamp + block.difficulty) % 100;
    }

    

    function wave(string memory _message) public {

        /*
         * We need to make sure the current timestamp is at least 15-minutes bigger than the last timestamp we stored
         */

        require(
            lastWavedAt[msg.sender] + 30 seconds < block.timestamp,
            'Wait 15m'
        );

        /*
         * Update the current timestamp we have for the user
         */

        lastWavedAt[msg.sender] = block.timestamp;
        totalWaves += 1;
        console.log('%s wallet address has waved', msg.sender);

        //append the waver to the waveAddress Array
        wavedAddresses.push(msg.sender);

        //Store the wave data in the waves array

         waves.push(
            Wave(msg.sender, _message, block.timestamp)
        );

        //msg.sender is the address of the person calling the function

        /*
        Generate a new seed for the next user that sends a wave
         */

         seed = (block.difficulty + block.timestamp + seed) % 100;

         /*
         *  Get a 50% chance that the user wins the prize
          */

          if (seed <= 50) {
              console.log('%s won!', msg.sender);
              //initialize the amount to send to users
                uint256 prizeAmount = 0.000000001 ether;
                require(
                    prizeAmount <= address(this).balance,
                    'Current ether balance not enough to fund winner'
                );
                (bool success, ) = (msg.sender).call{value: prizeAmount}('');
                require(success, 'Failed to withdraw money from contract');
            }


        
       

        emit NewWave(msg.sender, block.timestamp, _message);
    }

    function getAllWaves() public view returns (Wave[] memory) {
        return waves;
    }

    function getTotalWaves() public view returns (uint256) {
        console.log('Total waves: %d', totalWaves);
        return totalWaves;
    }

    function getAddresses() public view returns (address[] memory){
        return wavedAddresses;
    }

}