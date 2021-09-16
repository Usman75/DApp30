// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleStorage{
    string private data = "Simple Storage";

    function setData(string memory _data) public {
        data = _data;
    }
    function getData() view public returns(string memory ){
        return data; 
    }
}
