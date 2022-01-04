const hre = require("hardhat");
const { ethers } = hre;
const axios = require("axios");
const fs = require("fs");

async function main () {
  const CRPContract = await ethers.getContractFactory("CROPredict");
  const crpContract = await CRPContract.deploy();
  await crpContract.deployed();

  console.log(`CRP Token Deployed: ${crpContract.address}`);
  const contractSourceCode = fs.readFileSync(
    "/Users/nonse/Desktop/Work/CRO Predict/CRP/contracts/CRP.sol",
    {
      encoding: "utf-8",
    }
  );

  try{
    await axios.get(
      `https://cronos-explorer.crypto.org/api?module=contract&action=verify
       addressHash=${crpContract.address}&name=CROPredict&
       compilerVersion=0.6.12&optimization=false&contractSourceCode=${contractSourceCode}`
    );
  }
  catch(err){
    console.log("Experienced an error when verifying contract", err.message);
  }

};
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
