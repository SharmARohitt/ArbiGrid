import hre from "hardhat";
import fs from "fs";

async function main() {
  console.log("Deploying ArbiGrid contract to", hre.network.name);

  // Get the ContractFactory and Signers here.
  const [deployer] = await hre.ethers.getSigners();
  
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await hre.ethers.provider.getBalance(deployer.address)).toString());

  // Deploy ArbiGrid contract
  const ArbiGrid = await hre.ethers.getContractFactory("ArbiGrid");
  const arbiGrid = await ArbiGrid.deploy();
  
  await arbiGrid.waitForDeployment();
  const contractAddress = await arbiGrid.getAddress();

  console.log("ArbiGrid deployed to:", contractAddress);
  console.log("Network:", hre.network.name);
  console.log("Chain ID:", hre.network.config.chainId);

  // Save deployment info
  const deploymentInfo = {
    network: hre.network.name,
    chainId: hre.network.config.chainId,
    contractAddress: contractAddress,
    deployer: deployer.address,
    timestamp: new Date().toISOString(),
    blockNumber: await hre.ethers.provider.getBlockNumber()
  };

  const deploymentsDir = './deployments';
  if (!fs.existsSync(deploymentsDir)) {
    fs.mkdirSync(deploymentsDir);
  }

  fs.writeFileSync(
    `${deploymentsDir}/${hre.network.name}.json`, 
    JSON.stringify(deploymentInfo, null, 2)
  );

  console.log(`Deployment info saved to deployments/${hre.network.name}.json`);

  // Update environment variables suggestion
  console.log("\n=== NEXT STEPS ===");
  console.log("1. Update your .env.local file with the following:");
  if (hre.network.name === 'arbitrumGoerli') {
    console.log(`NEXT_PUBLIC_ARBITRUM_TESTNET_CONTRACT=${contractAddress}`);
  } else if (hre.network.name === 'arbitrumOne') {
    console.log(`NEXT_PUBLIC_ARBITRUM_MAINNET_CONTRACT=${contractAddress}`);
  }
  
  console.log("\n2. Verify the contract (optional):");
  console.log(`npx hardhat verify --network ${hre.network.name} ${contractAddress}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
