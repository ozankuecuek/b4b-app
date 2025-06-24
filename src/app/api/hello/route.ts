import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ 
    message: "Hello World",
    timestamp: new Date().toISOString(),
    method: "GET"
  });
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  
  return NextResponse.json({ 
    message: "Hello World",
    timestamp: new Date().toISOString(),
    method: "POST",
    receivedData: body
  });
} 