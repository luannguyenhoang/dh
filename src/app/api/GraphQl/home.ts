import { gql } from "@apollo/client";

export const GET_PAGE_HOME = gql`
  query MyQuery {
    allTrangCh {
      nodes {
        trangCh {
          banner {
            anhBanner {
              node {
                mediaItemUrl
              }
            }
          }
          cacNganhDaoTao {
            tieuDe
            noiDung
            item {
              list {
                anhNganh {
                  node {
                    mediaItemUrl
                  }
                }
                tenNganh
                gioiThieu
              }
            }
          }
          banNhan {
            slogan
            tieuDe
            cot {
              nhanDuoc {
                text1
                text2
              }
            }
          }
          thongBao {
            tieuDe
            noiDung
            cot {
              anh {
                node {
                  mediaItemUrl
                }
              }
              list {
                item {
                  description {
                    text
                  }
                  title
                }
              }
            }
          }
          hoTro {
            tieuDe
            noiDung
            cot {
              anh {
                node {
                  mediaItemUrl
                }
              }
              tabs {
                list {
                  text1
                  text2
                }
              }
            }
          }
          nhungConSo {
            tieuDe
            noiDung
            cot {
              cot {
                text1
                text2
              }
            }
          }
          danhGia {
            tieuDe
            noiDung
            comment {
              list {
                anh {
                  node {
                    mediaItemUrl
                  }
                }
                text1
                text2
                text3
                text4
              }
            }
          }
          tuyenSinh {
            tieuDe
            noiDung
            text
          }
        }
        seo {
          fullHead
        }
      }
    }
  }
`;
export const GET_CTA = gql`
  query MyQuery {
    allCTA {
      nodes {
        ctaQuery {
          tuVanNgay {
            title
          }
          text3 {
            label
            href
          }
          path {
            label
            href
          }
        }
      }
    }
  }
`;
