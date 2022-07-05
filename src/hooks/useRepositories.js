import { useQuery } from '@apollo/client';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = ({ orderBy, orderDirection, searchKeyword }) => {
  const { loading, error, data, refetch } = useQuery(GET_REPOSITORIES, {
    variables: { orderBy, orderDirection, searchKeyword },
    fetchPolicy: 'cache-and-network',
  });

  const repositories = data ? data.repositories : null;

  const sortRepositories = ({ orderBy, orderDirection }) => {
    refetch({ orderBy, orderDirection });
  }

  const searchRepositories = (searchKeyword) => {
    refetch({ searchKeyword: searchKeyword || '' });
  }

  return { repositories, loading, sortRepositories, searchRepositories };
};

export default useRepositories;