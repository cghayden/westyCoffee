import dayjs from 'dayjs';
import React from 'react';
import styled from 'styled-components';
import PortableText from './PortableText';

// import * as styles from "./blog-post-preview-list.module.css";

const EventListUlStyles = styled.ul`
  display: grid;
  grid-gap: 20px;
  margin: 0 auto;
  width: 95%;
  h2 {
    font-size: 1.3rem;
    margin: 0.5rem 0;
  }
`;
const Date = styled.div`
  font-size: 14px;
  margin: 0.5rem 0;
  @media screen and (min-width: 767px) {
    font-size: 0.9em;
  }
`;

const EventInfoStyles = styled.div`
  margin-left: 2rem;
`;
export default function EventList(props) {
  //   console.log('events props', props.nodes);
  return (
    <div>
      <EventListUlStyles>
        {props.nodes &&
          props.nodes.map((node) => (
            <li key={node.id}>
              <h2>{node.title}</h2>
              <EventInfoStyles>
                <Date>{dayjs(node.date).format('MMMM DD, YYYY')}</Date>
                <div>
                  <PortableText blocks={node._rawDescription} />
                </div>
              </EventInfoStyles>

              {/* <BlogPostPreview {...node} /> */}
            </li>
          ))}
      </EventListUlStyles>
    </div>
  );
}
