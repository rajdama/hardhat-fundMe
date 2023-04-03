//MOCK-CONTRACTS:- If the contract does not exist we deploy a minimal
// version for our local testing

const { network } = require("hardhat");

const {
  developmentChains,
  DECIMALS,
  INITIAL_ANSWER,
} = require("../helper-hardhat-config");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const deployer =
    "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
  const chainId = network.config.chainId;

  if (developmentChains.includes(network.name)) {
    log("local network is detected! Deploying mocks...");
    await deploy("MockV3Aggregator", {
      contract: "MockV3Aggregator",
      from: deployer,
      log: true,
      args: [DECIMALS, INITIAL_ANSWER],
    });
  }
  log("Mocks deployed successfully");
  log("---------------------------------------------");
};

module.exports.tags = ["all", "mocks"];
