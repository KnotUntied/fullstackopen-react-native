import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { useParams } from "react-router-dom";
import Text from './Text';
import * as Linking from 'expo-linking';
import RepositoryItem from './RepositoryItem';
import ReviewItem from './ReviewItem';

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

export const SingleRepositoryContainer = ({ repository, onEndReach }) => {
  const reviewNodes = repository && repository.reviews
    ? repository.reviews.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => <ReviewItem item={item} />}
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