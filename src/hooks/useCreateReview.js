import { useContext } from 'react';
import { useMutation } from '@apollo/client';

import { CREATE_REVIEW } from '../graphql/mutations';

const useCreateReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);

  const createReview = async ({ ownerName, repositoryName, rating, text }) => {
    await mutate({ variables: { review: { ownerName, repositoryName, rating: parseInt(rating), text } } });
  };

  return [createReview, result];
};

export default useCreateReview;