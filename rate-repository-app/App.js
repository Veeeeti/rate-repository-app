import { ApolloProvider } from '@apollo/client';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NativeRouter } from 'react-router-native';

import Main from './src/components/Main';
import createApolloClient from './src/utils/apolloClient';

const apolloClient = createApolloClient();

const App = () => {
  return(
  <>
    <NativeRouter>
      <ApolloProvider client={apolloClient}>
      <Main />
      </ApolloProvider>
    </NativeRouter>
    <StatusBar style="auto"/>
  </>
  )
};

export default App;