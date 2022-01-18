const hre = require("hardhat");
const { ethers } = hre;
const axios = require("axios");
const fs = require("fs");

async function main () {
  const CRPContract = await ethers.getContractFactory("CROPredict");
  const crpContract = await CRPContract.deploy();
  await crpContract.deployed();

  console.log(`CRP Token Deployed: ${crpContract.address}`);
};
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
