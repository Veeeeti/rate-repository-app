import { useQuery } from '@apollo/client';
import React from 'react';
import { View, Text, FlatList, StyleSheet, Pressable, Alert } from 'react-native';
import useMyReviews from '../hooks/useMyReviews';
import { format } from 'date-fns';
import theme from '../theme';
import { useHistory } from 'react-router';
import useDeleteReview from '../hooks/useDeleteReview';

const styles = StyleSheet.create({
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
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        margin: 5
    },
    button: {
        padding: 10,
        margin: 5,
        color: 'white'
    }
  });

const MyReviews = () => {
    const { authorizedUser, refetch } = useMyReviews();

    const ReviewItem = ({review, refetch}) => {
        const [deleteReview] = useDeleteReview();
        const history = useHistory()
        const item = review.item;
        // console.log(item);
    
        const handleViewRepository = () => {
            history.push(`/${item.repository.id}`);
        };
    
        const handleDeleteReview = () => {
            Alert.alert(
                "Delete review?", 
                "This will permanently delete the review.", [
                    {
                        text: 'Cancel',
                        onPress: () => console.log('cancelled delete'),
                        style: 'cancel'
                    },
                    {
                        text: 'Delete', onPress: ()=> {
                            try {
                                console.log('trying deleteReview()...')
                                deleteReview(item.id);
                                setTimeout(() => {
                                    refetch();
                                  }, 0);
                            } catch (e) {
                                console.log(e.message);
                            }
                        }
                    }
                ])
        };
    
        return(
        <> 
            <View style={styles.reviewContainer}>
                <View style={{alignContent: 'center'}}>
                    <Text style={styles.reviewRating}>{item.rating}</Text>    
                </View> 
                <View style={styles.reviewTextContainer}>
                    <Text style={{fontWeight: 'bold'}}>{item.repository.fullName}</Text>
                    <Text style={{color: theme.colors.textSecondary}}>
                        {format(new Date(item.createdAt), 'dd.MM.yyyy')}
                    </Text>
                    <Text>{item.text}</Text>
                </View>
            </View>
            <View style={styles.buttonsContainer}>
                <Pressable onPress={handleViewRepository} style={{backgroundColor: theme.colors.primary, margin: 5}}>
                    <Text style={styles.button}>View repository</Text>
                </Pressable> 
                <Pressable onPress={handleDeleteReview} style={{backgroundColor: 'red', margin: 5}}>
                    <Text style={styles.button}>Delete review</Text>
                </Pressable> 
            </View>
        </>
        )
    };

    if (!authorizedUser) return null;

    const reviews = authorizedUser.reviews.edges
    ? authorizedUser.reviews.edges.map((edge) => edge.node)
    : [];

    return(
        <View>
            <FlatList
                data={reviews}
                renderItem={(review) => <ReviewItem review={review} refetch={refetch}/>}
                keyExtractor={(review,i) => String(i)}
            />
        </View>
    )
}

export default MyReviews;