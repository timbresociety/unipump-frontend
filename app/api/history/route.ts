import { fetchTokenPriceData } from "@/lib/fetchPriceData";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const resolution = searchParams.get("resolution");
  const symbol = searchParams.get("symbol");

  if (!from || !to || !resolution || !symbol) {
    return new Response(`Pass from`, {
      status: 400,
    });
  }

  const tokenAddress = "0xcda86a272531e8640cd7f1a92c01839911b90bb0";

  if (!tokenAddress) {
    return new Response(`Invalid symbol`, {
      status: 400,
    });
  }

  const { data } = await fetchTokenPriceData(
    tokenAddress,
    parseInt(from),
    parseInt(to),
    resolution
  );

  let status = "ok";
  if (data.length === 0) {
    status = "no_data";
  }

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
