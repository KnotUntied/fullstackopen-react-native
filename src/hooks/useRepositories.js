import { useQuery } from '@apollo/client';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = ({ orderBy, orderDirection }) => {
  const { loading, error, data, refetch } = useQuery(GET_REPOSITORIES, {
    variables: { orderBy, orderDirection },
    fetchPolicy: 'cache-and-network',
  });

  const repositories = data ? data.repositories : null;

  const sortRepositories = ({ orderBy, orderDirection }) => {
    refetch({ orderBy, orderDirection });
  }

  // const sortRepositories = refetch;

  return { repositories, loading, sortRepositories };
};

export default useRepositories;