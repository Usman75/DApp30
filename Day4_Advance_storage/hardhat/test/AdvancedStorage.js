const { expect } = require("chai");
const { ethers } = require("hardhat");

describe('AdvancedStorage', function () {
  before(async function () {
    this.AdvancedStorage = await ethers.getContractFactory('AdvancedStorage');
  });

  beforeEach(async function () {
    this.advancedStorage = await this.AdvancedStorage.deploy();
    await this.advancedStorage.deployed();
  });

  it("Should add an id", async function () {
    const addTx = await this.advancedStorage.add(5);
    await addTx.wait();
    expect(await this.advancedStorage.ids(0)).to.equal(5);
  });

  it("Should return given index", async function () {
    const addTx = await this.advancedStorage.add(10);
    await addTx.wait();
    const addTx1 = await this.advancedStorage.add(20);
    await addTx1.wait();
    expect(await this.advancedStorage.get(0)).to.equal(10);
    expect(await this.advancedStorage.get(1)).to.equal(20);
  });
  it("Should return all elements of array", async function () {
    const addTx = await this.advancedStorage.add(10);
    await addTx.wait();
    const addTx1 = await this.advancedStorage.add(20);
    await addTx1.wait();
    const addTx2 = await this.advancedStorage.add(30);
    await addTx2.wait();
    const rawIds = await this.advancedStorage.getAll();
    const ids = rawIds.map(id => id.toNumber())
    expect(await ids).to.eql([10,20,30]);
    
  });
  it("Should return length of the array", async function () {
    const addTx = await this.advancedStorage.add(10);
    await addTx.wait();
    const addTx1 = await this.advancedStorage.add(20);
    await addTx1.wait();
    const addTx2 = await this.advancedStorage.add(30);
    await addTx2.wait();
    const addTx3 = await this.advancedStorage.add(40);
    await addTx3.wait();
    expect(await this.advancedStorage.length()).to.equal(4);
    
  });
});
