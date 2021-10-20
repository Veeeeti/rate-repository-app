import React from 'react';
import { useApolloClient, useMutation } from '@apollo/client';
import { AUTHORIZE } from '../graphql/mutations';
import useAuthStorage from '../utils/authStorage';
import apolloClient from '../utils/apolloClient';
import { useHistory } from 'react-router';

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHORIZE);
  const client = useApolloClient();
  const history = useHistory();

  const signIn = async ({ username, password }) => {
    const authStorage = useAuthStorage();
    history.push('/');
    const { data } = await mutate({ variables: {credentials:{ username, password }} });
    await authStorage.setAccessToken(data.accessToken);
    client.resetStore();
  };
  return [signIn, result];
};

export default useSignIn;