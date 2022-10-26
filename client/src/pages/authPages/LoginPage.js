import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import {
  authPageFadeInVariants,
  authFadeInUpVariants,
  staggerOne,
} from 'utilities/motionUtils';

import { AUTH_BACKGROUND, SERVER_ROOT } from 'requestUrls.js';

import { userLogedIn } from 'redux/auth/authSlice';
import Error from 'components/ui/Error';
import useAuthCheck from 'hooks/useAuthCheck';
import { selectAuth } from 'redux/auth/authSelector';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authChecked = useAuthCheck();

  const auth = useSelector(selectAuth);

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (auth?.user && auth?.tokens) {
      navigate('/admin');
    } else {
      navigate('/login');
    }
  }, [auth]);

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    axios
      .post(`${SERVER_ROOT}/auth/login`, { email, password })
      .then((res) => {
        setIsLoading(false);
        setError('');
        dispatch(userLogedIn(res.data));
        navigate('/admin');
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.response.data.message);
      });
  }

  return (
    <motion.div
      variants={authPageFadeInVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="relative h-screen w-screen grid justify-center items-center"
      style={{
        backgroundImage: `url('${AUTH_BACKGROUND}')`,
      }}
    >
      <div className="absolute top-0 bottom-0 left-0 right-0 bg-black opacity-30"></div>

      <motion.form
        variants={staggerOne}
        initial="initial"
        animate="animate"
        exit="exit"
        className="z-10 min-w-[420px] min-h-[550px] bg-black bg-opacity-80 rounded-xl pt-[20%] text-white grid justify-center"
        onSubmit={handleSubmit}
      >
        <motion.div
          className="min-w-[320px] "
          variants={staggerOne}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <motion.h2
            variants={authFadeInUpVariants}
            className="text-3xl text-white flex w-full"
          >
            Sign In
          </motion.h2>
          <motion.div
            variants={authFadeInUpVariants}
            className="w-full my-4 mt-8"
          >
            <input
              className="w-full p-3 rounded-md bg-gray-600"
              type="text"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </motion.div>
          <motion.div variants={authFadeInUpVariants} className="w-full">
            <input
              className="w-full p-3 rounded-md bg-gray-600"
              type="password"
              name="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </motion.div>
          {error && <Error className="mt-2" message={error} />}
          <motion.button
            type="submit"
            variants={authFadeInUpVariants}
            className="w-full bg-red-700 rounded-md mt-8 p-3 items-center"
            disabled={isLoading}
          >
            Sine In
          </motion.button>
          <motion.button
            type="button"
            variants={authFadeInUpVariants}
            className="w-full bg-gray-700 rounded-md mt-4 p-3 items-center"
            disabled={isLoading}
          >
            Sign in anonymously
          </motion.button>
        </motion.div>
      </motion.form>
    </motion.div>
  );
};

export default LoginPage;
