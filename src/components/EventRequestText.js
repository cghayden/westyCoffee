import React from 'react';
import styled from 'styled-components';
import PortableText from './PortableText';

const EventRequestTextStyles = styled.div`
  margin: 2rem auto;
  max-width: 75%;
  p {
    margin: 0.5rem;
    line-height: 1.4;
  }
`;

function EventRequestText({ node }) {
  console.log('event request node', node);
  return (
    <EventRequestTextStyles>
      {node && <PortableText blocks={node._rawContent} />}
    </EventRequestTextStyles>
  );
}

export default EventRequestText;
