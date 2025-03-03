import React from 'react';
import { FaStar } from 'react-icons/fa';

const Rating = ({ value }) => {
  const stars = Array.from({ length: 5 }, (_, index) => (
    <FaStar key={index} color={index < value ? '#ffc107' : '#e4e5e9'} />
  ));

  return <div>{stars}</div>;
};

export default Rating;