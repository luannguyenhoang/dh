import { gql } from "@apollo/client";

export const GET_PAGE_SERVICE = gql`
  query NewQuery {
    allService {
      nodes {
        customeService {
          list1 {
            desc
            hilight
            title
            image {
              node {
                mediaItemUrl
              }
            }
          }
          list2 {
            group1 {
              desc
              subTitle
              switchTitle
              title
            }
            group2 {
              desc
              subTitle
              switchTitle
              title
            }
            group3 {
              desc
              subTitle
              switchTitle
              title
            }
            group4 {
              desc
              subTitle
              switchTitle
              title
            }
            group5 {
              desc
              subTitle
              switchTitle
              title
            }
            item1 {
              desc
              title
            }
          }
          list3 {
            desc
            title
            image {
              node {
                mediaItemUrl
              }
            }
          }
        }
        seo {
          title
          fullHead
        }
      }
    }
  }
`;
