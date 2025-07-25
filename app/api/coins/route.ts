// app/api/coins/route.ts
import { NextResponse } from 'next/server';
import api from '@/app/lib/api';

export const dynamic = 'force-dynamic'; // Bypass Next.js caching
// or set revalidate for timed caching:
// export const revalidate = 300; // 5 minutes

export async function GET() {
  try {
    const res = await api.get("/coins/markets", {
      params: {
        vs_currency: "usd",
        order: "market_cap_desc",
        per_page: 10,
        page: 1,
        sparkline: false,
      },
    });
    return NextResponse.json(res.data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch coins" },
      { status: 500 }
    );
  }
}