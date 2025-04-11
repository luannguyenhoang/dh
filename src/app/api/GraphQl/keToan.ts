import { gql } from "@apollo/client";

export const GET_KE_TOAN = gql`
  query MyQuery {
  allKToN {
    nodes {
      keToan {
        tieuDe
        nganhKeToan {
          title
          label {
            text
          }
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
            label1 {
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
