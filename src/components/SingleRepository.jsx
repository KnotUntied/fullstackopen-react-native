import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { useParams } from "react-router-dom";
import Text from './Text';
import * as Linking from 'expo-linking';
import RepositoryItem from './RepositoryItem';

import { format } from 'date-fns'

import useRepository from '../hooks/useRepository';

import theme from '../theme';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  rowContainer: {
    flexDirection: 'row',
  },
  container: {
    flexDirection: 'column',
    flexGrow: 1,
    flexShrink: 1,
    marginBottom: 8,
  },
  buttonContainer: {
    backgroundColor: 'white',
    padding: 16,
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
  item: {
    backgroundColor: 'white',
    padding: 16,
  },
  reviewRatingContainer: {
    borderRadius: 24,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    justifyContent: 'center',
    marginRight: 16,
    width: 48,
    height: 48,
  },
  reviewRating: {
    color: theme.colors.primary,
    fontWeight: theme.fontWeights.bold,
    textAlign: 'center',
  },
  elem: {
    marginBottom: 8,
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryInfo = ({ repository }) => {
  return (
    <View testID="repositoryInfo">
      {repository && <RepositoryItem item={repository} />}
      <View style={styles.buttonContainer}>
        <Pressable onPress={() => Linking.openURL(repository.url)}>
          <Text style={styles.button} fontWeight="bold">Open in GitHub</Text>
        </Pressable>
      </View>
    </View>
  );
};

const ReviewItem = ({ review }) => {
  return (
    <View style={styles.item} testID="reviewItem">
      <View style={styles.rowContainer}>
        <View style={styles.reviewRatingContainer}>
          <Text style={styles.reviewRating} color="primary" fontWeight="bold">{review.rating}</Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.elem} fontSize="subheading" fontWeight="bold">{review.user.username}</Text>
          <Text style={styles.elem} color="textSecondary">{format(new Date(review.createdAt), 'dd.MM.yy')}</Text>
          <Text style={styles.elem}>{review.text}</Text>
        </View>
      </View>
    </View>
  );
};

export const SingleRepositoryContainer = ({ repository, onEndReach }) => {
  const reviewNodes = repository && repository.reviews
    ? repository.reviews.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => (
        <View>
          <RepositoryInfo repository={repository} />
          <ItemSeparator></ItemSeparator>
        </View>
      )}
      ItemSeparatorComponent={ItemSeparator}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
}

const SingleRepository = () => {
  const id = useParams().id;
  const { repository, fetchMore } = useRepository({ repositoryId: id, first: 2 });

  const onEndReach = () => {
    fetchMore();
  };

  return (
    <SingleRepositoryContainer
      repository={repository}
      onEndReach={onEndReach}
    />
  );
};

export default SingleRepository;