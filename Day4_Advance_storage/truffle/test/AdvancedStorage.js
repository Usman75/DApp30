
// const { assert } = require("chai");

const AdvancedStorage = artifacts.require('AdvancedStorage');

contract('AdvancedStorage', () => {
    let advancedStorage = null;
    before(async () => {
        advancedStorage = await AdvancedStorage.deployed();
    });
    it('Should add an element to ids array', async () => {
        await advancedStorage.add(5);
        const result = await advancedStorage.ids(0);
        assert(result.toNumber() === 5);
    });
    it('should return the element on given index', async () => {
        await advancedStorage.add(10)
        const result = await advancedStorage.get(1);
        assert(result.toNumber() === 10);
    });
    it('should get all ids', async () => {
        const rawIds = await advancedStorage.getAll();
        const ids = rawIds.map(id => id.toNumber());
        assert.deepEqual(ids,[5,10]);
    });
    it('should return the length of ids array', async () => {
        const length = await advancedStorage.length();
        assert(length.toNumber() === 2);
    });
});