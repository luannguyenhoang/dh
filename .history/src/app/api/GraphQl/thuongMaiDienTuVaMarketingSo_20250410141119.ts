import { gql } from "@apollo/client";

export const GET_THUONG_MAI_DIEN_TU_VA_MARKETING_SO = gql`
  query MyQuery {
    allThNgMIINT {
      nodes {
        thuongMaiDienTu {
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
