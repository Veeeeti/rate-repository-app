import React from 'react';
import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';

import { Route, Switch } from 'react-router';
import SignIn from './SignIn';
import SignUp from './SignUp';

import SingleRepository from './SingleRepository';
import CreateReview from './CreateReview';

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
        <Route path="/createReview">
          <CreateReview/>
        </Route>
        <Route path="/signup">
          <SignUp/>
        </Route>
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