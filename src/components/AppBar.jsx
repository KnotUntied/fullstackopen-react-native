import { View, StyleSheet } from 'react-native';
import { Link } from "react-router-native";
import Text from './Text';
import Constants from 'expo-constants';

import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.textPrimary,
    color: 'white',
    padding: 24,
    paddingTop: 24 + Constants.statusBarHeight,
    flexDirection: 'row',
  },
  tab: {
    color: 'white',
    marginRight: 24,
  },
});

const AppBarTab = ({ to, children }) => {
  return (
    <View>
      <Link to={to}>
        <Text fontWeight="bold" fontSize="subheading" style={styles.tab}>{children}</Text>
      </Link>
    </View>
  );
};

const AppBar = () => {
  return (
    <View style={styles.container}>
      <AppBarTab to='/'>Repositories</AppBarTab>
      <AppBarTab to='/login'>Sign In</AppBarTab>
    </View>
  );
};

export default AppBar;