import { gql } from "@apollo/client";

export const GET_NGON_NGU_TRUNG = gql`
  query MyQuery {
    allNgNNgTrung {
      nodes {
        nganhNgonNguTrung {
          tieuDe
          ngonNguTrung {
            list1 {
              title
              content {
                text
              }
            }
            list2 {
              title
              content {
                text
              }
            }
          }
          tuyenSinh {
            header {
              title
              text
            }
            label1 {
              child {
                title
                text
              }
            }
            label2 {
              image {
                node {
                  mediaItemUrl
                }
              }
            }
          }
        }
        seo {
          fullHead
        }
      }
    }
  }
`;
