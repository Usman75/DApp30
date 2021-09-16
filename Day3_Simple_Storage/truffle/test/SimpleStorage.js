const { assert } = require("console");

const SimpleStorage = artifacts.require("SimpleStorage");

contract("SimpleStorage", () =>{
    it("Should return the data and compear it with origional data ", async () => {
        const simpleStorage = await SimpleStorage.deployed();
        let result = await simpleStorage.getData();
        assert(result === "Simple Storage");
    });
    it("Should set the data and also check it by returnig the data ", async () => {
        const simpleStorage = await SimpleStorage.deployed();
        let data = 'Testing with truffle test';
        await simpleStorage.setData(data);
        let result = await simpleStorage.getData();
        console.log(result);
        console.log(data);
        assert(result === data);
    });
});