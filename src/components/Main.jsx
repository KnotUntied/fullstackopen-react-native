import { StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';

import AppBar from './AppBar';
import SingleRepository from './SingleRepository';
import RepositoryList from './RepositoryList';
import ReviewList from './ReviewList';
import NewReview from './NewReview';
import SignUp from './SignUp';
import SignIn from './SignIn';
import SignOut from './SignOut';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.mainBackground,
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} exact />
        <Route path="/register" element={<SignUp />} exact />
        <Route path="/login" element={<SignIn />} exact />
        <Route path="/logout" element={<SignOut />} exact />
        <Route path="/repositories/:id" element={<SingleRepository />} exact />
        <Route path="/reviews" element={<ReviewList />} exact />
        <Route path="/new-review" element={<NewReview />} exact />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;