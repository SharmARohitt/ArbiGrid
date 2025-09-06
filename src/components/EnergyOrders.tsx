'use client'

import { useState, useEffect } from 'react'
import { useReadContract, useChainId } from 'wagmi'
import { formatEther, formatAddress } from '@/lib/utils'
import { CONTRACT_ADDRESSES, ARBIGRID_ABI } from '@/lib/wagmi'
import { ShoppingCart, Zap, Clock, User, TrendingUp, Star } from 'lucide-react'

interface EnergyOrder {
  id: number
  seller: string
  kwh: bigint
  pricePerKwh: bigint
  totalPrice: bigint
  duration: bigint
  active: boolean
  createdAt?: bigint
}

interface EnergyOrdersProps {
  onBuyClick: (order: EnergyOrder) => void
}

export function EnergyOrders({ onBuyClick }: EnergyOrdersProps) {
  const chainId = useChainId()
  const [orders, setOrders] = useState<EnergyOrder[]>([])
  const [loading, setLoading] = useState(true)

  // Mock data for demonstration (replace with actual contract call)
  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      const mockOrders: EnergyOrder[] = [
        {
          id: 1,
          seller: '0x1234567890123456789012345678901234567890',
          kwh: BigInt(100),
          pricePerKwh: BigInt('50000000000000000'), // 0.05 ETH
          totalPrice: BigInt('5000000000000000000'), // 5 ETH
          duration: BigInt(3600), // 1 hour
          active: true,
          createdAt: BigInt(Date.now() - 300000) // 5 minutes ago
        },
        {
          id: 2,
          seller: '0x2345678901234567890123456789012345678901',
          kwh: BigInt(50),
          pricePerKwh: BigInt('40000000000000000'), // 0.04 ETH
          totalPrice: BigInt('2000000000000000000'), // 2 ETH
          duration: BigInt(7200), // 2 hours
          active: true,
          createdAt: BigInt(Date.now() - 600000) // 10 minutes ago
        },
        {
          id: 3,
          seller: '0x3456789012345678901234567890123456789012',
          kwh: BigInt(200),
          pricePerKwh: BigInt('60000000000000000'), // 0.06 ETH
          totalPrice: BigInt('12000000000000000000'), // 12 ETH
          duration: BigInt(1800), // 30 minutes
          active: true,
          createdAt: BigInt(Date.now() - 120000) // 2 minutes ago
        },
        {
          id: 4,
          seller: '0x4567890123456789012345678901234567890123',
          kwh: BigInt(75),
          pricePerKwh: BigInt('45000000000000000'), // 0.045 ETH
          totalPrice: BigInt('3375000000000000000'), // 3.375 ETH
          duration: BigInt(5400), // 1.5 hours
          active: true,
          createdAt: BigInt(Date.now() - 900000) // 15 minutes ago
        }
      ]
      setOrders(mockOrders)
      setLoading(false)
    }, 1000)
  }, [])

  const getTimeAgo = (timestamp: bigint) => {
    const diff = Date.now() - Number(timestamp)
    const minutes = Math.floor(diff / 60000)
    if (minutes < 1) return 'Just now'
    if (minutes < 60) return `${minutes}m ago`
    const hours = Math.floor(minutes / 60)
    return `${hours}h ago`
  }

  const getPriceColor = (pricePerKwh: bigint) => {
    const price = parseFloat(formatEther(pricePerKwh))
    if (price < 0.045) return 'text-green-400'
    if (price < 0.055) return 'text-yellow-400'
    return 'text-red-400'
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 animate-pulse">
            <div className="flex justify-between items-start mb-4">
              <div className="space-y-2">
                <div className="h-5 bg-white/20 rounded w-24"></div>
                <div className="h-4 bg-white/10 rounded w-32"></div>
              </div>
              <div className="space-y-2">
                <div className="h-6 bg-white/20 rounded w-20"></div>
                <div className="h-4 bg-white/10 rounded w-16"></div>
              </div>
            </div>
            <div className="h-10 bg-white/10 rounded-lg"></div>
          </div>
        ))}
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
          <Zap className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-300 text-lg">No energy orders available</p>
          <p className="text-gray-500 text-sm mt-2">Be the first to list your energy!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4 max-h-96 overflow-y-auto custom-scrollbar">
      {orders.map((order) => (
        <div 
          key={order.id} 
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 group"
        >
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-xl font-bold text-white">{order.kwh.toString()}</span>
                  <span className="text-gray-300">kWh</span>
                  <div className="px-2 py-1 bg-green-500/20 border border-green-400/30 rounded-full">
                    <span className="text-xs text-green-300">Available</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2 mt-1">
                  <User className="w-3 h-3 text-gray-400" />
                  <span className="text-sm text-gray-400">
                    {formatAddress(order.seller)}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3 text-yellow-400" />
                    <span className="text-xs text-gray-400">4.8</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-2xl font-bold text-white">
                {formatEther(order.totalPrice)} ETH
              </div>
              <div className={`text-sm font-medium ${getPriceColor(order.pricePerKwh)}`}>
                {formatEther(order.pricePerKwh)} ETH/kWh
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Clock className="w-4 h-4" />
                <span>{Math.floor(Number(order.duration) / 60)} min duration</span>
              </div>
              {order.createdAt && (
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <TrendingUp className="w-4 h-4" />
                  <span>Listed {getTimeAgo(order.createdAt)}</span>
                </div>
              )}
            </div>
          </div>

          {/* Progress Bar for Duration */}
          <div className="mb-4">
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span>Time Remaining</span>
              <span>{Math.floor(Number(order.duration) / 60)} minutes</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full" 
                style={{ width: '75%' }}
              ></div>
            </div>
          </div>
          
          {/* Action Button */}
          <button
            onClick={() => onBuyClick(order)}
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 text-white py-3 rounded-lg hover:from-blue-600 hover:to-cyan-700 transition-all duration-300 flex items-center justify-center space-x-2 group-hover:shadow-lg transform group-hover:-translate-y-0.5"
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="font-semibold">Purchase Energy</span>
          </button>
        </div>
      ))}
    </div>
  )
}
