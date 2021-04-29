import React from 'react';
import { graphql } from 'gatsby';
import { mapEdgesToNodes } from '../utils/helpers';
import SEO from '../components/SEO';
import EventList from '../components/EventList';
export default function eventsPage({ data, errors }) {
  if (errors) {
    return <GraphQLErrorList errors={errors} />;
  }
  const eventNodes = (data || {}).events ? mapEdgesToNodes(data.events) : [];
  return (
    <>
      <SEO title={'Events'} />
      <h1 className='pageHeader'>Events</h1>
      <main>{eventNodes && <EventList nodes={eventNodes} />}</main>
    </>
  );
}

export const query = graphql`
  query EventsPageQuery {
    events: allSanityEvent(sort: { fields: date, order: ASC }) {
      edges {
        node {
          id
          title
          date
          _rawDescription
          addressLine1
          addressLine2
          city
          state
          zipCode
          location
        }
      }
    }
  }
`;
