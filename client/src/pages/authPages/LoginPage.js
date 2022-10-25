import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FcGoogle } from 'react-icons/fc';
import {
  authPageFadeInVariants,
  authFadeInUpVariants,
  staggerOne,
} from 'utilities/motionUtils';
import { AUTH_BACKGROUND } from 'requestUrls.js';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isLoading = false;

  function handleSubmit(e) {
    e.preventDefault();
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
            />
          </motion.div>
          <motion.div variants={authFadeInUpVariants} className="w-full">
            <input
              className="w-full p-3 rounded-md bg-gray-600"
              type="password"
              name="password"
              placeholder="Password"
            />
          </motion.div>
          <motion.button
            type="submit"
            variants={authFadeInUpVariants}
            className="w-full bg-red-700 rounded-md mt-12 p-3 items-center"
            disabled={isLoading}
          >
            Sing In
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
