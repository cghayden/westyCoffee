import React from 'react';
import clientConfig from '../../client-config';
import BasePortableText from '@sanity/block-content-to-react';
import serializers from './Serializers';

const PortableText = ({ blocks, classNames = '' }) => (
  <BasePortableText
    blocks={blocks}
    serializers={serializers}
    className={classNames}
    {...clientConfig.sanity}
  />
);

export default PortableText;
