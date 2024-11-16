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
        discord
        twitter
      }
    }
  }
`;
