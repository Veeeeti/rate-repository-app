import React from 'react';
import { StyleSheet } from 'react-native';
import { useField } from 'formik';

import TextInput from './TextInput';
import Text from './Text';

import theme from '../theme';

const styles = StyleSheet.create({
  errorText: {
    marginTop: 5,
    color: '#d73a4a'
  },
  textField: {
    borderWidth: 1,
    borderColor: theme.colors.textSecondary,
    borderRadius: 3,
    padding: 10,
    margin: 10,
    paddingHorizontal: 100
},
  textFieldError: {
    borderWidth: 1,
    borderColor: '#d73a4a',
    borderRadius: 3,
    padding: 10,
    margin: 10,
    paddingHorizontal: 100
  }
});

const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;
  return (
    <>
      <TextInput
        onChangeText={value => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        style={ showError ? styles.textFieldError : styles.textField}
        {...props}
      />
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </>
  );
};

export default FormikTextInput;