'use client'

import { useState, useEffect } from 'react'
import { useAccount, useBalance, useReadContract } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Header } from './Header'
import { WalletInfo } from './WalletInfo'
import { EnergyOrders } from './EnergyOrders'
import { TransactionHistory } from './TransactionHistory'
import { SellEnergyModal } from './SellEnergyModal'
// import { BuyEnergyModal } from './BuyEnergyModal'
import { Hero } from './Hero'
import { cn } from '@/lib/utils'
import { 
  TrendingUp, 
  TrendingDown, 
  Zap, 
  DollarSign, 
  Users, 
  ArrowUpRight,
  ArrowDownRight,
  Battery,
  Leaf,
  Activity,
  BarChart3
} from 'lucide-react'

interface DashboardStats {
  totalEnergyTraded: number
  totalRevenue: number
  activeOrders: number
  tradingVolume24h: number
  energyPrice: number
  priceChange24h: number
}

export function Dashboard() {
  const { address, isConnected } = useAccount()
  const [showSellModal, setShowSellModal] = useState(false)
  const [showBuyModal, setShowBuyModal] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<any>(null)
  const [stats, setStats] = useState<DashboardStats>({
    totalEnergyTraded: 1247.5,
    totalRevenue: 2856.32,
    activeOrders: 23,
    tradingVolume24h: 156.8,
    energyPrice: 0.125,
    priceChange24h: 5.2
  })

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        energyPrice: prev.energyPrice + (Math.random() - 0.5) * 0.001,
        priceChange24h: prev.priceChange24h + (Math.random() - 0.5) * 0.5,
        tradingVolume24h: prev.tradingVolume24h + Math.random() * 10
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <Header />
        <Hero />
        
        {/* Enhanced Connect Wallet Section */}
        <div className="relative py-20 px-4">
          <div className="container mx-auto text-center">
            <div className="max-w-md mx-auto">
              <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Trading?</h2>
              <p className="text-gray-300 mb-8">
                Connect your wallet to access the energy marketplace and start buying or selling clean energy.
              </p>
              
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl blur-xl opacity-50 animate-pulse"></div>
                <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-4 hover:bg-white/15 transition-all duration-300">
                  <ConnectButton />
                </div>
              </div>
              
              <div className="mt-8 text-sm text-gray-400">
                <p>Supported wallets: MetaMask, WalletConnect, Coinbase Wallet</p>
                <p className="mt-2">✅ Secure • ✅ Decentralized • ✅ Low Fees on Arbitrum</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const StatCard = ({ 
    title, 
    value, 
    change, 
    icon: Icon, 
    color = "green",
    prefix = "",
    suffix = "" 
  }: {
    title: string
    value: string | number
    change?: number
    icon: any
    color?: "green" | "blue" | "purple" | "orange"
    prefix?: string
    suffix?: string
  }) => {
    const colorClasses = {
      green: "from-green-500 to-emerald-600",
      blue: "from-blue-500 to-cyan-600", 
      purple: "from-purple-500 to-violet-600",
      orange: "from-orange-500 to-red-600"
    }

    return (
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl blur-xl"></div>
        <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 hover:bg-white/20 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-lg bg-gradient-to-r ${colorClasses[color]}`}>
              <Icon className="h-6 w-6 text-white" />
            </div>
            {change !== undefined && (
              <div className={`flex items-center space-x-1 text-sm ${
                change >= 0 ? 'text-green-400' : 'text-red-400'
              }`}>
                {change >= 0 ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                <span>{Math.abs(change).toFixed(1)}%</span>
              </div>
            )}
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-white">
              {prefix}{typeof value === 'number' ? value.toLocaleString() : value}{suffix}
            </p>
            <p className="text-sm text-gray-300">{title}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Enhanced Wallet Info */}
        <div className="mb-8">
          <WalletInfo />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Energy Traded"
            value={stats.totalEnergyTraded}
            change={8.2}
            icon={Zap}
            color="green"
            suffix=" kWh"
          />
          <StatCard
            title="Total Revenue"
            value={stats.totalRevenue}
            change={12.5}
            icon={DollarSign}
            color="blue"
            prefix="$"
          />
          <StatCard
            title="Active Orders"
            value={stats.activeOrders}
            icon={Activity}
            color="purple"
          />
          <StatCard
            title="24h Volume"
            value={stats.tradingVolume24h.toFixed(1)}
            change={stats.priceChange24h}
            icon={BarChart3}
            color="orange"
            suffix=" kWh"
          />
        </div>

        {/* Enhanced Action Buttons */}
        <div className="flex flex-wrap gap-4 mb-8">
          <button
            onClick={() => setShowSellModal(true)}
            className="group relative overflow-hidden bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <div className="flex items-center space-x-2">
              <Battery className="h-5 w-5" />
              <span>Sell Energy</span>
            </div>
            <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
          </button>
          
          <button
            onClick={() => setShowBuyModal(true)}
            className="group relative overflow-hidden bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-600 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <div className="flex items-center space-x-2">
              <Leaf className="h-5 w-5" />
              <span>Buy Energy</span>
            </div>
            <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
          </button>

          <div className="ml-auto flex items-center space-x-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl px-6 py-4">
            <div className="text-center">
              <p className="text-lg font-bold text-white">${stats.energyPrice.toFixed(3)}</p>
              <p className="text-xs text-gray-300">per kWh</p>
            </div>
            <div className={`flex items-center space-x-1 text-sm ${
              stats.priceChange24h >= 0 ? 'text-green-400' : 'text-red-400'
            }`}>
              {stats.priceChange24h >= 0 ? 
                <TrendingUp className="h-4 w-4" /> : 
                <TrendingDown className="h-4 w-4" />
              }
              <span>{Math.abs(stats.priceChange24h).toFixed(1)}%</span>
            </div>
          </div>
        </div>

        {/* Enhanced Dashboard Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Available Energy Orders - Takes 2 columns */}
          <div className="xl:col-span-2">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all duration-300">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
                  <Zap className="h-6 w-6 text-yellow-400" />
                  <span>Energy Marketplace</span>
                </h2>
                <div className="flex items-center space-x-2 text-sm text-gray-300">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>Live Market</span>
                </div>
              </div>
              <EnergyOrders onBuyClick={(order: any) => {
                setSelectedOrder(order)
                setShowBuyModal(true)
              }} />
            </div>
          </div>

          {/* Transaction History - Takes 1 column */}
          <div className="xl:col-span-1">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all duration-300">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
                  <Activity className="h-6 w-6 text-blue-400" />
                  <span>Recent Activity</span>
                </h2>
              </div>
              <TransactionHistory />
            </div>
          </div>
        </div>

        {/* Market Insights Section */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
              <Users className="h-5 w-5 text-purple-400" />
              <span>Market Overview</span>
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Active Traders</span>
                <span className="text-white font-medium">234</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Total Orders</span>
                <span className="text-white font-medium">1,456</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Market Cap</span>
                <span className="text-white font-medium">$125.6K</span>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
              <Leaf className="h-5 w-5 text-green-400" />
              <span>Green Impact</span>
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">CO₂ Saved</span>
                <span className="text-white font-medium">2.4 tons</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Trees Equivalent</span>
                <span className="text-white font-medium">156</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Renewable %</span>
                <span className="text-white font-medium">89.2%</span>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-orange-400" />
              <span>Performance</span>
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Best Price Today</span>
                <span className="text-white font-medium">$0.089</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Avg. Settlement</span>
                <span className="text-white font-medium">2.3 mins</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Success Rate</span>
                <span className="text-white font-medium">98.7%</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      {showSellModal && (
        <SellEnergyModal onClose={() => setShowSellModal(false)} />
      )}
      
      {showBuyModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-slate-900 to-purple-900 border border-white/20 rounded-2xl p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold text-white mb-4">Buy Energy Modal</h2>
            <p className="text-gray-300 mb-6">Temporarily disabled for debugging</p>
            <button
              onClick={() => {
                setShowBuyModal(false)
                setSelectedOrder(null)
              }}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-cyan-700 transition-all duration-300 font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
