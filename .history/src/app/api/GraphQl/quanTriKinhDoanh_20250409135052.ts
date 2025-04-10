import { gql } from "@apollo/client";

export const GET_QUAN_TRI = gql`
query MyQuery {
  allCNgNghThNgTin {
    nodes {
      cNgNghThNgTin {
        tieuDe
        nganhHocCntt {
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
            label1 {
              cot {
                text1
                text2
              }
            }
            label2 {
              cot {
                text1
                text2
              }
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
