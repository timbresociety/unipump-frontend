import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { gql } from '@urql/core';

export const GET_BLOCKS = (timestamps: string[]) => {
  let queryString = 'query blocks {';
  queryString += timestamps.map((timestamp) => {
    return `t${timestamp}:blocks(first: 1, orderBy: timestamp, orderDirection: desc, where: { timestamp_gt: ${timestamp}, timestamp_lt: ${
      timestamp + 600
    } }) {
        number
      }`;
  });
  queryString += '}';
  return gql(queryString);
};

export async function splitQuery<Type extends object>(
  query: any,
  client: ApolloClient<NormalizedCacheObject>,
  vars: any[],
  values: any[],
  skipCount = 1000
) {
  let fetchedData = {} as Type;
  let allFound = false;
  let skip = 0;
  try {
    while (!allFound) {
      let end = values.length;
      if (skip + skipCount < values.length) {
        end = skip + skipCount;
      }
      const sliced = values.slice(skip, end);
      const result = await client.query<Type>({
        query: query(...vars, sliced),
        fetchPolicy: 'network-only',
      });
      fetchedData = {
        ...fetchedData,
        ...result.data,
      };
      if (
        Object.keys(result.data).length < skipCount ||
        skip + skipCount > values.length
      ) {
        allFound = true;
      } else {
        skip += skipCount;
      }
    }
    return fetchedData;
  } catch (e) {
    return undefined;
  }
}

/**
 * @notice Fetches block objects for an array of timestamps.
 * @dev blocks are returned in chronological order (ASC) regardless of input.
 * @dev blocks are returned at string representations of Int
 * @dev timestamps are returns as they were provided; not the block time.
 * @param {Array} timestamps
 */
export async function getBlocksFromTimestamps(
  timestamps: number[],
  blockClient: ApolloClient<NormalizedCacheObject>,
  skipCount = 500
) {
  if (timestamps?.length === 0) {
    return [];
  }
  const fetchedData: any = await splitQuery(
    GET_BLOCKS,
    blockClient,
    [],
    timestamps,
    skipCount
  );

  const blocks: any[] = [];
  if (fetchedData) {
    for (const t in fetchedData) {
      if (fetchedData[t].length > 0) {
        blocks.push({
          timestamp: t.split('t')[1],
          number: fetchedData[t][0]['number'],
        });
      }
    }
  }
  return blocks;
}
