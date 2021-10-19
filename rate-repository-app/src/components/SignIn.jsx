import React from 'react';
import * as yup from 'yup';
import { Pressable, View, StyleSheet } from 'react-native';
import FormikTextInput from './FormikTextInput';
import { Formik, useField } from 'formik';
import Text from './Text';
import theme from '../theme';
import useSignIn from '../hooks/useSignIn';

const initialValues = {
    username: '',
    password: ''
}

const validationSchema = yup.object().shape({
    username: yup
    .string()
    .required('Username is required'),
    password: yup
    .string()
    .required('Password is required')
});


const styles = StyleSheet.create({
    loginContainer: {
        flexDirection: 'column',
        alignItems: 'center'
    },
    loginButton: {
        backgroundColor: theme.colors.primary,
        borderRadius: 3,
        padding: 10,
        paddingHorizontal: 100
    }
});


const SignInForm = ({ onSubmit }) => {
    const [usernameField, usernameMeta, usernameHelpers] = useField('username');
    const [passwordField, passwordMeta, passwordHelpers] = useField('password');
    return (
        <View style={styles.loginContainer}>
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
            <Pressable style={styles.loginButton} onPress={onSubmit}>
                <Text style={{color:'white'}}>Login</Text>
            </Pressable>
        </View>
    );
}

const SignIn = () => {
    const [signIn] = useSignIn();
    const onSubmit = async (values) => {
      const { username, password } = values;
      console.log('username',username);
      console.log('password',password);
      console.log('values',values);
  
      try {
        const { data } = await signIn({ username, password });
        console.log('ran await signIn');
        console.log(data);
      } catch (e) {
        console.log(e);
      }
    };

    return (
        <Formik 
            initialValues={initialValues} 
            onSubmit={onSubmit} 
            validationSchema={validationSchema}
        >
            {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit}/>}
        </Formik>
    );
        
};

export default SignIn;