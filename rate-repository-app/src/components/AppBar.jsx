import React from 'react';
import { View, StyleSheet, Text, Pressable, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { Link } from 'react-router-native';
import { gql, useQuery } from '@apollo/client';
import useAuthStorage from '../hooks/useAuthStorage';
import { useApolloClient } from '@apollo/client';
import { useHistory } from 'react-router';

// import useAuthStorage from '../hooks/useAuthStorage';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#24292e"
  },
  topText: {
    color: "white"
  }
});

const AppBar = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const history = useHistory();

  const SIGNIN_STATUS = gql`
  query fetchAuthorizedUser {
    authorizedUser {
      id
      username
    }
  }`;
  const { data } = useQuery(SIGNIN_STATUS);
  console.log('data from SINGIN_STATUS',data);

  const handleSignOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
    history.push('/login');
  };

  return (
    <View style={styles.container}>
        <ScrollView horizontal>
            <Pressable style={{paddingHorizontal: 3}}>
              <Link to="/"><Text style={styles.topText}>Repositories</Text></Link>
            </Pressable>
            
            {
              !data?.authorizedUser && (
              <Pressable style={{paddingHorizontal: 3}}>
                <Link  Link to="/signin"><Text style={styles.topText}>SignIn</Text></Link>
              </Pressable>)
            }
            {
              data?.authorizedUser && (
              <Pressable style={{paddingHorizontal: 3}} onPress={handleSignOut}>
                <Text style={styles.topText}>Signout</Text>
              </Pressable>)
            }
        </ScrollView>
    </View>
    )
};

export default AppBar;