import { useNavigate } from 'react-router-dom';
import { Pressable, StyleSheet, View } from 'react-native';
import { Formik, useField } from 'formik';
import Text from './Text';
import FormikTextInput from './FormikTextInput';
import * as yup from 'yup';

import { useContext, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/mutations';

import theme from '../theme';

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: '',
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
  ownerName: yup
    .string()
    .required('Username is required'),
  repositoryName: yup
    .string()
    .required('Password is required'),
  rating: yup
    .number()
    .required('Rating is required')
    .integer('Rating must be an integer')
    .min(0, 'Rating must be between 0 and 100')
    .max(100, 'Rating must be between 0 and 100'),
  text: yup
    .string()
    .optional(),
});

const NewReviewForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput
        name="ownerName"
        placeholder="Repository owner name"
        style={styles.input}
      />
      <FormikTextInput
        name="repositoryName"
        placeholder="Repository name"
        style={styles.input}
      />
      <FormikTextInput
        name="rating"
        placeholder="Rating between 0 and 100"
        style={styles.input}
        keyboardType="number-pad"
      />
      <FormikTextInput
        name="text"
        placeholder="Review"
        style={styles.input}
        textAlignVertical="top"
        multiline
      />
      <Pressable onPress={onSubmit} style={{ zIndex: 0.5 }}>
        <Text style={styles.button} fontWeight='bold'>Create a review</Text>
      </Pressable>
    </View>
  );
};

export const NewReviewContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <NewReviewForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const NewReview = () => {
  const navigate = useNavigate();
  const [createReview, result] = useMutation(CREATE_REVIEW);

  useEffect(() => {
    if (result.data) {
      navigate(`/repositories/${result.data.createReview.repositoryId}`, { replace: true });
    }
  }, [result.data]) // eslint-disable-line

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, text } = values;
    const rating = parseInt(values.rating);

    try {
      await createReview({ variables: { review: { ownerName, repositoryName, rating, text }}});
    } catch (e) {
      console.log(e);
    }
  };

  return <NewReviewContainer onSubmit={onSubmit}/>;
};

export default NewReview;