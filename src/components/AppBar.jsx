import { View, ScrollView, StyleSheet } from 'react-native';
import { Link } from "react-router-native";
import { useQuery } from '@apollo/client';
import Text from './Text';
import Constants from 'expo-constants';

import theme from '../theme';

import useAuthStorage from '../hooks/useAuthStorage';
import { ME } from '../graphql/queries';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.textPrimary,
    color: 'white',
    padding: 16,
    paddingTop: 16 + Constants.statusBarHeight,
    flexDirection: 'row',
  },
  tab: {
    color: 'white',
    marginRight: 16,
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
  const { loading, error, data } = useQuery(ME, {
    fetchPolicy: 'network-only',
  });

  const auth = data && data.me
    ? <AppBarTab to='/logout'>Sign Out</AppBarTab>
    : <AppBarTab to='/login'>Sign In</AppBarTab>;

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab to='/'>Repositories</AppBarTab>
        {auth}
      </ScrollView>
    </View>
  );
};

export default AppBar;