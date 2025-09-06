# 🌟 ArbiGrid - P2P Energy Trading Platform

**ArbiGrid** is a cutting-edge decentralized peer-to-peer energy trading platform built on Arbitrum blockchain. It enables renewable energy producers to directly sell their excess energy to consumers, creating a more efficient and sustainable energy marketplace.

![ArbiGrid Preview](https://img.shields.io/badge/Status-Live-brightgreen) ![Arbitrum](https://img.shields.io/badge/Arbitrum-Enabled-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue) ![Next.js](https://img.shields.io/badge/Next.js-14.0+-black)

## ✨ Features

### 🔋 Core Functionality
- **P2P Energy Trading**: Direct energy trading between producers and consumers
- **Smart Contract Integration**: Secure, transparent transactions using Arbitrum blockchain
- **Real-time Market Data**: Live energy prices, market trends, and trading volume
- **Instant Settlements**: Fast transaction processing with low gas fees on Arbitrum

### � Modern UI/UX
- **Glass Morphism Design**: Modern backdrop-blur effects and gradient overlays
- **Real-time Data Visualization**: Live stats, price charts, and market insights
- **Responsive Layout**: Optimized for desktop, tablet, and mobile devices
- **Dark Theme**: Energy-themed dark mode with purple-blue gradients

### 🔐 Security & Trust
- **Wallet Integration**: Support for MetaMask, WalletConnect, and other Web3 wallets
- **Smart Contract Security**: OpenZeppelin security standards and ReentrancyGuard
- **Transparent Transactions**: All trades recorded on blockchain for transparency
- **Rating System**: User reputation system for trusted trading

## 🛠 Technology Stack

### Frontend
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide Icons**: Modern icon library
- **RainbowKit**: Beautiful wallet connection UI

### Blockchain
- **Arbitrum**: Layer 2 scaling solution for Ethereum
- **Solidity 0.8.20**: Smart contract development
- **Hardhat**: Development environment and deployment tools
- **OpenZeppelin**: Security-audited contract libraries
- **Wagmi**: React hooks for Ethereum

### Web3 Integration
- **WalletConnect**: Multi-wallet support (Project ID: 3420abb2d235cf12183dc45f00e8f918)
- **Viem**: TypeScript Ethereum library
- **Ethers.js**: Ethereum interaction library

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- MetaMask or compatible Web3 wallet
- Arbitrum testnet ETH for testing

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/arbigrid.git
   cd arbigrid
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:3000`

## 📱 Smart Contract Deployment

### Local Development
```bash
cd blockchain
npx hardhat compile
npx hardhat run scripts/deploy-testnet.js --network hardhat
```

### Arbitrum Goerli Testnet
```bash
cd blockchain
npx hardhat run scripts/deploy-testnet.js --network arbitrumGoerli
```

## 🚀 Current Status

The ArbiGrid platform is **fully functional** with:
- ✅ Complete Next.js frontend with modern glassmorphism UI
- ✅ Smart contract compiled and tested (ArbiGrid.sol)
- ✅ WalletConnect integration configured
- ✅ Enhanced dashboard with real-time data visualization
- ✅ Advanced energy marketplace with ratings and progress bars
- ✅ Modern wallet info component with copy functionality
- ✅ Ready for testnet and mainnet deployment

**Currently running at**: http://localhost:3001

## 🎨 UI/UX Enhancements

### Modern Design Elements
- **Glassmorphism**: Backdrop blur and transparency effects with purple-blue gradients
- **Real-time Statistics**: Live updating market data with animated stat cards
- **Enhanced Components**: Modern dashboard with floating elements and smooth transitions
- **Responsive Design**: Optimized for all screen sizes with adaptive layouts

### Key Components
- **Dashboard**: Real-time stats, market insights, and trading overview
- **Energy Marketplace**: Advanced listings with seller ratings and time tracking
- **Wallet Integration**: Modern connection UI with balance display and copy functionality
- **Transaction History**: Clean, organized activity tracking

## � Smart Contract Features

### ArbiGrid.sol
```solidity
// Core functions
function createSale(uint256 kwh, uint256 pricePerKwh, uint256 duration)
function purchaseEnergy(uint256 orderId) payable
function withdrawFunds()
function depositFunds() payable
function getOrders() view returns (EnergyOrder[])
```

### Security Features
- **ReentrancyGuard**: Prevents reentrancy attacks
- **Ownable**: Contract ownership management
- **Input Validation**: Comprehensive parameter checking
- **Safe Math**: Overflow protection

## 🔧 Development Commands

```bash
# Frontend development
npm run dev          # Start development server (currently on port 3001)
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Smart contract development
cd blockchain
npx hardhat compile  # Compile contracts
npx hardhat test     # Run tests
npx hardhat run scripts/deploy-testnet.js --network hardhat  # Local deployment
```

## 🌍 Environmental Impact

ArbiGrid contributes to sustainability by:
- **Renewable Energy Promotion**: Incentivizing clean energy production
- **Grid Efficiency**: Reducing energy waste through direct trading
- **Carbon Footprint Reduction**: Lower emissions vs traditional energy markets
- **Green Metrics**: CO₂ savings tracking and environmental impact visualization

## � Live Demo Features

The current running instance showcases:
- **Real-time Market Data**: Live price updates and trading volume
- **Interactive Dashboard**: Hover effects and smooth animations
- **Wallet Connection**: Ready for MetaMask and WalletConnect
- **Energy Trading Interface**: Complete buy/sell workflow
- **Modern Aesthetics**: Dark theme with energy-inspired gradients

---

**Built with ❤️ for a sustainable energy future on Arbitrum** 🌱⚡

**Live at**: http://localhost:3001
