import { gql } from "@apollo/client";

export const GET_PAGE_SOLUTION = gql`
  query NewQuery {
    allSolution {
      nodes {
        customeSolution {
          group1 {
            list1 {
              desc
              sub
              title
              image {
                node {
                  mediaItemUrl
                }
              }
              list {
                item1 {
                  desc
                  title
                }
                item2 {
                  desc
                  title
                }
                item3 {
                  desc
                  title
                }
              }
            }
            list2 {
              sub
              title
              desc
              image {
                node {
                  mediaItemUrl
                }
              }
              list {
                item1 {
                  desc
                  title
                }
                item2 {
                  desc
                  title
                }
                item3 {
                  title
                  desc
                }
              }
            }
            list3 {
              desc
              sub
              title
              image {
                node {
                  mediaItemUrl
                }
              }
              list {
                item1 {
                  desc
                  title
                }
                item2 {
                  title
                  desc
                }
                item3 {
                  title
                  desc
                }
              }
            }
            list4 {
              desc
              sub
              title
              image {
                node {
                  mediaItemUrl
                }
              }
              list {
                item1 {
                  desc
                  title
                }
                item2 {
                  title
                  desc
                }
                item3 {
                  desc
                  title
                }
              }
            }
          }
          group2 {
            title
            list {
              item1 {
                desc
                sub
                title
              }
              item2 {
                desc
                sub
                title
              }
              item3 {
                desc
                sub
                title
              }
              item4 {
                desc
                sub
                title
              }
              item5 {
                desc
                sub
                title
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
