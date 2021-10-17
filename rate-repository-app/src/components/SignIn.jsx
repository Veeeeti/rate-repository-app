import React from 'react';
import { Pressable, TextInput, View, StyleSheet} from 'react-native';
import {Formik, useField } from 'formik';
import Text from './Text';
import theme from '../theme';

const initialValues = {
    username: '',
    password: ''
}

const styles = StyleSheet.create({
    loginContainer: {
        flexDirection: 'column',
        alignItems: 'center'
    },
    textField: {
        borderStyle: 'solid',
        borderColor: theme.colors.textSecondary,
        borderRadius: 3,
        padding: 10,
        margin: 10,
        paddingHorizontal: 100
    },
    loginButton: {
        backgroundColor: theme.colors.primary,
        borderRadius: 3,
        padding: 10,
        paddingHorizontal: 100
    }
});


const SignInForm = ({ onSubmit }) => {
    const [nameField, nameMeta, nameHelpers] = useField('username');
    const [passwordField, passwordMeta, passwordHelpers] = useField('password');
    return (
        <View style={styles.loginContainer}>
            <TextInput 
            placeholder="Username"
            value={nameField.value}
            onChangeText={text => nameHelpers.setValue(text)}
            style={styles.textField}
            />
            <TextInput 
            placeholder="Password"
            value={passwordField.value}
            onChangeText={text => passwordHelpers.setValue(text)}
            secureTextEntry={true}
            style={styles.textField}
            />
            <Pressable style={styles.loginButton} onPress={onSubmit}>
                <Text>Login</Text>
            </Pressable>
        </View>
    );
}

const SignIn = () => {
    const onSubmit = (values) => {
        console.log('submitted',values);
    }
    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {({ handleSubmit}) => <SignInForm onSubmit={handleSubmit}/>}
        </Formik>
    );
        
};

export default SignIn;