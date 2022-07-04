import { useNavigate } from 'react-router-dom';
import { Pressable, StyleSheet, View } from 'react-native';
import { Formik, useField } from 'formik';
import Text from './Text';
import FormikTextInput from './FormikTextInput';
import * as yup from 'yup';

import useSignUp from '../hooks/useSignUp';

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
    .min(1, 'Username must be between 1 and 30 characters long')
    .max(30, 'Username must be between 1 and 30 characters long')
    .required('Username is required'),
  password: yup
    .string()
    .min(5, 'Password must be between 1 and 30 characters long')
    .max(50, 'Password must be between 1 and 30 characters long')
    .required('Password is required'),
  repeat: yup
    .string()
    .oneOf([yup.ref('password'), null])
    .required('Password confirmation is required'),
});

const SignUpForm = ({ onSubmit }) => {
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
      <FormikTextInput
        name="repeat"
        placeholder="Password confirmation"
        secureTextEntry
        style={styles.input}
      />
      <Pressable onPress={onSubmit} style={{ zIndex: 0.5 }}>
        <Text style={styles.button} fontWeight='bold'>Sign up</Text>
      </Pressable>
    </View>
  );
};

export const SignUpContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const SignUp = () => {
  const navigate = useNavigate();
  const [signUp] = useSignUp();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signUp({ username, password });
      navigate('/', { replace: true });
    } catch (e) {
      console.log(e);
    }
  };

  return <SignUpContainer onSubmit={onSubmit}/>;
};

export default SignUp;