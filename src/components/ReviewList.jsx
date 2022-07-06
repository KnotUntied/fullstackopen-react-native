import { FlatList, StyleSheet, View } from 'react-native';
import ReviewItem from './ReviewItem';

import useMyReviews from '../hooks/useMyReviews';
import { useNavigate } from "react-router-dom";
import useDeleteReview from '../hooks/useDeleteReview';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

export const ReviewListContainer = ({ reviews, onEndReach, viewRepository, deleteReview }) => {
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
          viewRepository={viewRepository}
          deleteReview={deleteReview}
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
  const { reviews, fetchMore, refetch } = useMyReviews({ first: 5 });
  const navigate = useNavigate();
  const [deleteReview] = useDeleteReview();

  const onEndReach = () => {
    fetchMore();
  };

  const viewRepository = repositoryId => {
    navigate(`/repositories/${repositoryId}`);
  }

  const deleteReviewAndRefetch = reviewId => {
    deleteReview(reviewId);
    refetch();
  }

  return (
    <ReviewListContainer
      reviews={reviews}
      onEndReach={onEndReach}
      viewRepository={viewRepository}
      deleteReview={deleteReviewAndRefetch}
    />
  );
};

export default ReviewList;