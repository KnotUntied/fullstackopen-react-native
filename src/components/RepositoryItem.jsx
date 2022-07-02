import { Image, StyleSheet, View } from 'react-native';
import Text from './Text';

import theme from '../theme';

const styles = StyleSheet.create({
  image: {
    borderRadius: 4,
    marginRight: 16,
    width: 32,
    height: 32,
  },
  language: {
    backgroundColor: theme.colors.primary,
    padding: 6,
    borderRadius: 4,
    color: 'white',
    flexShrink: 1,
    flexGrow: 0,
    alignSelf: 'flex-start'
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
  item: {
    backgroundColor: 'white',
    padding: 16,
  },
  stat: {
    textAlign: 'center'
  },
  elem: {
    marginBottom: 8,
  }
});

const RepositoryStat = ({ value, label }) => {
  return (
    <View style={styles.container} testID={label}>
      <Text style={[styles.elem, styles.stat]} fontWeight="bold">
        {
          value >= 1000
          ? `${(value / 1000).toFixed(1)}k`
          : value
        }
      </Text>
      <Text style={styles.stat} color="textSecondary">{label}</Text>
    </View>
  );
};

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.item} testID="repositoryItem">
      <View style={styles.rowContainer}>
        <Image
          style={styles.image}
          source={{ uri: item.ownerAvatarUrl }}
        />
        <View style={styles.container}>
          <Text style={styles.elem} fontWeight="bold">{item.fullName}</Text>
          <Text style={styles.elem} color="textSecondary">{item.description}</Text>
          <Text style={[styles.elem, styles.language]}>{item.language}</Text>
        </View>
      </View>
      <View style={styles.rowContainer}>
        <RepositoryStat value={item.stargazersCount} label="Stars"/>
        <RepositoryStat value={item.forksCount} label="Forks"/>
        <RepositoryStat value={item.reviewCount} label="Reviews"/>
        <RepositoryStat value={item.ratingAverage} label="Rating"/>
      </View>
    </View>
  );
};

export default RepositoryItem;