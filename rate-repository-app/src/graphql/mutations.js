import React from 'react';
import { gql } from '@apollo/client';

export const AUTHORIZE = gql`
mutation TryAuthorize($credentials: AuthorizeInput!) {
  authorize(credentials: $credentials) {
    accessToken
  }
}
`;