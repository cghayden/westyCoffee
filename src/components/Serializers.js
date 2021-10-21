import React from 'react';
import MainImage from './MainImage';

const serializers = {
  types: {
    mainImage: ({ node }) => <MainImage mainImage={node} />,
  },
};

export default serializers;
