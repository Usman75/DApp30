// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleStorage{
    string public data;

    function setData(string memory _data) public returns(string memory){
        data = _data;
        return data;
    }
}