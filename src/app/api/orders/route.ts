import { NextRequest, NextResponse } from 'next/server'

// In a real implementation, you would connect to your database
// For demo purposes, we'll use in-memory storage
let orders = [
  {
    id: 1,
    seller: '0x1234567890123456789012345678901234567890',
    kwh: 100,
    pricePerKwh: 0.05,
    totalPrice: 5.0,
    duration: 3600,
    active: true,
    timestamp: new Date().toISOString()
  }
]

export async function GET() {
  return NextResponse.json({ orders })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { seller, kwh, pricePerKwh, duration } = body

    const newOrder = {
      id: orders.length + 1,
      seller,
      kwh: parseInt(kwh),
      pricePerKwh: parseFloat(pricePerKwh),
      totalPrice: parseInt(kwh) * parseFloat(pricePerKwh),
      duration: parseInt(duration),
      active: true,
      timestamp: new Date().toISOString()
    }

    orders.push(newOrder)
    
    return NextResponse.json({ 
      success: true, 
      order: newOrder 
    }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to create order' 
    }, { status: 500 })
  }
}
