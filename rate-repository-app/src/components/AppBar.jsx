import React from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#24292e",
    
  },
  topText: {
    color: "white"
  }
});

const AppBar = () => {
  return <View style={styles.container}>
      <Pressable><Text style={styles.topText}>Repositories</Text></Pressable>
      </View>;
};

export default AppBar;