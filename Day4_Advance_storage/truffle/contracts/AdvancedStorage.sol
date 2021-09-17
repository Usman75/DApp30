// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AdvancedStorage{
    uint[] public ids;

    function add(uint _item) public {
        ids.push(_item);
    } 

    
    function get(uint _index) view public returns(uint){
        return ids[_index];
    }

    function getAll() view public returns(uint[] memory){
        return ids;
    } 

    function length() view public returns(uint) {
        return ids.length;
    }


}