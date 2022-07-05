import { useQuery } from '@apollo/client';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (variables) => {
  const { loading, error, data, refetch, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
    variables,
    fetchPolicy: 'cache-and-network',
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  const sortRepositories = ({ orderBy, orderDirection }) => {
    refetch({ orderBy, orderDirection });
  }

  const searchRepositories = (searchKeyword) => {
    refetch({ searchKeyword: searchKeyword || '' });
  }

  return {
    repositories: data?.repositories,
    fetchMore: handleFetchMore,
    loading,
    ...result,
    sortRepositories,
    searchRepositories
  };
};

export default useRepositories;