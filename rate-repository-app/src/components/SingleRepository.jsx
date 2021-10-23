import React from "react";
import { View, StyleSheet, Image, Pressable, FlatList } from 'react-native';
import { useParams } from 'react-router';
import Text from './Text'
import theme from '../theme';
import useRepository from "../hooks/useRepository";
import * as WebBrowser from 'expo-web-browser';
import { format } from 'date-fns';
import RepositoryItem from './RepositoryItem';

const styles = StyleSheet.create({
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
    reviewContainer: {
        flexDirection: 'row',
        padding: 7,
    },
    reviewTextContainer: {
        flexDirection: 'column',
        paddingHorizontal: 5,
    },
    reviewRating: {
        color: theme.colors.primary,
        fontSize: 20,
        borderWidth: 2,
        borderColor: theme.colors.primary,
        width: 50,
        height: 50,
        borderRadius: 50/2,
        padding: 11
    }
  });

const ReviewItem = ({ review }) => {
    console.log('ReviewItem',review);
    return(
    <View style={styles.reviewContainer}>
        <View style={{alignContent: 'center'}}>
            <Text style={styles.reviewRating}>{review.rating}</Text>    
        </View> 
        <View style={styles.reviewTextContainer}>
            <Text style={{fontWeight: 'bold'}}>{review.user.username}</Text>
            <Text style={{color: theme.colors.textSecondary}}>
                {format(new Date(review.createdAt), 'dd.MM.yyyy')}
            </Text>
            <Text>{review.text}</Text>
        </View>
    </View>
    )
};

const SingleRepository = () => {
    const { id } = useParams();
    const { repository, isLoading } = useRepository(id);

    if(!repository) {
        return null;    
    }

    // console.log(repository.reviews.edges);

    const item = repository;
    const reviews = item.reviews.edges;
    console.log('reviews',reviews);

    return(
    <View>
        <RepositoryItem
            key={item.id} 
            item={item}
        />
        <FlatList
        data={reviews}
        renderItem={(review) => <ReviewItem review={review.item.node} />}
        keyExtractor={({ id }) => id}
        />
    </View>
    )
}

export default SingleRepository;