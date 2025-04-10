import { gql } from "@apollo/client";

export const GET_NGON_NGU_ANH = gql`
  query MyQuery {
    allNgNNgAnh {
      nodes {
        nganhNgonNguAnh {
          tieuDe
          ngonNguAnh {
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
