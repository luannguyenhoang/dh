import { gql } from "@apollo/client";

export const GET_DIEN_TU_VIEN_THONG = gql`
query MyQuery {
  allINTViNThNg {
    nodes {
      dienTuVienThong {
        tieuDe
        nganhHocDtvt {
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
      }
      seo {
        fullHead
      }
    }
  }
}
`;
