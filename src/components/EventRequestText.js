import React from 'react';
import styled from 'styled-components';
import PortableText from './PortableText';

const EventRequestTextStyles = styled.div`
  margin-left: auto;
  margin-right: auto;
  color: var(--white);
  margin-bottom: 0.5rem;
`;

function EventRequestText({ node }) {
  return (
    <EventRequestTextStyles className='alignCenter'>
      {node && <PortableText blocks={node._rawContent} />}
    </EventRequestTextStyles>
  );
}

export default EventRequestText;
