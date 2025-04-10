import { gql } from "@apollo/client";

export const GET_PAGE_ABOUT = gql`
  query MyQuery {
    allGiIThiU {
      nodes {
        giIThiU {
          tenGioiThieu
          title
          description
          anhGioiThieu {
            node {
              mediaItemUrl
            }
          }
          label {
            title
            description
          }
          giaTriCotLoi {
            text1
            text2
          }
          slogan {
            text1
            text2
          }
          label2 {
            title
            description
          }
        }
        seo {
          fullHead
        }
      }
    }
  }
`;
