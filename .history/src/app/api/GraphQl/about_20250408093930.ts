import { gql } from "@apollo/client";

export const GET_PAGE_ABOUT = gql`
 query NewQuery {
  allAbout {
    nodes {
      customContact {
        group1 {
          desc
          title
        }
        group2 {
          desc
          title
        }
        group3 {
          href
          title
        }
        group4 {
          href
          title
        }
        group5 {
          map
          title
        }
        group6 {
          map
          title
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
