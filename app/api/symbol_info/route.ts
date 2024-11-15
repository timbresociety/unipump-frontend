export async function GET() {
  const symbolInfo = {
    symbol: ['METH'],
    description: ['Mantle staked eth (mETH'],
    'exchange-listed': '',
    'exchange-traded': '',
    minmovement: 1,
    minmovement2: 0,
    pricescale: [1000],
    'has-dwm': true,
    'has-intraday': false,
    type: ['stock'],
    ticker: ['METH'],
    timezone: 'America/New_York',
    'session-regular': '0000-2359',
  };

  return Response.json(symbolInfo);
}
