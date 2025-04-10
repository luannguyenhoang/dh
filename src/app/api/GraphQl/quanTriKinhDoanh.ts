import { gql } from "@apollo/client";

export const GET_QUAN_TRI_KINH_DOANH = gql`
  query MyQuery {
    allQuNTrKinhDoanh {
      nodes {
        quNTrKinhDoanh {
          tieuDe
          nganhHocQtkd {
            title
            tongQuan {
              title
              label {
                text
              }
            }
            ngheNghiep {
              title
              label {
                text
              }
            }
            chuongTrinhVaThoiGianDaoTao {
              title
              label {
                text1
                text2
              }
              label2 {
                text1
                text2
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
                  id
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
