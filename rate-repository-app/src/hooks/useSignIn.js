import React, { useContext } from 'react';
import { useApolloClient, useMutation } from '@apollo/client';
import { AUTHORIZE } from '../graphql/mutations';
import AuthStorageContext from '../contexts/AuthStorageContext';

const useSignIn = () => {
  // const authStorage = useAuthStorage();
  const [mutate, result] = useMutation(AUTHORIZE);
  const client = useApolloClient();
  const authStorage = useContext(AuthStorageContext);

  const signIn = async ({ username, password }) => {
    const response = await mutate({ variables: {credentials:{ username, password }} });
    await authStorage.setAccessToken(response.data.authorize.accessToken);
    const token = await authStorage.getAccessToken();
    console.log('token,',token)
    client.resetStore();
    
    return response;
  };
  return [signIn, result];
};

export default useSignIn;