// Deployment script for ArbiGrid on Arbitrum Goerli testnet
const { ethers, network } = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  console.log("🚀 Deploying ArbiGrid to", network.name);
  
  // Get the contract factory
  const ArbiGrid = await ethers.getContractFactory("ArbiGrid");
  
  console.log("📄 Deploying ArbiGrid contract...");
  
  // Deploy the contract
  const arbiGrid = await ArbiGrid.deploy();
  
  // Wait for deployment to complete
  await arbiGrid.waitForDeployment();
  
  const contractAddress = await arbiGrid.getAddress();
  
  console.log("✅ ArbiGrid deployed to:", contractAddress);
  console.log("🔗 Network:", network.name);
  console.log("⛽ Gas used for deployment:", (await arbiGrid.deploymentTransaction().wait()).gasUsed.toString());
  
  // Update the .env.local file with the new contract address
  updateEnvironmentFile(contractAddress, network.name);
  
  // Save deployment info
  saveDeploymentInfo(contractAddress, network.name);
  
  console.log("📝 Environment variables updated!");
  console.log("🎉 Deployment complete!");
  
  return contractAddress;
}

function updateEnvironmentFile(contractAddress, networkName) {
  const envPath = path.join(__dirname, "../../.env.local");
  
  try {
    let envContent = fs.readFileSync(envPath, "utf8");
    
    if (networkName === "arbitrumGoerli") {
      envContent = envContent.replace(
        /NEXT_PUBLIC_ARBITRUM_TESTNET_CONTRACT=.*/,
        `NEXT_PUBLIC_ARBITRUM_TESTNET_CONTRACT=${contractAddress}`
      );
    } else if (networkName === "arbitrumOne") {
      envContent = envContent.replace(
        /NEXT_PUBLIC_ARBITRUM_MAINNET_CONTRACT=.*/,
        `NEXT_PUBLIC_ARBITRUM_MAINNET_CONTRACT=${contractAddress}`
      );
    }
    
    fs.writeFileSync(envPath, envContent);
  } catch (error) {
    console.log("⚠️ Could not update .env.local file:", error.message);
  }
}

function saveDeploymentInfo(contractAddress, networkName) {
  const deploymentInfo = {
    contractAddress,
    network: networkName,
    deployedAt: new Date().toISOString(),
    blockNumber: null, // Will be filled in verification
  };
  
  const deploymentsDir = path.join(__dirname, "../deployments");
  if (!fs.existsSync(deploymentsDir)) {
    fs.mkdirSync(deploymentsDir, { recursive: true });
  }
  
  const deploymentFile = path.join(deploymentsDir, `${networkName}.json`);
  fs.writeFileSync(deploymentFile, JSON.stringify(deploymentInfo, null, 2));
}

// Handle errors
main()
  .then((address) => {
    console.log(`\n🎯 Contract deployed successfully at: ${address}`);
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });
