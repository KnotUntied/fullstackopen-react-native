import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { useNavigate } from "react-router-dom";
import RepositoryItem from './RepositoryItem';

import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryItemPressable = ({ item, onPress }) => {
  return (
    <Pressable onPress={onPress} style={{ zIndex: 0.5 }}>
      <RepositoryItem item={item} />
    </Pressable>
  );
};

export const RepositoryListContainer = ({ repositories }) => {
  const navigate = useNavigate();
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      renderItem={({ item }) => (
        <RepositoryItemPressable
          item={item}
          onPress={() => navigate(`/repositories/${item.id}`)}
        />
      )}
      keyExtractor={item => item.id}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

const RepositoryList = () => {
  const { repositories } = useRepositories();

  return <RepositoryListContainer repositories={repositories} />;
};

export default RepositoryList;