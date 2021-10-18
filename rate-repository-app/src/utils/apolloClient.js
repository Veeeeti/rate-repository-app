import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import Constants from 'expo-constants';

const httpLink = createHttpLink({
  // Replace the IP address part with your own IP address!
  // uri: 'http://172.20.10.2:5000/graphql',
  uri: Constants.manifest.extra.uri,
});

const createApolloClient = () => {
  return new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;