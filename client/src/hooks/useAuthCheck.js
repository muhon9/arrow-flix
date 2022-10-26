import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { userLogedIn } from 'redux/auth/authSlice';

const useAuthCheck = () => {
  const dispatch = useDispatch();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const localAuth = localStorage?.getItem('auth');

    if (localAuth) {
      const auth = JSON.parse(localAuth);
      if (auth?.user && auth?.tokens) {
        dispatch(
          userLogedIn({
            user: auth?.user,
            tokens: auth?.tokens,
          })
        );
      }
    }

    // setTimeout(() => {
    //   setAuthChecked(true);
    // }, 3000);
    setAuthChecked(true);
  }, [authChecked, dispatch]);

  return authChecked;
};

export default useAuthCheck;
