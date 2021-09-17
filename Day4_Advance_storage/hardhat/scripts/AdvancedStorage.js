const hre = require("hardhat");

async function main() {
  const AdvancedStorage = await hre.ethers.getContractFactory("AdvancedStorage");
  const advancedStorage = await AdvancedStorage.deploy();

  await advancedStorage.deployed();

  console.log("Advanced Storage deployed to:", advancedStorage.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
