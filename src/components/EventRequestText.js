import React from 'react';
import styled from 'styled-components';
import PortableText from './PortableText';

const EventRequestTextStyles = styled.div`
  /* max-width: 75%; */
  margin-left: auto;
  margin-right: auto;
  color: var(--white);
  margin-bottom: 0.5rem;
`;

function EventRequestText({ node }) {
  console.log('event request node', node);
  return (
    <EventRequestTextStyles className='alignCenter'>
      {node && <PortableText blocks={node._rawContent} />}
    </EventRequestTextStyles>
  );
}

export default EventRequestText;
