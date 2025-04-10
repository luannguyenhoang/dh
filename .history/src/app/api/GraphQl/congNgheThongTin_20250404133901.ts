import { gql } from "@apollo/client";

export const GET_FOOTER = gql`
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
        }
      }
    }
  }
`;
