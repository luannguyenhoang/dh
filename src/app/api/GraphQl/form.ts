import { gql } from "@apollo/client";

export const GET_FORM = gql`
  query MyQuery {
    allForm {
      nodes {
        formQuery {
          formMain
          formPoup
        }
      }
    }
  }
`;
