import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query (
    $orderBy: AllRepositoriesOrderBy,
    $orderDirection: OrderDirection,
    $searchKeyword: String,
    $first: Int,
    $after: String
  ) {
    repositories(
      orderBy: $orderBy,
      orderDirection: $orderDirection,
      searchKeyword: $searchKeyword,
      first: $first,
      after: $after
    ) {
      edges {
        cursor
        node {
          id
          fullName
          description
          language
          ownerAvatarUrl
          stargazersCount
          forksCount
          reviewCount
          ratingAverage
        }
      }
        totalCount
        pageInfo {
          hasNextPage
          startCursor
          endCursor
        }
    }
  }
`;

export const GET_REPOSITORY = gql`
  query ($repositoryId: ID!, $first: Int, $after: String) {
    repository(id: $repositoryId) {
      id
      fullName
      description
      language
      ownerAvatarUrl
      stargazersCount
      forksCount
      reviewCount
      ratingAverage
      url
      reviews(first: $first, after: $after) {
        edges {
          cursor
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
        totalCount
        pageInfo {
          hasNextPage
          startCursor
          endCursor
        }
      }
    }
  }
`;

export const GET_MY_REVIEWS = gql`
  query ($first: Int, $after: String)  {
    me {
      reviews(first: $first, after: $after) {
        totalCount
        pageInfo {
          hasNextPage
          startCursor
          endCursor
        }
        edges {
          cursor
          node {
            id
            repositoryId
            rating
            createdAt
            text
          }
        }
      }
    }
  }
`;

export const ME = gql`
  query {
    me {
      id
      username
    }
  }
`;