import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';

import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.textPrimary,
    color: 'white',
    padding: 12,
    paddingTop: 12 + Constants.statusBarHeight,
    // ...
  },
  // ...
});

const AppBar = () => {
  return <View style={styles.container}>
    <AppBarTab>Repositories</AppBarTab>
  </View>;
};

export default AppBar;