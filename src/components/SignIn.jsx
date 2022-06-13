import { Pressable, StyleSheet, View } from 'react-native';
import { Formik, useField } from 'formik';
import Text from './Text';
import FormikTextInput from './FormikTextInput';

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
    marginBottom: 8,
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
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 4,
    textAlign: 'center',
  },
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
      <Pressable onPress={onSubmit}>
        <Text style={styles.button} fontWeight='bold'>Sign in</Text>
      </Pressable>
    </View>
  );
};

const BodyMassIndexCalculator = () => {
};

const SignIn = () => {
  const onSubmit = values => {
    console.log(values);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;