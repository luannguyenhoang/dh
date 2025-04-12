import { gql } from "@apollo/client";

export const GET_HEADER = gql`
  query MyQuery {
    allTrangCh {
      nodes {
        trangCh {
          header {
            phoneNumber
            email
            name
            tag
          }
        }
      }
    }
  }
`;
