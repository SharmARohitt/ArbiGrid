import { NextRequest, NextResponse } from 'next/server'

// In-memory storage for demo purposes
let transactions = [
  {
    id: '1',
    type: 'sell',
    user: '0x1234567890123456789012345678901234567890',
    counterparty: '0x2345678901234567890123456789012345678901',
    amount: 100,
    price: 5.0,
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    status: 'completed',
    txHash: '0xabcd1234...'
  }
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const userAddress = searchParams.get('address')

  if (!userAddress) {
    return NextResponse.json({ error: 'Address required' }, { status: 400 })
  }

  const userTransactions = transactions.filter(
    tx => tx.user.toLowerCase() === userAddress.toLowerCase() || 
         tx.counterparty.toLowerCase() === userAddress.toLowerCase()
  )

  return NextResponse.json({ transactions: userTransactions })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, user, counterparty, amount, price, txHash } = body

    const newTransaction = {
      id: (transactions.length + 1).toString(),
      type,
      user,
      counterparty,
      amount: parseInt(amount),
      price: parseFloat(price),
      timestamp: new Date().toISOString(),
      status: 'pending',
      txHash
    }

    transactions.push(newTransaction)
    
    return NextResponse.json({ 
      success: true, 
      transaction: newTransaction 
    }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to record transaction' 
    }, { status: 500 })
  }
}
