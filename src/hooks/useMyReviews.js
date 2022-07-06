import { useQuery } from '@apollo/client';

import { GET_MY_REVIEWS } from '../graphql/queries';

const useMyReviews = (variables) => {
  const { loading, data, fetchMore, refetch, ...result } = useQuery(GET_MY_REVIEWS, {
    variables,
    fetchPolicy: 'network-only',
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.me.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.me.reviews.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return {
    reviews: data?.me.reviews,
    fetchMore: handleFetchMore,
    loading,
    refetch,
    ...result
  };
};

export default useMyReviews;