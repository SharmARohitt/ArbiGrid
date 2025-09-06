'use client'

import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Zap, Menu } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-gradient-to-r from-slate-900/95 via-purple-900/95 to-slate-900/95 backdrop-blur-lg border-b border-white/10 sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-2 rounded-xl shadow-lg">
              <Zap className="w-7 h-7 text-white" />
            </div>
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                ArbiGrid
              </span>
              <div className="text-xs text-gray-400 -mt-1">Energy Trading Platform</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-300 hover:text-green-400 transition-colors font-medium">
              Dashboard
            </Link>
            <a href="#marketplace" className="text-gray-300 hover:text-blue-400 transition-colors font-medium">
              Marketplace
            </a>
            <a href="#transactions" className="text-gray-300 hover:text-purple-400 transition-colors font-medium">
              Transactions
            </a>
            <Link href="/analytics" className="text-gray-300 hover:text-cyan-400 transition-colors font-medium">
              Analytics
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg blur opacity-30"></div>
              <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg p-1">
                <ConnectButton />
              </div>
            </div>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white transition-colors p-2"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          {/* Connect Wallet Button - Desktop */}
          <div className="hidden md:block">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg blur opacity-30"></div>
              <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg p-1">
                <ConnectButton />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-white/10">
            <div className="flex flex-col space-y-4 pt-4">
              <Link href="/" className="text-gray-300 hover:text-green-400 transition-colors font-medium">
                Dashboard
              </Link>
              <a href="#marketplace" className="text-gray-300 hover:text-blue-400 transition-colors font-medium">
                Marketplace
              </a>
              <a href="#transactions" className="text-gray-300 hover:text-purple-400 transition-colors font-medium">
                Transactions
              </a>
              <Link href="/analytics" className="text-gray-300 hover:text-cyan-400 transition-colors font-medium">
                Analytics
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
