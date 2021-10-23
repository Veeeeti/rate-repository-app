import React from "react";
import { View, StyleSheet, Image, Pressable } from 'react-native';
import { useParams } from 'react-router';
import Text from './Text'
import theme from '../theme';
import useRepository from "../hooks/useRepository";
import * as WebBrowser from 'expo-web-browser';

const styles = StyleSheet.create({
    flexContainer: {
      flexDirection: 'row',
      justifyContent: 'center'
    },
    flexColumn: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
    infoContainer: {
        flexDirection: 'row',
        padding: 7
    },
    languageContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        padding: 3
    },
    language: {
        color: 'white',
        backgroundColor: theme.colors.primary,
        padding: 5
    },
    imageStyle: {
        height: 75,
        width: 75,
    },
    openInGithub: {
        color: 'white',
        backgroundColor: theme.colors.primary,
        padding: 10
      },
      openInGithubContainer: {
        color: 'white',
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 3,
    },
  });

const SingleRepository = () => {
    const { id } = useParams();
    const { repository, isLoading } = useRepository(id);

    if(!repository) {
        return null;    
    }

    // console.log('SingleRepo',repository);

    const item = repository;

    const parsedCount = (x) => {
        if (x > 1000) {
            return Number.parseFloat(x*0.001).toFixed(1)
        }
        return x;
    };

    return(
    <View>
        <View style={styles.infoContainer}>
            <Image style={styles.imageStyle} source={{
                uri: (item.ownerAvatarUrl),
                }}/>
            <View style={{padding: 5}}>
                <Text testID='fullName' style={{fontWeight: 'bold', padding: 3}}>{item.fullName}</Text>
                <Text testID='description' style={{padding: 3, color: theme.colors.textSecondary}}>{item.description}</Text>
                <View style={styles.languageContainer}>
                    <Text testID='language' style={styles.language}>{item.language}</Text>
                </View>
            </View> 
        </View>
        <View style={styles.flexContainer}>
            <View style={styles.flexColumn}>
                <Text testID='stars' style={{fontWeight: 'bold'}}>{parsedCount(item.stargazersCount)}{item.stargazersCount > 1000 && "k"}</Text>
                <Text>Stars</Text>
            </View>
            <View style={styles.flexColumn}> 
                <Text testID='forks' style={{fontWeight: 'bold'}}>{parsedCount(item.forksCount)}{item.forksCount > 1000 && "k"}</Text>
                <Text>Forks</Text>
            </View>
            <View style={styles.flexColumn}>
                <Text testID='reviews' style={{fontWeight: 'bold'}}>{parsedCount(item.reviewCount)}{item.reviewCount> 1000 && "k"}</Text>
                <Text>Reviews</Text>
            </View>
            <View style={styles.flexColumn}>
                <Text testID='reviews' style={{fontWeight: 'bold'}}>{parsedCount(item.ratingAverage)}</Text>
                <Text>Rating</Text>
            </View>
        </View>
        <View style={styles.openInGithubContainer}>
            <Pressable style={styles.openInGithub} onPress={()=> WebBrowser.openBrowserAsync(item.url)}>
                <Text style={{color: 'white'}}>Open on GitHub</Text>
            </Pressable>
        </View>
    </View>
    )
}

export default SingleRepository;