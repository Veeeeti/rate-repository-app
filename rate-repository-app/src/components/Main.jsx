import React from 'react';
import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';

import { Route, Switch } from 'react-router';
import SignIn from './SignIn';
import SingleRepository from './SingleRepository';

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
        <Route path="/:id">
          <SingleRepository/>
        </Route>
        <Route path="/">
          <RepositoryList/>
        </Route>
      </Switch>
    </View>
  );
};

export default Main;