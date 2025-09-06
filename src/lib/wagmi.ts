import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { arbitrum, arbitrumGoerli } from 'wagmi/chains'

export const config = getDefaultConfig({
  appName: 'ArbiGrid',
  projectId: '3420abb2d235cf12183dc45f00e8f918',
  chains: [arbitrum, arbitrumGoerli],
  ssr: true,
})

// Smart Contract Addresses
export const CONTRACT_ADDRESSES = {
  [arbitrum.id]: process.env.NEXT_PUBLIC_ARBITRUM_MAINNET_CONTRACT || '0x0000000000000000000000000000000000000000',
  [arbitrumGoerli.id]: process.env.NEXT_PUBLIC_ARBITRUM_TESTNET_CONTRACT || '0x0000000000000000000000000000000000000000',
} as const

// Contract ABI for ArbiGrid Energy Trading
export const ARBIGRID_ABI = [
  // Energy Trading Functions
  {
    "inputs": [
      {"internalType": "uint256", "name": "kwh", "type": "uint256"},
      {"internalType": "uint256", "name": "pricePerKwh", "type": "uint256"},
      {"internalType": "uint256", "name": "duration", "type": "uint256"}
    ],
    "name": "createSale",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "orderId", "type": "uint256"}],
    "name": "purchaseEnergy",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "withdrawFunds",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getOrders",
    "outputs": [
      {
        "components": [
          {"internalType": "address", "name": "seller", "type": "address"},
          {"internalType": "uint256", "name": "kwh", "type": "uint256"},
          {"internalType": "uint256", "name": "pricePerKwh", "type": "uint256"},
          {"internalType": "uint256", "name": "totalPrice", "type": "uint256"},
          {"internalType": "uint256", "name": "duration", "type": "uint256"},
          {"internalType": "uint256", "name": "createdAt", "type": "uint256"},
          {"internalType": "bool", "name": "active", "type": "bool"}
        ],
        "internalType": "struct ArbiGrid.EnergyOrder[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "depositFunds",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  // Events
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "address", "name": "seller", "type": "address"},
      {"indexed": true, "internalType": "uint256", "name": "orderId", "type": "uint256"},
      {"indexed": false, "internalType": "uint256", "name": "kwh", "type": "uint256"},
      {"indexed": false, "internalType": "uint256", "name": "pricePerKwh", "type": "uint256"},
      {"indexed": false, "internalType": "uint256", "name": "totalPrice", "type": "uint256"}
    ],
    "name": "EnergyListed",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "address", "name": "buyer", "type": "address"},
      {"indexed": true, "internalType": "address", "name": "seller", "type": "address"},
      {"indexed": true, "internalType": "uint256", "name": "orderId", "type": "uint256"},
      {"indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256"}
    ],
    "name": "EnergyPurchased",
    "type": "event"
  }
] as const
