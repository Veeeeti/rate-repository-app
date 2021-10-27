import React from 'react';
import { gql, useQuery } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query GetRepositories(
    $orderBy: AllRepositoriesOrderBy, 
    $orderDirection: OrderDirection,
    $searchKeyword: String,
    $first: Int,
    $after: String
    ){
    repositories (
      after: $after,
      first: $first,
      orderBy: $orderBy, 
      orderDirection: $orderDirection, 
      searchKeyword: $searchKeyword
      ){
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
      pageInfo{
        hasNextPage
        endCursor
        startCursor
      }
    }
  }
`;

export const GET_REPOSITORY = gql`
  query GetRepository($id: ID!, $first: Int, $after: String) {
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
      reviews (first: $first, after: $after) {
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
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
      }
    }
  }
`;

export const GET_AUTHORIZED_USER = gql`
query {
  authorizedUser {
    id
    username
    reviews {
      edges {
        node {
          id
          repository {
            id
            fullName
          }
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