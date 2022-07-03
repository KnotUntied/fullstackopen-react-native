import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { View } from 'react-native';
import useSignOut from '../hooks/useSignOut';

const SignOut = () => {
  const navigate = useNavigate();
  const [signOut] = useSignOut();

  useEffect(() => {
    signOut();
    navigate('/');
  }, []);

  return <View />;
};

export default SignOut;