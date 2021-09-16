const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SimpleStorae", function () { 
  it("It should get the data using getData() and also setData() ", async function () {
    const SimpleStorage = await ethers.getContractFactory("SimpleStorage");
    const simpleStorage = await SimpleStorage.deploy();
    await simpleStorage.deployed();
    let data = "Testing a SimpleStorage Contract";

    expect(await simpleStorage.getData()).to.equal("Simple Storage");
    const setDataTx = await simpleStorage.setData(data);
    await setDataTx.wait()
    expect(await simpleStorage.getData()).to.equal(data);
  });
});
