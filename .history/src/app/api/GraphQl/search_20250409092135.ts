import { gql } from "@apollo/client";

export const GET_POSTS = gql`
  query GetPosts($size: Int!, $offset: Int!) {
    posts(where: { offsetPagination: { size: $size, offset: $offset } }) {
      pageInfo {
        offsetPagination {
          hasMore
          hasPrevious
          total
        }
      }
      nodes {
        title
        slug
        date
        excerpt
        featuredImage {
          node {
            mediaItemUrl
          }
        }
        categories {
          nodes {
            slug
          }
        }
      }
    }
  }
`;

