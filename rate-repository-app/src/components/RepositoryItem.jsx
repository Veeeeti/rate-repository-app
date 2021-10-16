import React from "react";
import { View, StyleSheet, Image } from 'react-native';
import Text from './Text'
import theme from '../theme';

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
    }
  });

const RepositoryItem = ({ item }) => {

    const parsedCount = (x) => {
        if (x > 1000) {
            return Number.parseFloat(x*0.001).toFixed(1)
        }
        return x
    }

    return(
    <View>
        <View style={styles.infoContainer}>
            <Image style={styles.imageStyle} source={{
                uri: item.ownerAvatarUrl,
                }}/>
            <View style={{padding: 5}}>
                <Text style={{fontWeight: 'bold', padding: 3}}>{item.fullName}</Text>
                <Text style={{padding: 3, color: theme.colors.textSecondary}}>{item.description}</Text>
                <View style={styles.languageContainer}>
                    <Text style={styles.language}>{item.language}</Text>
                </View>
            </View> 
        </View>
        <View style={styles.flexContainer}>
            <View style={styles.flexColumn}>
                <Text style={{fontWeight: 'bold'}}>{parsedCount(item.stargazersCount)}{item.stargazersCount > 1000 && "k"}</Text>
                <Text>Stars</Text>
            </View>
            <View style={styles.flexColumn}> 
                <Text style={{fontWeight: 'bold'}}>{parsedCount(item.forksCount)}{item.forksCount > 1000 && "k"}</Text>
                <Text>Forks</Text>
            </View>
            <View style={styles.flexColumn}>
                <Text style={{fontWeight: 'bold'}}>{parsedCount(item.reviewCount)}{item.reviewCount> 1000 && "k"}</Text>
                <Text>Reviews</Text>
            </View>
            <View style={styles.flexColumn}>
                <Text style={{fontWeight: 'bold'}}>{parsedCount(item.ratingAverage)}</Text>
                <Text>Rating</Text>
            </View>
        </View>
    </View>)
}

export default RepositoryItem;