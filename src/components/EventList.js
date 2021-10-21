import dayjs from 'dayjs';
import React from 'react';
import styled from 'styled-components';
import PortableText from './PortableText';
import { GatsbyImage } from 'gatsby-plugin-image';

const EventListUlStyles = styled.ul`
  display: grid;
  grid-gap: 20px;
  margin: 0 auto;
  h2 {
    font-size: 1.3rem;
    margin: 0.5rem 0;
  }
`;
const Date = styled.div`
  font-size: 15px;
  margin: 0.5rem 0;
  @media screen and (min-width: 767px) {
    font-size: 0.9em;
  }
`;

export default function EventList(props) {
  return (
    <div>
      <EventListUlStyles>
        {props.nodes &&
          props.nodes.map((node) => <EventListing eventData={node} />)}
      </EventListUlStyles>
    </div>
  );
}

const ImageDiv = styled.div`
  min-width: 290px;
  margin-bottom: 1rem;
`;

const ImageAndContentWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-content: center;
`;

const TextWrapper = styled.div`
  max-width: 70%;
  min-width: 296px;
`;

function EventListing({ eventData }) {
  const image = eventData.mainImage?.asset.gatsbyImageData;
  return (
    <li className='contentBox' key={eventData.id}>
      <h2>{eventData.title}</h2>
      <div>
        <Date>{dayjs(eventData.date).format('MMMM DD, YYYY')}</Date>
        <ImageAndContentWrapper>
          {image && (
            <ImageDiv>
              <GatsbyImage image={image} alt={image.alt || 'event image'} />
            </ImageDiv>
          )}
          <TextWrapper>
            <PortableText blocks={eventData._rawDescription} />
          </TextWrapper>
        </ImageAndContentWrapper>
      </div>
    </li>
  );
}
