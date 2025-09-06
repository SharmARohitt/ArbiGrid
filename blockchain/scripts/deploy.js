const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  console.log("Deploying ArbiGrid contract to", hre.network.name);

  // Get the ContractFactory and Signers here.
  const [deployer] = await hre.ethers.getSigners();
  
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await hre.ethers.provider.getBalance(deployer.address)).toString());

  // Deploy ArbiGrid contract
  const ArbiGrid = await hre.ethers.getContractFactory("ArbiGrid");
  console.log("Deploying ArbiGrid...");
  
  const arbiGrid = await ArbiGrid.deploy();
  await arbiGrid.waitForDeployment();
  
  const contractAddress = await arbiGrid.getAddress();

  console.log("✅ ArbiGrid deployed to:", contractAddress);
  console.log("Network:", hre.network.name);
  console.log("Chain ID:", hre.network.config.chainId);

  // Save deployment info
  const deploymentInfo = {
    network: hre.network.name,
    chainId: hre.network.config.chainId,
    contractAddress: contractAddress,
    deployer: deployer.address,
    timestamp: new Date().toISOString(),
    blockNumber: await hre.ethers.provider.getBlockNumber(),
    transactionHash: arbiGrid.deploymentTransaction().hash
  };

  const deploymentsDir = './deployments';
  if (!fs.existsSync(deploymentsDir)) {
    fs.mkdirSync(deploymentsDir);
  }

  fs.writeFileSync(
    `${deploymentsDir}/${hre.network.name}.json`, 
    JSON.stringify(deploymentInfo, null, 2)
  );

  console.log(`📁 Deployment info saved to deployments/${hre.network.name}.json`);

  // Update parent .env.local file
  const envPath = path.join("..", ".env.local");
  let envContent = "";
  
  if (fs.existsSync(envPath)) {
    envContent = fs.readFileSync(envPath, 'utf8');
  }

  const envKey = hre.network.name === 'arbitrumGoerli' 
    ? 'NEXT_PUBLIC_ARBITRUM_TESTNET_CONTRACT' 
    : 'NEXT_PUBLIC_ARBITRUM_MAINNET_CONTRACT';

  // Update or add the contract address
  const regex = new RegExp(`${envKey}=.*`, 'g');
  if (envContent.includes(envKey)) {
    envContent = envContent.replace(regex, `${envKey}=${contractAddress}`);
  } else {
    envContent += `\n${envKey}=${contractAddress}`;
  }

  fs.writeFileSync(envPath, envContent);
  console.log(`📝 Updated ${envPath} with contract address`);

  console.log("\n=== DEPLOYMENT SUCCESSFUL ===");
  console.log(`Contract Address: ${contractAddress}`);
  console.log(`Explorer: https://${hre.network.name === 'arbitrumGoerli' ? 'goerli.' : ''}arbiscan.io/address/${contractAddress}`);
  
  console.log("\n=== NEXT STEPS ===");
  console.log("1. ✅ Contract address automatically updated in .env.local");
  console.log("2. 🔄 Restart your Next.js development server");
  console.log("3. 🔍 Verify the contract (optional):");
  console.log(`   npx hardhat verify --network ${hre.network.name} ${contractAddress}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });
