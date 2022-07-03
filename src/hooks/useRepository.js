import { useQuery } from '@apollo/client';

import { GET_REPOSITORY } from '../graphql/queries';

const useRepository = (id) => {
  const { loading, error, data } = useQuery(GET_REPOSITORY, {
    variables: { repositoryId: id },
    fetchPolicy: 'cache-and-network',
  });

  const repository = data ? data.repository : null;

  return { repository, loading };
};

export default useRepository;