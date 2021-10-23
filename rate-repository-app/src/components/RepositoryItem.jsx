import React from "react";
import { View, StyleSheet, Image, Pressable } from 'react-native';
import Text from './Text';
import { useHistory } from 'react-router';
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
    const history = useHistory();

    const parsedCount = (x) => {
        if (x > 1000) {
            return Number.parseFloat(x*0.001).toFixed(1)
        }
        return x
    }

    // console.log('item',item)
    return(
    <Pressable onPress={() => history.push(`/${item.id}`)}>
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
        </View>
    </Pressable>)
}

export default RepositoryItem;