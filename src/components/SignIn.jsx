import { useNavigate } from 'react-router-dom';
import { Pressable, StyleSheet, View } from 'react-native';
import { Formik, useField } from 'formik';
import Text from './Text';
import FormikTextInput from './FormikTextInput';
import * as yup from 'yup';

import useSignIn from '../hooks/useSignIn';

import theme from '../theme';

const initialValues = {
  username: '',
  password: '',
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  input: {
    backgroundColor: 'white',
    borderColor: theme.colors.textSecondary,
    marginTop: 8,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 4,
    borderWidth: 1,
  },
  button: {
    backgroundColor: theme.colors.primary,
    color: 'white',
    marginTop: 8,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 4,
    textAlign: 'center',
  },
});

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required'),
  password: yup
    .string()
    .required('Password is required'),
});

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput
        name="username"
        placeholder="Username"
        style={styles.input}
      />
      <FormikTextInput
        name="password"
        placeholder="Password"
        secureTextEntry
        style={styles.input}
      />
      <Pressable onPress={onSubmit} style={{ zIndex: 0.5 }}>
        <Text style={styles.button} fontWeight='bold'>Sign in</Text>
      </Pressable>
    </View>
  );
};

export const SignInContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const SignIn = () => {
  const navigate = useNavigate();
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signIn({ username, password });
      navigate('/', { replace: true });
    } catch (e) {
      console.log(e);
    }
  };

  return <SignInContainer onSubmit={onSubmit}/>;
};

export default SignIn;