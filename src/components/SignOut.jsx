import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useSignOut from '../hooks/useSignOut';

const SignOut = () => {
  const navigate = useNavigate();
  const [signOut] = useSignOut();

  useEffect(() => {
    signOut();
    navigate('/');
  }, []);

  return <div />;
};

export default SignOut;