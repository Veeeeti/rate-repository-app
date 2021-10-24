import React from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native'
import { Formik, useField } from 'formik';
import * as yup from 'yup';
import FormikTextInput from './FormikTextInput';
import theme from '../theme';
import useCreateReview from '../hooks/useCreateReview';
import { useHistory } from 'react-router';

const styles = StyleSheet.create({
    button: {
        backgroundColor: theme.colors.primary,
        borderRadius: 3,
        padding: 10,
        paddingHorizontal: 100
    },
    buttonContainer:{ 
        flexDirection: 'column',
        alignItems: 'center'
    },
    fieldsContainer: {
        marginHorizontal: 10
    }
});
  

const CreateReviewForm = ({ onSubmit }) => {
    const [ownerNameField, ownerName, ownerNameHelpers] = useField('ownerName');
    const [repositoryNameField, repositoryName, repositoryNameHelpers] = useField('repositoryName');
    const [ratingField, rating, ratingHelpers] = useField('rating');
    const [textField, text, textHelpers] = useField('text');

    return (
        <View style={styles.fieldsContainer}>
            <FormikTextInput 
            name="ownerName"
            placeholder="Repository owner name"
            value={ownerNameField.value}
            onChangeText={text => ownerNameHelpers.setValue(text)}
            />
            <FormikTextInput 
            name="repositoryName"
            placeholder="Repository name"
            value={repositoryNameField.value}
            onChangeText={text => repositoryNameHelpers.setValue(text)}
            />
            <FormikTextInput 
            name="rating"
            placeholder="Rating between 0 and 100"
            value={ratingField.value}
            onChangeText={text => ratingHelpers.setValue(text)}
            />
            <FormikTextInput 
            name="text"
            placeholder="Review"
            value={textField.value}
            onChangeText={text => textHelpers.setValue(text)}
            multiline
            />
            <View style={styles.buttonContainer}>
                <Pressable style={styles.button} onPress={onSubmit}>
                    <Text style={{color: 'white'}}>Create a review</Text>
                </Pressable>
            </View>
        </View>
    );
};

const CreateReviewContainer = ({ onSubmit }) => {
    const initialValues = {
        ownerName: '',
        repositoryName: '',
        rating: '',
        text: ''
    };

    const validationSchema = yup.object().shape({
        ownerName: yup.string().required('Repository owner is required'),
        repositoryName: yup.string().required('Repository name is required'),
        rating: yup.number()
        .min(0,'Rating must be between 0-100')
        .max(100,'Rating must be between 0-100')
        .required('Rating is required')
        .integer('Rating must be an integer'),
        text: yup.string()
    });

    return(
        <Formik 
            initialValues={initialValues} 
            onSubmit={onSubmit} 
            validationSchema={validationSchema}
        >
            {({ handleSubmit }) => <CreateReviewForm onSubmit={handleSubmit}/>}
        </Formik>
    );
};

const CreateReview = () => {
    const [createReview] = useCreateReview();
    const history = useHistory();

    const onSubmit = async (values) => {
      console.log('ran onSubmit in CreateReview');
      const { repositoryName, ownerName, rating, text } = values;
      console.log('values',values);
        
      try {
          console.log('adding review...');
          const response = await createReview({ repositoryName, ownerName, rating, text });
          console.log('createReview data',response);
          history.push(`/${response.repositoryId}`)
      } catch (e) {
        console.log(e);
      };
    };

    return (
        <CreateReviewContainer 
        onSubmit={onSubmit}
        />
    )
};

export default CreateReview;