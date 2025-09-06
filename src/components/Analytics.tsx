'use client'

import { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'
import { Header } from './Header'
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  PieChart, 
  Activity, 
  Zap, 
  DollarSign, 
  Users, 
  Globe, 
  Leaf,
  ArrowUpRight,
  ArrowDownLeft,
  Clock,
  Target,
  Award,
  Layers,
  Cpu,
  Shield
} from 'lucide-react'

interface AnalyticsData {
  personalStats: {
    totalEnergyTraded: number
    totalRevenue: number
    totalSpent: number
    averagePrice: number
    successRate: number
    carbonSaved: number
  }
  marketData: {
    totalVolume24h: number
    priceChange24h: number
    activeUsers: number
    totalTransactions: number
    averageTransactionSize: number
    peakHours: string
  }
  arbitrumStats: {
    blockTime: string
    gasPrice: string
    tps: number
    totalBlocks: number
    networkFee: string
    uptime: string
  }
  priceHistory: Array<{ time: string; price: number; volume: number }>
  energyDistribution: Array<{ source: string; percentage: number; color: string }>
}

export function Analytics() {
  const { address, isConnected } = useAccount()
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d' | '1y'>('7d')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading analytics data
    setTimeout(() => {
      setData({
        personalStats: {
          totalEnergyTraded: 1247.5,
          totalRevenue: 4856.32,
          totalSpent: 2234.50,
          averagePrice: 0.047,
          successRate: 98.7,
          carbonSaved: 2.4
        },
        marketData: {
          totalVolume24h: 125600,
          priceChange24h: 5.2,
          activeUsers: 2847,
          totalTransactions: 15642,
          averageTransactionSize: 87.5,
          peakHours: "14:00 - 16:00 UTC"
        },
        arbitrumStats: {
          blockTime: "0.25s",
          gasPrice: "0.1 gwei",
          tps: 4000,
          totalBlocks: 125847692,
          networkFee: "$0.02",
          uptime: "99.98%"
        },
        priceHistory: [
          { time: "00:00", price: 0.045, volume: 1250 },
          { time: "04:00", price: 0.042, volume: 980 },
          { time: "08:00", price: 0.048, volume: 1680 },
          { time: "12:00", price: 0.052, volume: 2100 },
          { time: "16:00", price: 0.049, volume: 1890 },
          { time: "20:00", price: 0.046, volume: 1420 },
          { time: "24:00", price: 0.047, volume: 1560 }
        ],
        energyDistribution: [
          { source: "Solar", percentage: 45, color: "#FFA500" },
          { source: "Wind", percentage: 35, color: "#00CED1" },
          { source: "Hydro", percentage: 15, color: "#4169E1" },
          { source: "Other", percentage: 5, color: "#32CD32" }
        ]
      })
      setLoading(false)
    }, 1500)
  }, [timeRange])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <Header />
        <div className="container mx-auto p-6">
          <div className="text-center py-20">
            <div className="inline-flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-blue-500/30 rounded-full animate-pulse"></div>
              <div className="w-32 h-8 bg-blue-500/30 rounded animate-pulse"></div>
            </div>
            <div className="w-64 h-4 bg-gray-600/30 rounded mx-auto animate-pulse"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!data) return null

  const StatCard = ({ 
    title, 
    value, 
    change, 
    icon: Icon, 
    color = "blue",
    subtitle 
  }: {
    title: string
    value: string | number
    change?: number
    icon: any
    color?: "blue" | "green" | "purple" | "orange" | "red"
    subtitle?: string
  }) => {
    const colorClasses = {
      blue: "from-blue-500 to-cyan-600",
      green: "from-green-500 to-emerald-600",
      purple: "from-purple-500 to-violet-600",
      orange: "from-orange-500 to-red-600",
      red: "from-red-500 to-pink-600"
    }

    return (
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all duration-300">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-lg bg-gradient-to-r ${colorClasses[color]}`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
          {change !== undefined && (
            <div className={`flex items-center space-x-1 text-sm ${
              change >= 0 ? 'text-green-400' : 'text-red-400'
            }`}>
              {change >= 0 ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownLeft className="h-4 w-4" />}
              <span>{Math.abs(change).toFixed(1)}%</span>
            </div>
          )}
        </div>
        <div className="space-y-1">
          <p className="text-2xl font-bold text-white">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </p>
          <p className="text-sm text-gray-300">{title}</p>
          {subtitle && <p className="text-xs text-gray-400">{subtitle}</p>}
        </div>
      </div>
    )
  }

  const SimpleChart = ({ data: chartData, height = 200 }: { data: any[], height?: number }) => {
    const maxPrice = Math.max(...chartData.map(d => d.price))
    const minPrice = Math.min(...chartData.map(d => d.price))
    const priceRange = maxPrice - minPrice

    return (
      <div className="relative" style={{ height }}>
        <svg width="100%" height="100%" className="overflow-visible">
          <defs>
            <linearGradient id="priceGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8"/>
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.1"/>
            </linearGradient>
          </defs>
          
          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((y, i) => (
            <line
              key={i}
              x1="0"
              y1={y * height}
              x2="100%"
              y2={y * height}
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="1"
            />
          ))}
          
          {/* Price line */}
          <polyline
            fill="none"
            stroke="#3B82F6"
            strokeWidth="3"
            points={chartData.map((d, i) => 
              `${(i / (chartData.length - 1)) * 100}%,${height - ((d.price - minPrice) / priceRange) * height}`
            ).join(' ')}
          />
          
          {/* Area fill */}
          <polygon
            fill="url(#priceGradient)"
            points={[
              `0,${height}`,
              ...chartData.map((d, i) => 
                `${(i / (chartData.length - 1)) * 100}%,${height - ((d.price - minPrice) / priceRange) * height}`
              ),
              `100%,${height}`
            ].join(' ')}
          />
          
          {/* Data points */}
          {chartData.map((d, i) => (
            <circle
              key={i}
              cx={`${(i / (chartData.length - 1)) * 100}%`}
              cy={height - ((d.price - minPrice) / priceRange) * height}
              r="4"
              fill="#3B82F6"
              stroke="white"
              strokeWidth="2"
            />
          ))}
        </svg>
        
        {/* X-axis labels */}
        <div className="flex justify-between mt-2 text-xs text-gray-400">
          {chartData.map((d, i) => (
            <span key={i}>{d.time}</span>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Analytics Dashboard
              </h1>
              <p className="text-gray-400">Comprehensive energy trading insights and Arbitrum network statistics</p>
            </div>
          </div>

          {/* Time Range Selector */}
          <div className="flex space-x-2">
            {(['24h', '7d', '30d', '1y'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  timeRange === range
                    ? 'bg-blue-500/30 text-blue-300 border border-blue-400/30'
                    : 'bg-white/10 text-gray-400 hover:bg-white/20'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {isConnected && (
          <>
            {/* Personal Stats */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Target className="w-6 h-6 mr-3 text-green-400" />
                Your Trading Performance
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard
                  title="Total Energy Traded"
                  value={`${data.personalStats.totalEnergyTraded} kWh`}
                  change={12.5}
                  icon={Zap}
                  color="green"
                />
                <StatCard
                  title="Total Revenue"
                  value={`$${data.personalStats.totalRevenue.toFixed(2)}`}
                  change={8.3}
                  icon={TrendingUp}
                  color="blue"
                />
                <StatCard
                  title="Average Price"
                  value={`${data.personalStats.averagePrice} ETH/kWh`}
                  change={-2.1}
                  icon={DollarSign}
                  color="purple"
                />
                <StatCard
                  title="Success Rate"
                  value={`${data.personalStats.successRate}%`}
                  icon={Award}
                  color="green"
                  subtitle="Transaction completion rate"
                />
                <StatCard
                  title="Carbon Footprint Saved"
                  value={`${data.personalStats.carbonSaved} tons CO₂`}
                  change={15.7}
                  icon={Leaf}
                  color="green"
                />
                <StatCard
                  title="Net Profit"
                  value={`$${(data.personalStats.totalRevenue - data.personalStats.totalSpent).toFixed(2)}`}
                  change={22.4}
                  icon={TrendingUp}
                  color="blue"
                />
              </div>
            </div>
          </>
        )}

        {/* Market Analytics */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Globe className="w-6 h-6 mr-3 text-blue-400" />
            Market Overview
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Price Chart */}
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">Energy Price Trends</h3>
                <div className="text-sm text-gray-400">Last 24 hours</div>
              </div>
              <SimpleChart data={data.priceHistory} />
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-400">Current Price</div>
                  <div className="text-xl font-bold text-white">0.047 ETH/kWh</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">24h Change</div>
                  <div className="text-xl font-bold text-green-400">+5.2%</div>
                </div>
              </div>
            </div>

            {/* Energy Sources Distribution */}
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-6">Energy Sources</h3>
              <div className="space-y-4">
                {data.energyDistribution.map((source, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: source.color }}
                      ></div>
                      <span className="text-white">{source.source}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-700 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full transition-all duration-500"
                          style={{ 
                            backgroundColor: source.color,
                            width: `${source.percentage}%`
                          }}
                        ></div>
                      </div>
                      <span className="text-white font-medium w-12 text-right">{source.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-green-500/20 border border-green-400/30 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Leaf className="w-5 h-5 text-green-400" />
                  <span className="text-green-300 font-medium">95% Renewable Energy</span>
                </div>
                <p className="text-green-200 text-sm mt-1">
                  ArbiGrid promotes sustainable energy trading with focus on renewable sources.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Market Stats */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Activity className="w-6 h-6 mr-3 text-purple-400" />
            Market Statistics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <StatCard
              title="24h Trading Volume"
              value={`${data.marketData.totalVolume24h.toLocaleString()} kWh`}
              change={data.marketData.priceChange24h}
              icon={BarChart3}
              color="blue"
            />
            <StatCard
              title="Active Users"
              value={data.marketData.activeUsers}
              change={7.8}
              icon={Users}
              color="green"
            />
            <StatCard
              title="Total Transactions"
              value={data.marketData.totalTransactions}
              change={12.3}
              icon={Activity}
              color="purple"
            />
            <StatCard
              title="Average Transaction"
              value={`${data.marketData.averageTransactionSize} kWh`}
              change={-1.2}
              icon={Target}
              color="orange"
            />
            <StatCard
              title="Peak Trading Hours"
              value={data.marketData.peakHours}
              icon={Clock}
              color="blue"
              subtitle="Highest activity period"
            />
            <StatCard
              title="Market Efficiency"
              value="97.8%"
              change={0.5}
              icon={Award}
              color="green"
              subtitle="Order fulfillment rate"
            />
          </div>
        </div>

        {/* Arbitrum Network Stats */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Layers className="w-6 h-6 mr-3 text-cyan-400" />
            Arbitrum Network Performance
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <StatCard
              title="Block Time"
              value={data.arbitrumStats.blockTime}
              icon={Cpu}
              color="blue"
              subtitle="Average block confirmation"
            />
            <StatCard
              title="Gas Price"
              value={data.arbitrumStats.gasPrice}
              change={-15.3}
              icon={DollarSign}
              color="green"
              subtitle="Current network fee"
            />
            <StatCard
              title="Transactions Per Second"
              value={data.arbitrumStats.tps}
              change={8.7}
              icon={Activity}
              color="purple"
            />
            <StatCard
              title="Network Uptime"
              value={data.arbitrumStats.uptime}
              icon={Shield}
              color="green"
              subtitle="Last 30 days"
            />
            <StatCard
              title="Average Transaction Fee"
              value={data.arbitrumStats.networkFee}
              change={-22.1}
              icon={DollarSign}
              color="green"
              subtitle="USD equivalent"
            />
            <StatCard
              title="Total Blocks"
              value={data.arbitrumStats.totalBlocks.toLocaleString()}
              icon={Layers}
              color="blue"
              subtitle="Since genesis"
            />
          </div>
        </div>

        {/* Why Arbitrum Section */}
        <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-lg border border-blue-400/30 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Shield className="w-6 h-6 mr-3 text-blue-400" />
            Why ArbiGrid Uses Arbitrum
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Technical Advantages</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong className="text-white">Ultra-Low Fees:</strong> 95% cheaper than Ethereum mainnet</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong className="text-white">Lightning Fast:</strong> 250ms block times for instant settlements</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong className="text-white">High Throughput:</strong> 4,000+ TPS capacity</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong className="text-white">EVM Compatible:</strong> Full Ethereum ecosystem support</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Perfect for Energy Trading</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong className="text-white">Micro-transactions:</strong> Cost-effective for small energy trades</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong className="text-white">Real-time Settlement:</strong> Instant energy delivery confirmation</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong className="text-white">Scalable:</strong> Handles thousands of concurrent trades</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong className="text-white">Energy Efficient:</strong> Lower carbon footprint than PoW chains</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
