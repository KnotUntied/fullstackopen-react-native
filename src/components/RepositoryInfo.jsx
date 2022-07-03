import { Pressable, StyleSheet, View } from 'react-native';
import { useParams } from "react-router-dom";
import Text from './Text';
import * as Linking from 'expo-linking';
import RepositoryItem from './RepositoryItem';

import useRepository from '../hooks/useRepository';

import theme from '../theme';

const styles = StyleSheet.create({
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

export const RepositoryInfoContainer = ({ repository }) => {
  return (
    <View testID="repositoryInfo">
      <RepositoryItem item={repository} />
      <View style={styles.buttonContainer}>
        <Pressable onPress={() => Linking.openURL(repository.url)}>
          <Text style={styles.button} fontWeight='bold'>Open in GitHub</Text>
        </Pressable>
      </View>
    </View>
  );
};

const RepositoryInfo = () => {
  const id = useParams().id;
  const { repository } = useRepository(id);

  return repository && <RepositoryInfoContainer repository={repository} />;
};

export default RepositoryInfo;