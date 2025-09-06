'use client'

import { 
  Zap, 
  Sun, 
  Wind, 
  Globe, 
  Shield, 
  TrendingUp, 
  Leaf, 
  ArrowRight,
  Sparkles,
  Users,
  DollarSign
} from 'lucide-react'

export function Hero() {
  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-blue-500/10 to-purple-500/10"></div>
      <div className="absolute top-20 left-20 w-72 h-72 bg-green-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto text-center relative z-10">
        <div className="mb-8">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="text-white text-sm font-medium">Powered by Arbitrum Blockchain</span>
          </div>
          
          <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 leading-tight">
            The Future of
            <span className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent block">
              Energy Trading
            </span>
            <span className="text-3xl md:text-5xl text-gray-300">is Decentralized</span>
          </h1>
        </div>
        
        <div className="max-w-4xl mx-auto mb-12">
          <p className="text-xl md:text-2xl text-gray-300 mb-6 leading-relaxed">
            <strong className="text-white">Revolutionizing Energy Markets</strong> with blockchain technology. 
            Trade excess renewable energy directly with peers, eliminate intermediaries, and contribute to a sustainable future.
          </p>
          
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center justify-center">
              <Globe className="w-6 h-6 mr-3 text-green-400" />
              Why ArbiGrid Matters for Our Planet
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300">
                    <strong className="text-white">Climate Crisis Solution:</strong> Traditional energy grids waste 30% of electricity during transmission. P2P trading eliminates these losses, directly reducing carbon emissions.
                  </p>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300">
                    <strong className="text-white">Energy Democracy:</strong> Break free from centralized utility monopolies. Every solar panel owner becomes an energy entrepreneur, creating a truly democratic energy ecosystem.
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300">
                    <strong className="text-white">Blockchain Innovation:</strong> Smart contracts ensure instant, transparent settlements. No banks, no delays, no hidden fees - just pure peer-to-peer energy commerce.
                  </p>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300">
                    <strong className="text-white">Economic Empowerment:</strong> Transform your renewable energy system from an expense into a revenue stream. Earn passive income while fighting climate change.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-lg border border-white/20 rounded-2xl p-6 mb-8">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center justify-center">
              <Leaf className="w-5 h-5 mr-2 text-green-400" />
              How Blockchain Transforms Energy Markets
            </h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <Shield className="w-8 h-8 mx-auto mb-2 text-blue-400" />
                <div className="text-white font-medium">Trust & Security</div>
                <div className="text-gray-400">Immutable smart contracts eliminate fraud and ensure fair trading</div>
              </div>
              <div className="text-center">
                <TrendingUp className="w-8 h-8 mx-auto mb-2 text-green-400" />
                <div className="text-white font-medium">Real-time Pricing</div>
                <div className="text-gray-400">Dynamic pricing based on supply, demand, and renewable availability</div>
              </div>
              <div className="text-center">
                <Globe className="w-8 h-8 mx-auto mb-2 text-purple-400" />
                <div className="text-white font-medium">Global Access</div>
                <div className="text-gray-400">Borderless energy trading powered by Arbitrum&apos;s low fees</div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Icons */}
        <div className="flex justify-center items-center space-x-8 md:space-x-12 mb-12">
          <div className="flex flex-col items-center group">
            <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-4 rounded-2xl mb-3 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <Sun className="w-8 h-8 text-white" />
            </div>
            <span className="text-sm text-gray-300 font-medium">Solar Power</span>
            <span className="text-xs text-gray-500">92% Efficiency</span>
          </div>
          
          <div className="flex flex-col items-center group">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-4 rounded-2xl mb-3 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <Wind className="w-8 h-8 text-white" />
            </div>
            <span className="text-sm text-gray-300 font-medium">Wind Energy</span>
            <span className="text-xs text-gray-500">24/7 Trading</span>
          </div>
          
          <div className="flex flex-col items-center group">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-4 rounded-2xl mb-3 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <span className="text-sm text-gray-300 font-medium">Smart Grid</span>
            <span className="text-xs text-gray-500">AI Optimized</span>
          </div>
        </div>

        {/* Live Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all duration-300">
            <div className="flex items-center justify-center mb-2">
              <Users className="w-5 h-5 text-green-400 mr-2" />
              <div className="text-3xl font-bold text-white">2,847</div>
            </div>
            <div className="text-sm text-gray-400">Active Traders</div>
            <div className="text-xs text-green-400">+12% this week</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all duration-300">
            <div className="flex items-center justify-center mb-2">
              <Zap className="w-5 h-5 text-blue-400 mr-2" />
              <div className="text-3xl font-bold text-white">156k</div>
            </div>
            <div className="text-sm text-gray-400">kWh Traded</div>
            <div className="text-xs text-blue-400">Real-time</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all duration-300">
            <div className="flex items-center justify-center mb-2">
              <DollarSign className="w-5 h-5 text-purple-400 mr-2" />
              <div className="text-3xl font-bold text-white">$892k</div>
            </div>
            <div className="text-sm text-gray-400">Total Volume</div>
            <div className="text-xs text-purple-400">24h volume</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all duration-300">
            <div className="flex items-center justify-center mb-2">
              <Leaf className="w-5 h-5 text-green-400 mr-2" />
              <div className="text-3xl font-bold text-white">98.7%</div>
            </div>
            <div className="text-sm text-gray-400">Renewable</div>
            <div className="text-xs text-green-400">Clean energy</div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <p className="text-gray-300 mb-6 text-lg">
            Join the energy revolution. Connect your wallet and start trading clean energy today.
          </p>
          <div className="flex items-center justify-center text-sm text-gray-400">
            <span>Scroll down to connect</span>
            <ArrowRight className="w-4 h-4 ml-2 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  )
}
