'use client'

import { useAccount, useBalance } from 'wagmi'
import { arbitrum } from 'wagmi/chains'
import { formatEther, formatAddress } from '@/lib/utils'
import { Wallet, Zap, DollarSign, Copy, CheckCircle } from 'lucide-react'
import { useState } from 'react'

export function WalletInfo() {
  const { address } = useAccount()
  const { data: balance } = useBalance({
    address,
    chainId: arbitrum.id,
  })
  const [copied, setCopied] = useState(false)

  if (!address) return null

  const copyAddress = async () => {
    await navigator.clipboard.writeText(address)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all duration-300">
      <h2 className="text-2xl font-bold mb-6 flex items-center text-white">
        <Wallet className="w-6 h-6 mr-3 text-blue-400" />
        Wallet Dashboard
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Wallet Address */}
        <div className="bg-black/20 backdrop-blur-sm border border-white/10 p-6 rounded-xl hover:bg-black/30 transition-all duration-300 group">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-400 rounded-full mr-3 animate-pulse"></div>
              <span className="text-sm text-gray-300">Connected Wallet</span>
            </div>
            <button
              onClick={copyAddress}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors duration-200"
            >
              {copied ? (
                <CheckCircle className="w-4 h-4 text-green-400" />
              ) : (
                <Copy className="w-4 h-4 text-gray-400 group-hover:text-white" />
              )}
            </button>
          </div>
          <div className="font-mono text-sm text-white bg-black/20 p-3 rounded-lg border border-white/10">
            {formatAddress(address)}
          </div>
        </div>

        {/* ETH Balance */}
        <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-sm border border-blue-400/30 p-6 rounded-xl hover:from-blue-500/30 hover:to-cyan-500/30 transition-all duration-300">
          <div className="flex items-center mb-3">
            <div className="p-2 rounded-lg bg-blue-500/30">
              <DollarSign className="w-5 h-5 text-blue-300" />
            </div>
            <span className="text-sm text-gray-300 ml-3">ETH Balance</span>
          </div>
          <div className="text-2xl font-bold text-white">
            {balance ? `${formatEther(balance.value)} ETH` : '0.0000 ETH'}
          </div>
          <div className="text-xs text-gray-400 mt-1">
            ≈ ${balance ? (parseFloat(formatEther(balance.value)) * 2850).toFixed(2) : '0.00'} USD
          </div>
        </div>

        {/* Energy Credits */}
        <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-sm border border-green-400/30 p-6 rounded-xl hover:from-green-500/30 hover:to-emerald-500/30 transition-all duration-300">
          <div className="flex items-center mb-3">
            <div className="p-2 rounded-lg bg-green-500/30">
              <Zap className="w-5 h-5 text-green-300" />
            </div>
            <span className="text-sm text-gray-300 ml-3">Energy Credits</span>
          </div>
          <div className="text-2xl font-bold text-white">247.5 kWh</div>
          <div className="text-xs text-gray-400 mt-1">
            Available for trading
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-black/20 backdrop-blur-sm border border-white/10 p-4 rounded-lg text-center">
          <div className="text-lg font-bold text-white">12</div>
          <div className="text-xs text-gray-400">Active Orders</div>
        </div>
        <div className="bg-black/20 backdrop-blur-sm border border-white/10 p-4 rounded-lg text-center">
          <div className="text-lg font-bold text-white">$1,247</div>
          <div className="text-xs text-gray-400">Total Earned</div>
        </div>
        <div className="bg-black/20 backdrop-blur-sm border border-white/10 p-4 rounded-lg text-center">
          <div className="text-lg font-bold text-white">95.2%</div>
          <div className="text-xs text-gray-400">Success Rate</div>
        </div>
        <div className="bg-black/20 backdrop-blur-sm border border-white/10 p-4 rounded-lg text-center">
          <div className="text-lg font-bold text-white">4.8★</div>
          <div className="text-xs text-gray-400">Rating</div>
        </div>
      </div>
    </div>
  )
}
