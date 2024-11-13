// require hre, { ethers } from "hardhat";
const hre = require("hardhat");
const ethers = hre.ethers;
const fs = require("fs");

// const { ethers } = require("ethers");

async function main() {

  const [wallet1] = await ethers.getSigners();
  console.log("wallet1 addr:" + wallet1.address);


  const CentralBank = await ethers.getContractFactory("Bank",wallet1);
  const centralBank = await CentralBank.deploy();
  await centralBank.waitForDeployment();
  const centralBankAddr = await centralBank.getAddress();
  console.log("centralBank contract address: "+centralBankAddr);


  //address vrfCoordinator, address linkToken, bytes32 keyHash, uint fee, address bankAddr
  const ChuckALuck = await ethers.getContractFactory("ChuckALuck",wallet1);
  const chuckALuck = await ChuckALuck.deploy(
    "0x9DdfaCa8183c41ad55329BdeeD9F6A8d53168B1B",
    "0x779877A7B0D9E8603169DdbD7836e478b4624789",
    "0x787d74caea10b2b357790d5b5247c2f63d1d91572a9846f780606e4d953677ae",
    "100",
    centralBankAddr
    );
  await chuckALuck.waitForDeployment();
  const chuckALuckAddr = await chuckALuck.getAddress();
  console.log("chuckALuck contract address: "+chuckALuckAddr);


  const Roulette = await ethers.getContractFactory("Roulette",wallet1);
  const roulette = await Roulette.deploy(centralBankAddr);
  await roulette.waitForDeployment();
  const rouletteAddr = await roulette.getAddress();
  console.log("roulette contract address: "+rouletteAddr);

  let data = {
    address: rouletteAddr,
    abi: roulette.interface.format('json')
  }
  fs.writeFileSync('./roulette.json', JSON.stringify(data))

  data = {
    address: chuckALuckAddr,
    abi: chuckALuck.interface.format('json')
  }
  fs.writeFileSync('./chuckALuck.json', JSON.stringify(data))

  data = {
    address: centralBankAddr,
    abi: centralBank.interface.format('json')
  }
  fs.writeFileSync('./centralBank.json', JSON.stringify(data))

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});