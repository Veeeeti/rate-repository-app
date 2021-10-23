import React from 'react';
import { gql, useQuery } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
          id
          fullName
          ownerName
          description
          language
          ownerAvatarUrl
          stargazersCount
          reviewCount
          ratingAverage
          forksCount
        }
      }
    }
  }
`;

export const GET_REPOSITORY = gql`
  query Repository($id: ID!) {
    repository(id: $id) {
      id
      fullName
      ownerName
      description
      language
      ownerAvatarUrl
      stargazersCount
      reviewCount
      ratingAverage
      forksCount
      url
    }
  }
`;