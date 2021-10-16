import React from 'react';
import Constants from 'expo-constants';
import { Text, StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';

import theme from '../theme';
import { Redirect, Route, Switch } from 'react-router';
import SignIn from './SignIn';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar/>
      <Switch>
        <Route path="/signin">
          <SignIn/>
        </Route>
        <Route path="/">
          <RepositoryList/>
        </Route>
      </Switch>
    </View>
  );
};

export default Main;