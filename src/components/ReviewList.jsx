import { FlatList, StyleSheet, View } from 'react-native';
import ReviewItem from './ReviewItem';

import useMyReviews from '../hooks/useMyReviews';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

export const ReviewListContainer = ({ reviews, onEndReach }) => {
  const reviewNodes = reviews
    ? reviews.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => (
        <ReviewItem
          item={item}
          parentType="user"
        />
      )}
      keyExtractor={item => item.id}
      ItemSeparatorComponent={ItemSeparator}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

const ReviewList = () => {
  const { reviews, fetchMore } = useMyReviews({ first: 5 });

  const onEndReach = () => {
    fetchMore();
  };

  return (
    <ReviewListContainer
      reviews={reviews}
      onEndReach={onEndReach}
    />
  );
};

export default ReviewList;