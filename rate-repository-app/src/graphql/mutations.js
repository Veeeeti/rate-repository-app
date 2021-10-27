import React from 'react';
import { gql } from '@apollo/client';

export const AUTHORIZE = gql`
mutation TryAuthorize($credentials: AuthorizeInput!) {
  authorize(credentials: $credentials) {
    accessToken
  }
}
`;

export const CREATE_REVIEW = gql`
  mutation createReview(
    $repositoryName: String!
    $ownerName: String!
    $rating: Int!
    $text: String
  ) {
    createReview(
      review: {
        repositoryName: $repositoryName
        ownerName: $ownerName
        rating: $rating
        text: $text
      }
    ) {
      id
      repositoryId
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser($username: String!, $password: String!) {
    createUser(user: { username: $username, password: $password }) {
      id
      username
      reviewCount
    }
  }
`;

export const DELETE_REVIEW = gql`
  mutation deleteReview($id: ID!) {
    deleteReview(id: $id)
  }
`;