import client from "@/lib/client";
import { GetAllSales, GetTokenPriceData } from "@/lib/queries";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const resolution = searchParams.get("resolution");
  const symbol = searchParams.get("symbol");

  const salesData = await client.query({
    query: GetAllSales,
  });

  const tokenAddressData = salesData.data.uniPumpCreatorSaless.items.find(
    (s: any) => s.symbol.toLowerCase() === symbol?.toLowerCase()
  );

  const tokenAddress = tokenAddressData.memeTokenAddress;

  if (!from || !to || !resolution || !symbol) {
    return new Response(`Pass from`, {
      status: 400,
    });
  }

  if (!tokenAddress) {
    return new Response(`Invalid symbol`, {
      status: 400,
    });
  }

  let graphData: any;
  try {
    graphData = await client.query({
      query: GetTokenPriceData(tokenAddress, parseInt(from), parseInt(to)),
    });
  } catch (error) {
    console.log("erroro", error);
  }

  const data = graphData.data.minBuckets.items;

  let status = "ok";
  if (data.length === 0) {
    status = "no_data";
  }

  console.log(data, "data");

  const t = [];
  const o = [];
  const h = [];
  const l = [];
  const c = [];

  for (const _data of data) {
    t.push(_data.time);
    o.push(_data.open);
    h.push(_data.high);
    l.push(_data.low);
    c.push(_data.close);
  }

  const barsRes = {
    t: t,
    o: o,
    h: h,
    l: l,
    c: c,
    s: status,
  };

  return Response.json(barsRes);
}
