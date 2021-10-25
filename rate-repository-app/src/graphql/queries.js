import React from 'react';
import { gql, useQuery } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query GetRepositories($orderBy: AllRepositoriesOrderBy){
    repositories (orderBy: $orderBy){
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
  query GetRepository($id: ID!) {
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
      reviews {
        edges {
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
      }
    }
  }
`;