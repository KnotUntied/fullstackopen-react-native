import { Alert, Pressable, StyleSheet, View } from 'react-native';
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

const ReviewItem = ({ item, parentType='repository', viewRepository=null, deleteReview=null }) => {
  const createDeleteAlert = () =>
    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Delete',
          onPress: () => deleteReview(item.id)
        }
      ],
      {
        cancelable: true,
      }
    );

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
      {parentType === 'user' && (
      <View style={styles.rowContainer}>
        <Pressable onPress={() => viewRepository(item.repositoryId)} style={{ zIndex: 0.5, marginRight: 8, flex: 1 }}>
          <Text style={styles.button} fontWeight='bold'>View repository</Text>
        </Pressable>
        <Pressable onPress={createDeleteAlert} style={{ zIndex: 0.5, marginLeft: 8, flex: 1 }}>
          <Text style={[styles.button, { backgroundColor: theme.colors.red }]} fontWeight='bold'>Delete review</Text>
        </Pressable>
      </View>
      )}
    </View>
  );
};

export default ReviewItem;