import { gql } from "@apollo/client";

export const GET_CONG_NGHE_THONG_TIN = gql`
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
      }
      seo {
        fullHead
      }
    }
  }
}
`;
