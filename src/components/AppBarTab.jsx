import { Pressable, StyleSheet, View } from 'react-native';
import Text from './Text';

import theme from '../theme';

const styles = StyleSheet.create({
  tab: {
    color: 'white',
    // ...
  },
  // ...
});

const AppBarTab = ({ children }) => {
  return <Pressable>
    <View>
      <Text fontWeight="bold" fontSize="subheading" style={styles.tab}>{children}</Text>
    </View>
  </Pressable>;
};

export default AppBarTab;