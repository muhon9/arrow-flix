import React from 'react';

const Error = ({ message = 'Not specified', className = '' }) => {
  return (
    <div className={`text-red-700 font-thin  ${className}`}>{message}</div>
  );
};

export default Error;
