import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

import { allTokens } from '@/constant/tokens';

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id');

  const COINGECKO_API_KEY = process.env.COINGECKO_API_KEY;

  if (!id) {
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
  }

  const name = allTokens[5000].find(
    (s) => s.address.toLowerCase() === id.toLowerCase()
  )?.coingeckoName;

  if (!name) {
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
  }
  const res = await axios.get(
    `https://pro-api.coingecko.com/api/v3/simple/price?ids=${name}&vs_currencies=usd&x_cg_pro_api_key=${COINGECKO_API_KEY}`
  );

  return NextResponse.json({ price: Number(res.data[name].usd) });
}
