import React from 'react';
import * as yup from 'yup';
import { Pressable, View, StyleSheet } from 'react-native';
import FormikTextInput from './FormikTextInput';
import { Formik, useField } from 'formik';
import Text from './Text';
import theme from '../theme';
import useSignUp from '../hooks/useSignUp';
import { useHistory } from 'react-router';


const styles = StyleSheet.create({
    Container: {
        flexDirection: 'column',
        alignItems: 'center'
    },
    Button: {
        backgroundColor: theme.colors.primary,
        borderRadius: 3,
        padding: 10,
        paddingHorizontal: 100
    }
});


const SignUpForm = ({ onSubmit }) => {
    const [usernameField, usernameMeta, usernameHelpers] = useField('username');
    const [passwordField, passwordMeta, passwordHelpers] = useField('password');
    const [passwordConfirmationField, passwordConfirmationMeta, passwordConfirmationHelpers] = useField('passwordConfirmation');
    return (
        <View style={styles.Container}>
            <FormikTextInput 
            name="username"
            placeholder="Username"
            value={usernameField.value}
            onChangeText={text => usernameHelpers.setValue(text)}
            />
            <FormikTextInput 
            name="password"
            placeholder="Password"
            value={passwordField.value}
            onChangeText={text => passwordHelpers.setValue(text)}
            secureTextEntry={true}
            />
            <FormikTextInput 
            name="passwordConfirmation"
            placeholder="Password confirmation"
            value={passwordConfirmationField.value}
            onChangeText={text => passwordConfirmationHelpers.setValue(text)}
            secureTextEntry={true}
            />
            <Pressable style={styles.Button} onPress={onSubmit}>
                <Text style={{color:'white'}}>Login</Text>
            </Pressable>
        </View>
    );
}

const SignUpContainer = ({ onSubmit }) => {
    const initialValues = {
        username: '',
        password: '',
        passwordConfirmation: ''
    }

    const validationSchema = yup.object().shape({
        username: yup
        .string()
        .required('Username is required')
        .min(1,'Username length must be 1-30')
        .max(30,'Username length must be 1-30'),
        password: yup
        .string()
        .required('Password is required')
        .min(5, 'Password length must be 5-50')
        .max(50,'Password length must be 5-50'),
        passwordConfirmation: yup
        .string()
        .required('Password confirmation is required')
        .min(5, 'Password length must be 5-50')
        .max(50,'Password length must be 5-50')
        .oneOf([yup.ref('password')], 'Passwords must match')
    });

    return (
        <Formik 
            initialValues={initialValues} 
            onSubmit={onSubmit} 
            validationSchema={validationSchema}
        >
            {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit}/>}
        </Formik>
    );
};

const SignUp = () => {
    const [signUp] = useSignUp();
    const history = useHistory();
    
    const onSubmit = async (values) => {
      const { username, password } = values;
      console.log('values',values);
  
      try {
        console.log('singing up...');
        const response = await signUp({ username, password });
        console.log('ran await signUp');
        // history.push('/login');
      } catch (e) {
        console.log(e);
      };

      /*
      try {
          console.log('adding review...');
          const response = await createReview({ repositoryName, ownerName, rating, text });
          console.log('createReview data',response);
          history.push(`/${response.repositoryId}`)
      } catch (e) {
        console.log(e);
      };
      */
    };

    return (
        <SignUpContainer onSubmit={onSubmit}/>
    );
        
};

export default SignUp;