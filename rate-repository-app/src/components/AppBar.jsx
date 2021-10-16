import React from 'react';
import { View, StyleSheet, Text, Pressable, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { Link } from 'react-router-native';

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
  return (
    <View style={styles.container}>
        <ScrollView horizontal>
            <Pressable style={{paddingHorizontal: 3}}>
            <Link to="/"><Text style={styles.topText}>Repositories</Text></Link>
            </Pressable>
            <Pressable style={{paddingHorizontal: 3}}>
            <Link to="/signin"><Text style={styles.topText}>SignIn</Text></Link>
            </Pressable>
        </ScrollView>
    </View>
    )
};

export default AppBar;