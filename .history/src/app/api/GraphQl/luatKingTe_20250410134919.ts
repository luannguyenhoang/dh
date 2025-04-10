import { gql } from "@apollo/client";

export const GET_DIEN_TU_VIEN_THONG = gql`
 query MyQuery {
  allLuTKinhT {
    nodes {
      luatKinhTe {
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
        tieuDe
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
