import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
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
    }
  }
`;

export const GET_REPOSITORY = gql`
  query ($repositoryId: ID!) {
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