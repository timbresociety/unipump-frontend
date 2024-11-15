import { ApolloClient, InMemoryCache } from "@apollo/client";
import dayjs, { ManipulateType } from "dayjs";
import utc from "dayjs/plugin/utc";
import weekOfYear from "dayjs/plugin/weekOfYear";
import gql from "graphql-tag";

import { getBlocksFromTimestamps } from "@/lib/getBlocksTimestamp";

export const TimeWindow: {
  [key: string]: ManipulateType;
} = {
  DAY: "day",
  WEEK: "week",
  MONTH: "month",
};

const mantleClient = new ApolloClient({
  uri: "https://drop.vivek.ink",
  cache: new InMemoryCache(),
});

const mantleBlocksClient = new ApolloClient({
  uri: "https://drop.vivek.ink",
  cache: new InMemoryCache(),
});

export const ONE_HOUR_SECONDS = 3600;
const DEFAULT_TIME_WINDOW = TimeWindow.WEEK;

const utcCurrentTime = dayjs();

// export const startTimestamp = 1708271225;
export const startTimestamp = utcCurrentTime
  .subtract(1, DEFAULT_TIME_WINDOW)
  .startOf("hour")
  .unix();

// format dayjs with the libraries that we need
dayjs.extend(utc);
dayjs.extend(weekOfYear);

export const PRICES_BY_BLOCK = (tokenAddress: string, blocks: any) => {
  let queryString = "query blocks {";
  queryString += blocks.map(
    (block: any) => `
      t${block.timestamp}:token(id:"${tokenAddress}", block: { number: ${block.number} }, subgraphError: allow) {
        derivedETH
      }
    `
  );
  queryString += ",";
  queryString += blocks.map(
    (block: any) => `
      b${block.timestamp}: bundle(id:"1", block: { number: ${block.number} }, subgraphError: allow) {
        ethPriceUSD
      }
    `
  );

  queryString += "}";
  return gql(queryString);
};

const PRICE_CHART = gql`
  query tokenHourDatas($startTime: Int!, $skip: Int!, $address: Bytes!) {
    tokenHourDatas(
      first: 500
      skip: $skip
      where: { token: $address, periodStartUnix_gt: $startTime }
      orderBy: periodStartUnix
      orderDirection: asc
    ) {
      periodStartUnix
      high
      low
      open
      close
    }
  }
`;

interface PriceResults {
  tokenHourDatas: {
    periodStartUnix: number;
    high: string;
    low: string;
    open: string;
    close: string;
  }[];
}

export type PriceChartEntry = {
  time: number; // unix timestamp
  open: number;
  close: number;
  high: number;
  low: number;
};

export async function fetchTokenPriceData(
  address: string,
  startTimestamp: number,
  endTimestamp: number,
  resolution: string
): Promise<{
  data: PriceChartEntry[];
  error: boolean;
}> {
  const SECONDS_IN_MIN = 60;
  const ResolutionsToInterval: Record<string, number> = {
    "1": SECONDS_IN_MIN,
    "5": SECONDS_IN_MIN * 5,
    "15": SECONDS_IN_MIN * 15,
    "30": SECONDS_IN_MIN * 30,
    "60": SECONDS_IN_MIN * 60,
    "1D": SECONDS_IN_MIN * 60 * 24,
    "1W": SECONDS_IN_MIN * 60 * 24 * 7,
    "1M": SECONDS_IN_MIN * 60 * 24 * 30,
  };
  const interval = ResolutionsToInterval[resolution];
  // start and end bounds
  const dataClient = mantleClient;
  const blockClient = mantleBlocksClient;
  try {
    // const endTimestamp = dayjs.utc().unix();
    if (!startTimestamp) {
      return {
        data: [],
        error: false,
      };
    }

    // create an array of hour start times until we reach current hour
    const timestamps = [];
    let time = startTimestamp;

    while (time <= endTimestamp) {
      timestamps.push(time);
      time += interval;
    }

    // backout if invalid timestamp format
    if (timestamps.length === 0) {
      return {
        data: [],
        error: false,
      };
    }

    // fetch blocks based on timestamp
    const blocks = await getBlocksFromTimestamps(timestamps, blockClient, 500);

    if (!blocks || blocks.length === 0) {
      return {
        data: [],
        error: false,
      };
    }

    let data: {
      periodStartUnix: number;
      high: string;
      low: string;
      open: string;
      close: string;
    }[] = [];
    let skip = 0;
    let allFound = false;

    while (!allFound) {
      const {
        data: priceData,
        errors,
        loading,
      } = await dataClient.query<PriceResults>({
        query: PRICE_CHART,
        variables: {
          address: address.toLowerCase(),
          startTime: startTimestamp,
          skip,
        },
        fetchPolicy: "no-cache",
      });
      if (!loading) {
        skip += 500;
        if ((priceData && priceData.tokenHourDatas.length < 500) || errors) {
          allFound = true;
        }
        if (priceData) {
          data = data.concat(priceData.tokenHourDatas);
        }
      }
    }

    const formattedHistory = data.map((d) => {
      return {
        time: d.periodStartUnix,
        open: parseFloat(d.open),
        close: parseFloat(d.close),
        high: parseFloat(d.high),
        low: parseFloat(d.low),
      };
    });

    return {
      data: formattedHistory,
      error: false,
    };
  } catch (e) {
    return {
      data: [],
      error: true,
    };
  }
}
