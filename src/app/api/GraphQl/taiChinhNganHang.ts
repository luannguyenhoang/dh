import { gql } from "@apollo/client";

export const GET_TAI_CHINH_NGAN_HANG = gql`
  query MyQuery {
    allTIChNhNgNHNg {
      nodes {
        taiChinhNganHang {
          tieuDe
          nganhHocTcnh {
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
