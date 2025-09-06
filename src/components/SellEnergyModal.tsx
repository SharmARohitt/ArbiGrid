'use client'

import { useState } from 'react'
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { parseEther } from '@/lib/utils'
import { CONTRACT_ADDRESSES, ARBIGRID_ABI } from '@/lib/wagmi'
import { useChainId } from 'wagmi'
import { 
  X, 
  Zap, 
  DollarSign, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  Loader2,
  TrendingUp,
  Battery,
  Calculator
} from 'lucide-react'

interface SellEnergyModalProps {
  onClose: () => void
}

export function SellEnergyModal({ onClose }: SellEnergyModalProps) {
  const chainId = useChainId()
  const [formData, setFormData] = useState({
    kwh: '',
    pricePerKwh: '',
    duration: '3600' // Default 1 hour
  })
  const [errors, setErrors] = useState<{[key: string]: string}>({})

  const { writeContract, data: hash, isPending, error } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {}
    
    if (!formData.kwh || parseFloat(formData.kwh) <= 0) {
      newErrors.kwh = 'Energy amount must be greater than 0'
    }
    
    if (!formData.pricePerKwh || parseFloat(formData.pricePerKwh) <= 0) {
      newErrors.pricePerKwh = 'Price must be greater than 0'
    } else if (parseFloat(formData.pricePerKwh) > 1) {
      newErrors.pricePerKwh = 'Price seems too high. Please verify.'
    }
    
    if (!formData.duration) {
      newErrors.duration = 'Please select a duration'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    const contractAddress = CONTRACT_ADDRESSES[chainId as keyof typeof CONTRACT_ADDRESSES]
    if (!contractAddress || contractAddress === '0x0000000000000000000000000000000000000000') {
      setErrors({ general: 'Contract not deployed on this network. Please switch to Arbitrum.' })
      return
    }

    try {
      await writeContract({
        address: contractAddress as `0x${string}`,
        abi: ARBIGRID_ABI,
        functionName: 'createSale',
        args: [
          BigInt(formData.kwh),
          parseEther(formData.pricePerKwh),
          BigInt(formData.duration)
        ],
      })
    } catch (error: any) {
      console.error('Error creating sale:', error)
      setErrors({ general: error?.shortMessage || 'Failed to create energy listing. Please try again.' })
    }
  }

  const getDurationLabel = (seconds: string) => {
    const sec = parseInt(seconds)
    if (sec < 3600) return `${sec / 60} minutes`
    if (sec < 86400) return `${sec / 3600} hour${sec > 3600 ? 's' : ''}`
    return `${sec / 86400} day${sec > 86400 ? 's' : ''}`
  }

  const calculateTotal = () => {
    if (!formData.kwh || !formData.pricePerKwh) return 0
    return parseFloat(formData.kwh) * parseFloat(formData.pricePerKwh)
  }

  const calculateEstimatedFee = () => {
    const total = calculateTotal()
    return total * 0.025 // 2.5% platform fee
  }

  const calculateNetEarnings = () => {
    return calculateTotal() - calculateEstimatedFee()
  }

  if (isSuccess) {
    return (
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-gradient-to-br from-slate-900 to-purple-900 border border-white/20 rounded-2xl p-8 max-w-md w-full">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">Energy Listed Successfully!</h2>
            <p className="text-gray-300 mb-6">
              Your energy is now available for purchase on the marketplace. 
              Buyers can see your listing immediately.
            </p>
            <div className="bg-white/10 rounded-lg p-4 mb-6">
              <div className="text-sm text-gray-300 mb-1">Transaction Hash</div>
              <div className="text-xs font-mono text-green-400 break-all">
                {hash}
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300 font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-slate-900 to-purple-900 border border-white/20 rounded-2xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg">
              <Battery className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">Sell Your Energy</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-1"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {errors.general && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-400/30 rounded-lg flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 text-red-400" />
            <span className="text-red-300">{errors.general}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Energy Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <Zap className="w-4 h-4 inline mr-2" />
              Energy Amount (kWh)
            </label>
            <input
              type="number"
              value={formData.kwh}
              onChange={(e) => setFormData({ ...formData, kwh: e.target.value })}
              className="w-full p-4 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-white placeholder-gray-400"
              placeholder="Enter energy amount (e.g., 100)"
              min="1"
              step="0.1"
              required
            />
            {errors.kwh && (
              <p className="mt-1 text-sm text-red-400 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.kwh}
              </p>
            )}
          </div>

          {/* Price per kWh */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <DollarSign className="w-4 h-4 inline mr-2" />
              Price per kWh (ETH)
            </label>
            <input
              type="number"
              value={formData.pricePerKwh}
              onChange={(e) => setFormData({ ...formData, pricePerKwh: e.target.value })}
              className="w-full p-4 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-white placeholder-gray-400"
              placeholder="Enter price (e.g., 0.05)"
              min="0"
              step="0.001"
              required
            />
            {errors.pricePerKwh && (
              <p className="mt-1 text-sm text-red-400 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.pricePerKwh}
              </p>
            )}
            <p className="mt-1 text-xs text-gray-400">
              Average market price: 0.045 - 0.055 ETH/kWh
            </p>
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <Clock className="w-4 h-4 inline mr-2" />
              Availability Duration
            </label>
            <select
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              className="w-full p-4 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-white"
              required
            >
              <option value="1800">30 minutes</option>
              <option value="3600">1 hour</option>
              <option value="7200">2 hours</option>
              <option value="21600">6 hours</option>
              <option value="43200">12 hours</option>
              <option value="86400">24 hours</option>
            </select>
            {errors.duration && (
              <p className="mt-1 text-sm text-red-400 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.duration}
              </p>
            )}
          </div>

          {/* Calculation Summary */}
          {formData.kwh && formData.pricePerKwh && (
            <div className="bg-white/10 border border-white/20 rounded-lg p-6 space-y-4">
              <div className="flex items-center space-x-2 text-gray-300 mb-3">
                <Calculator className="w-5 h-5" />
                <span className="font-medium">Transaction Summary</span>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Energy Amount:</span>
                  <span className="text-white font-medium">{formData.kwh} kWh</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Price per kWh:</span>
                  <span className="text-white font-medium">{formData.pricePerKwh} ETH</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Duration:</span>
                  <span className="text-white font-medium">{getDurationLabel(formData.duration)}</span>
                </div>
                <div className="border-t border-white/20 pt-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Gross Total:</span>
                    <span className="text-white font-medium">{calculateTotal().toFixed(4)} ETH</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Platform Fee (2.5%):</span>
                    <span className="text-gray-400">-{calculateEstimatedFee().toFixed(4)} ETH</span>
                  </div>
                  <div className="flex justify-between border-t border-white/20 pt-2 mt-2">
                    <span className="text-gray-300 font-medium">Net Earnings:</span>
                    <span className="text-green-400 font-bold text-lg">{calculateNetEarnings().toFixed(4)} ETH</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isPending || isConfirming || !formData.kwh || !formData.pricePerKwh}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-semibold flex items-center justify-center space-x-2"
          >
            {isPending || isConfirming ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>{isPending ? 'Confirming Transaction...' : 'Processing on Blockchain...'}</span>
              </>
            ) : (
              <>
                <TrendingUp className="w-5 h-5" />
                <span>List Energy for Sale</span>
              </>
            )}
          </button>

          <p className="text-xs text-gray-400 text-center">
            By listing your energy, you agree to our terms of service. 
            Transaction fees will be deducted from your earnings.
          </p>
        </form>
      </div>
    </div>
  )
}
