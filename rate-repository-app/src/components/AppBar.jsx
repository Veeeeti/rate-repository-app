import React from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import Constants from 'expo-constants';
import { Link } from 'react-router-native';

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
  return (
    <View style={styles.container}>
        <Pressable>
          <Link to="/"><Text style={styles.topText}>Repositories</Text></Link>
        </Pressable>
        <Pressable>
          <Link to="/signin"><Text style={styles.topText}>SignIn</Text></Link>
        </Pressable>
    </View>
    )
};

export default AppBar;