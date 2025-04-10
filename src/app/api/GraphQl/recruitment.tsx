import { gql } from "@apollo/client";

export const GET_RECCUITMENT = gql`
  query GetPostBySlug {
    allRecruitment {
      nodes {
        customRecruitment {
          list1 {
            desc
            title
          }
          list2 {
            group1 {
              desc
              title
              image {
                node {
                  mediaItemUrl
                }
              }
            }
            group2 {
              desc
              title
              image {
                node {
                  mediaItemUrl
                }
              }
            }
            group3 {
              desc
              title
              image {
                node {
                  mediaItemUrl
                }
              }
            }
            group4 {
              desc
              title
              image {
                node {
                  mediaItemUrl
                }
              }
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
          fullHead
          title
        }
      }
    }
  }
`;