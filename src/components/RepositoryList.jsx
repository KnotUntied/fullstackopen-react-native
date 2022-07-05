import { useState } from 'react';
import { FlatList, Picker, Pressable, StyleSheet, View } from 'react-native';
import { useNavigate } from "react-router-dom";
import RepositoryItem from './RepositoryItem';

import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  picker: {
    padding: 24,
    borderWidth: 0,
  }
});

const sortMap = {
  "latest": {
    orderDirection: 'DESC',
    orderBy: 'CREATED_AT'
  },
  "highest": {
    orderDirection: 'DESC',
    orderBy: 'RATING_AVERAGE'
  },
  "lowest": {
    orderDirection: 'ASC',
    orderBy: 'RATING_AVERAGE'
  }
}

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryItemPressable = ({ item, onPress }) => {
  return (
    <Pressable onPress={onPress} style={{ zIndex: 0.5 }}>
      <RepositoryItem item={item} />
    </Pressable>
  );
};

export const RepositoryListContainer = ({ repositories, sortRepositories }) => {
  const [sort, setSort] = useState({
    orderDirection: 'DESC',
    orderBy: 'CREATED_AT'
  });
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
      ListHeaderComponent={() => (
        <Picker
          selectedValue={sort}
          onValueChange={(itemValue, itemIndex) => {
            setSort(itemValue);
            sortRepositories(sortMap[itemValue]);
          }}
          prompt="Select an item..."
          style={styles.picker}
        >
          <Picker.Item
            label="Latest repositories"
            value="latest"
          />
          <Picker.Item
            label="Highest rated repositories"
            value="highest"
          />
          <Picker.Item
            label="Lowest rated repositories"
            value="lowest"
          />
        </Picker>
      )}
    />
  );
};

const RepositoryList = () => {
  const { repositories, sortRepositories } = useRepositories(sortMap['latest']);

  return <RepositoryListContainer repositories={repositories} sortRepositories={sortRepositories} />;
};

export default RepositoryList;