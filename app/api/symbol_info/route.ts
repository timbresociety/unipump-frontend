import client from "@/lib/client";
import { GetAllSales } from "@/lib/queries";

export async function GET() {
  const graphData = await client.query({
    query: GetAllSales,
  });

  const data = graphData.data.uniPumpCreatorSaless.items;

  const tokenSymbols = data.map((token: any) => token.symbol);
  const tokenDescriptions = data.map((token: any) => token.bio);

  const symbolInfo = {
    symbol: tokenSymbols,
    description: tokenDescriptions,
    "exchange-listed": "",
    "exchange-traded": "",
    minmovement: 1,
    minmovement2: 0,
    pricescale: [1000],
    "has-dwm": true,
    "has-intraday": false,
    type: ["stock"],
    ticker: tokenSymbols,
    timezone: "America/New_York",
    "session-regular": "0000-2359",
  };

  return Response.json(symbolInfo);
}
