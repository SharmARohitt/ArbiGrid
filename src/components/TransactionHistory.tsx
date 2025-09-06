'use client'

import { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'
import { formatEther, formatAddress } from '@/lib/utils'
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  Clock, 
  CheckCircle, 
  XCircle, 
  ExternalLink,
  Filter,
  Calendar,
  DollarSign,
  Zap,
  TrendingUp,
  TrendingDown
} from 'lucide-react'

interface Transaction {
  id: string
  type: 'buy' | 'sell'
  counterparty: string
  amount: bigint
  price: bigint
  pricePerKwh: bigint
  timestamp: Date
  status: 'pending' | 'completed' | 'failed'
  txHash?: string
  gasUsed?: string
  blockNumber?: number
}

export function TransactionHistory() {
  const { address } = useAccount()
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'buy' | 'sell'>('all')
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'pending' | 'failed'>('all')

  // Mock data for demonstration with more detailed transaction history
  useEffect(() => {
    setTimeout(() => {
      const mockTransactions: Transaction[] = [
        {
          id: '1',
          type: 'sell',
          counterparty: '0x1234567890123456789012345678901234567890',
          amount: BigInt(100),
          price: BigInt('5000000000000000000'),
          pricePerKwh: BigInt('50000000000000000'),
          timestamp: new Date(Date.now() - 3600000), // 1 hour ago
          status: 'completed',
          txHash: '0xabcd1234567890abcdef1234567890abcdef1234',
          gasUsed: '21000',
          blockNumber: 12345678
        },
        {
          id: '2',
          type: 'buy',
          counterparty: '0x2345678901234567890123456789012345678901',
          amount: BigInt(50),
          price: BigInt('2000000000000000000'),
          pricePerKwh: BigInt('40000000000000000'),
          timestamp: new Date(Date.now() - 7200000), // 2 hours ago
          status: 'completed',
          txHash: '0xefgh5678901234567890efgh5678901234567890',
          gasUsed: '21000',
          blockNumber: 12345670
        },
        {
          id: '3',
          type: 'sell',
          counterparty: '0x3456789012345678901234567890123456789012',
          amount: BigInt(75),
          price: BigInt('3750000000000000000'),
          pricePerKwh: BigInt('50000000000000000'),
          timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
          status: 'pending'
        },
        {
          id: '4',
          type: 'buy',
          counterparty: '0x4567890123456789012345678901234567890123',
          amount: BigInt(200),
          price: BigInt('12000000000000000000'),
          pricePerKwh: BigInt('60000000000000000'),
          timestamp: new Date(Date.now() - 10800000), // 3 hours ago
          status: 'completed',
          txHash: '0xijkl9012345678901234ijkl9012345678901234',
          gasUsed: '21000',
          blockNumber: 12345665
        },
        {
          id: '5',
          type: 'sell',
          counterparty: '0x5678901234567890123456789012345678901234',
          amount: BigInt(150),
          price: BigInt('6750000000000000000'),
          pricePerKwh: BigInt('45000000000000000'),
          timestamp: new Date(Date.now() - 14400000), // 4 hours ago
          status: 'failed'
        }
      ]
      setTransactions(mockTransactions)
      setLoading(false)
    }, 800)
  }, [address])

  const filteredTransactions = transactions.filter(tx => {
    const typeMatch = filter === 'all' || tx.type === filter
    const statusMatch = statusFilter === 'all' || tx.status === statusFilter
    return typeMatch && statusMatch
  })

  const getStatusIcon = (status: Transaction['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-400" />
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-400" />
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-400" />
    }
  }

  const getStatusColor = (status: Transaction['status']) => {
    switch (status) {
      case 'completed':
        return 'text-green-300 bg-green-500/20 border-green-400/30'
      case 'pending':
        return 'text-yellow-300 bg-yellow-500/20 border-yellow-400/30'
      case 'failed':
        return 'text-red-300 bg-red-500/20 border-red-400/30'
    }
  }

  const getTotalStats = () => {
    const completed = filteredTransactions.filter(tx => tx.status === 'completed')
    const totalBought = completed.filter(tx => tx.type === 'buy').reduce((sum, tx) => sum + Number(formatEther(tx.price)), 0)
    const totalSold = completed.filter(tx => tx.type === 'sell').reduce((sum, tx) => sum + Number(formatEther(tx.price)), 0)
    const totalEnergyBought = completed.filter(tx => tx.type === 'buy').reduce((sum, tx) => sum + Number(tx.amount), 0)
    const totalEnergySold = completed.filter(tx => tx.type === 'sell').reduce((sum, tx) => sum + Number(tx.amount), 0)
    
    return { totalBought, totalSold, totalEnergyBought, totalEnergySold, netProfit: totalSold - totalBought }
  }

  const stats = getTotalStats()

  if (loading) {
    return (
      <div className="space-y-4">
        {/* Stats Loading */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 animate-pulse">
              <div className="h-4 bg-white/20 rounded w-3/4 mb-2"></div>
              <div className="h-6 bg-white/20 rounded w-1/2"></div>
            </div>
          ))}
        </div>
        
        {/* Transactions Loading */}
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 animate-pulse">
            <div className="h-4 bg-white/20 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-white/20 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Transaction Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="w-4 h-4 text-green-400" />
            <span className="text-sm text-gray-300">Total Sold</span>
          </div>
          <div className="text-xl font-bold text-white">{stats.totalSold.toFixed(3)} ETH</div>
          <div className="text-xs text-gray-400">{stats.totalEnergySold} kWh</div>
        </div>
        
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingDown className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-gray-300">Total Bought</span>
          </div>
          <div className="text-xl font-bold text-white">{stats.totalBought.toFixed(3)} ETH</div>
          <div className="text-xs text-gray-400">{stats.totalEnergyBought} kWh</div>
        </div>
        
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
          <div className="flex items-center space-x-2 mb-2">
            <DollarSign className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-gray-300">Net Profit</span>
          </div>
          <div className={`text-xl font-bold ${stats.netProfit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {stats.netProfit >= 0 ? '+' : ''}{stats.netProfit.toFixed(3)} ETH
          </div>
          <div className="text-xs text-gray-400">
            {filteredTransactions.filter(tx => tx.status === 'completed').length} transactions
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex space-x-2">
          <span className="text-sm text-gray-300">Type:</span>
          {(['all', 'buy', 'sell'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                filter === type
                  ? 'bg-blue-500/30 text-blue-300 border border-blue-400/30'
                  : 'bg-white/10 text-gray-400 hover:bg-white/20'
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
        
        <div className="flex space-x-2">
          <span className="text-sm text-gray-300">Status:</span>
          {(['all', 'completed', 'pending', 'failed'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                statusFilter === status
                  ? 'bg-purple-500/30 text-purple-300 border border-purple-400/30'
                  : 'bg-white/10 text-gray-400 hover:bg-white/20'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Transactions List */}
      <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
        {filteredTransactions.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
              <Clock className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-300 text-lg">No transactions found</p>
              <p className="text-gray-500 text-sm mt-2">Start trading energy to see your history!</p>
            </div>
          </div>
        ) : (
          filteredTransactions.map((tx) => (
            <div key={tx.id} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all duration-300 group">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${
                    tx.type === 'sell' 
                      ? 'bg-gradient-to-r from-green-500/30 to-emerald-500/30 border border-green-400/30' 
                      : 'bg-gradient-to-r from-blue-500/30 to-cyan-500/30 border border-blue-400/30'
                  }`}>
                    {tx.type === 'sell' ? (
                      <ArrowUpRight className="w-5 h-5 text-green-300" />
                    ) : (
                      <ArrowDownLeft className="w-5 h-5 text-blue-300" />
                    )}
                  </div>
                  
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-white capitalize">{tx.type} Energy</span>
                      <div className={`flex items-center px-2 py-1 rounded-full text-xs border ${getStatusColor(tx.status)}`}>
                        {getStatusIcon(tx.status)}
                        <span className="ml-1 capitalize">{tx.status}</span>
                      </div>
                    </div>
                    <div className="text-sm text-gray-400 flex items-center space-x-2">
                      <span>{formatAddress(tx.counterparty)}</span>
                      {tx.txHash && (
                        <button 
                          onClick={() => window.open(`https://arbiscan.io/tx/${tx.txHash}`, '_blank')}
                          className="text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-xl font-bold text-white">{formatEther(tx.price)} ETH</div>
                  <div className="text-sm text-gray-400">{formatEther(tx.pricePerKwh)} ETH/kWh</div>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1 text-gray-400">
                    <Zap className="w-4 h-4" />
                    <span>{tx.amount.toString()} kWh</span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span>{tx.timestamp.toLocaleString()}</span>
                  </div>
                </div>
                
                {tx.blockNumber && (
                  <div className="text-gray-500 text-xs">
                    Block #{tx.blockNumber}
                  </div>
                )}
              </div>
              
              {tx.gasUsed && (
                <div className="mt-2 pt-2 border-t border-white/10">
                  <div className="text-xs text-gray-500">
                    Gas Used: {tx.gasUsed}
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}
