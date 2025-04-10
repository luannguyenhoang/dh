import { gql } from "@apollo/client";

export const GET_CONG_NGHE_THONG_TIN = gql`
 query MyQuery {
  allCNgNghThNgTin {
    nodes {
      cNgNghThNgTin {
        tieuDe
        nganhHocCntt {
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
            label {
              cot {
                text1
                text2
              }
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
    }
  }
}
`;
