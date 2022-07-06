import { StyleSheet, View } from 'react-native';
import Text from './Text';

import { format } from 'date-fns'

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
  item: {
    backgroundColor: 'white',
    padding: 16,
  },
  reviewRatingContainer: {
    borderRadius: 24,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    justifyContent: 'center',
    marginRight: 16,
    width: 48,
    height: 48,
  },
  reviewRating: {
    color: theme.colors.primary,
    fontWeight: theme.fontWeights.bold,
    textAlign: 'center',
  },
  elem: {
    marginBottom: 8,
  }
});

const ReviewItem = ({ item, parentType = 'repository' }) => {
  return (
    <View style={styles.item} testID="reviewItem">
      <View style={styles.rowContainer}>
        <View style={styles.reviewRatingContainer}>
          <Text style={styles.reviewRating} color="primary" fontWeight="bold">{item.rating}</Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.elem} fontSize="subheading" fontWeight="bold">
            {parentType === 'user' ? item.repositoryId : item.user.username}
          </Text>
          <Text style={styles.elem} color="textSecondary">{format(new Date(item.createdAt), 'dd.MM.yy')}</Text>
          <Text style={styles.elem}>{item.text}</Text>
        </View>
      </View>
    </View>
  );
};

export default ReviewItem;