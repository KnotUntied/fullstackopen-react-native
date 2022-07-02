import { RepositoryListContainer } from './RepositoryList';
import { render } from '@testing-library/react-native';

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      };

      // Add your test code here
      // Need better solution
      const { debug, getAllByTestId } = render(<RepositoryListContainer repositories={repositories} />);

      const repositoryItems = getAllByTestId('repositoryItem');
      const [firstRepositoryItem, secondRepositoryItem] = repositoryItems;

      const repositoryForks = getAllByTestId('Forks');
      const [firstRepositoryForks, secondRepositoryForks] = repositoryForks;

      const repositoryStars = getAllByTestId('Stars');
      const [firstRepositoryStars, secondRepositoryStars] = repositoryStars;

      const repositoryRatings = getAllByTestId('Rating');
      const [firstRepositoryRatings, secondRepositoryRatings] = repositoryRatings;

      const repositoryReviews = getAllByTestId('Reviews');
      const [firstRepositoryReviews, secondRepositoryReviews] = repositoryReviews;

      debug();

      expect(firstRepositoryItem).toHaveTextContent(repositories.edges[0].node.fullName);
      expect(firstRepositoryItem).toHaveTextContent(repositories.edges[0].node.description);
      expect(firstRepositoryItem).toHaveTextContent(repositories.edges[0].node.language);
      expect(firstRepositoryForks).toHaveTextContent('1.6k');
      expect(firstRepositoryStars).toHaveTextContent('21.9k');
      expect(firstRepositoryRatings).toHaveTextContent(repositories.edges[0].node.ratingAverage);
      expect(firstRepositoryReviews).toHaveTextContent(repositories.edges[0].node.reviewCount);

      expect(secondRepositoryItem).toHaveTextContent(repositories.edges[1].node.fullName);
      expect(secondRepositoryItem).toHaveTextContent(repositories.edges[1].node.description);
      expect(secondRepositoryItem).toHaveTextContent(repositories.edges[1].node.language);
      expect(secondRepositoryForks).toHaveTextContent(repositories.edges[1].node.forksCount);
      expect(secondRepositoryStars).toHaveTextContent('1.8k');
      expect(secondRepositoryRatings).toHaveTextContent(repositories.edges[1].node.ratingAverage);
      expect(secondRepositoryReviews).toHaveTextContent(repositories.edges[1].node.reviewCount);
    });
  });
});