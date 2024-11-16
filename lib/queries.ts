import { gql } from "@apollo/client";

export const GetAllSales = gql`
  query GetAllSales {
    uniPumpCreatorSaless {
      items {
        memeTokenAddress
        name
        bio
        symbol
        createdBy
        isUSDCToken0
        imageUri
        discord
        twitter
      }
    }
  }
`;

export const GetTokenPriceData = (
  tokenAddress: string,
  id_gte: number,
  id_lte: number
) => gql`
  query GetAllSales {
    minBuckets(
      where: {
        tokenAddress: "${tokenAddress}"
        id_gte: ${id_gte}
        id_lte: ${id_lte}
      }
    ) {
      items {
        open
        low
        id
        high
        count
        close
        average
        tokenAddress
      }
    }
  }
`;
