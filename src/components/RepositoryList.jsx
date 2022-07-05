import { useState } from 'react';
import { FlatList, Picker, Pressable, StyleSheet, View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { useNavigate } from "react-router-dom";
import { useDebounce } from 'use-debounce';
import RepositoryItem from './RepositoryItem';

import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  header: {
    padding: 16,
  },
  picker: {
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

export const RepositoryListContainer = ({ repositories, sortRepositories, searchRepositories }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery] = useDebounce(debouncedSearchQuery, 500);
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
      ListHeaderComponent={
        // https://stackoverflow.com/a/69840602
        <View style={styles.header}>
          <Searchbar
            placeholder="Search"
            onChangeText={query => {
              setSearchQuery(query);
              searchRepositories(query);
            }}
            value={debouncedSearchQuery}
          />
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
        </View>
      }
    />
  );
};

const RepositoryList = () => {
  const { repositories, sortRepositories, searchRepositories } = useRepositories({...sortMap['latest'], searchKeyword: ''});

  return (
    <RepositoryListContainer
      repositories={repositories}
      sortRepositories={sortRepositories}
      searchRepositories={searchRepositories}
    />
  );
};

export default RepositoryList;