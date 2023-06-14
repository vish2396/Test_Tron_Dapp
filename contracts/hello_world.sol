// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract HelloWorld {
    string message;

    function postMessage(string memory value) public returns (string memory) {
        message = value;
        return message;
    }
    
    function getMessage() public view returns (string memory) {
        return message;
    }
}
