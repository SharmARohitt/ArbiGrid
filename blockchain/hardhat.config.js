require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ path: "../.env.local" });

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    hardhat: {
      chainId: 1337
    },
    arbitrumGoerli: {
      url: process.env.ARBITRUM_GOERLI_RPC || "https://goerli-rollup.arbitrum.io/rpc",
      accounts: process.env.PRIVATE_KEY && process.env.PRIVATE_KEY !== "your_private_key_here" ? [process.env.PRIVATE_KEY] : [],
      chainId: 421613,
    },
    arbitrumOne: {
      url: process.env.ARBITRUM_MAINNET_RPC || "https://arb1.arbitrum.io/rpc",
      accounts: process.env.PRIVATE_KEY && process.env.PRIVATE_KEY !== "your_private_key_here" ? [process.env.PRIVATE_KEY] : [],
      chainId: 42161,
    },
  },
  etherscan: {
    apiKey: {
      arbitrumGoerli: process.env.ARBISCAN_API_KEY || "",
      arbitrumOne: process.env.ARBISCAN_API_KEY || "",
    }
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
};
