import React from 'react';
import { graphql } from 'gatsby';
import { mapEdgesToNodes } from '../utils/helpers';
import SEO from '../components/SEO';
import EventList from '../components/EventList';
import EventRequestText from '../components/EventRequestText';
import Layout from '../components/Layout';
export default function eventsPage({ data, errors }) {
  // console.log('data', data);
  if (errors) {
    return <GraphQLErrorList errors={errors} />;
  }
  const eventNodes = (data || {}).events ? mapEdgesToNodes(data.events) : [];
  return (
    <Layout>
      <SEO title={'Events'} />
      <main>
        <h1 className='alignCenter whiteText'>events</h1>
        {data?.contentQuery && <EventRequestText node={data.contentQuery} />}
        {eventNodes && <EventList nodes={eventNodes} />}
      </main>
    </Layout>
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
          mainImage {
            asset {
              gatsbyImageData(
                fit: FILL
                formats: AUTO
                placeholder: DOMINANT_COLOR
              )
            }
          }
        }
      }
    }
    contentQuery: sanityTextBlock(name: { eq: "Event Page Content" }) {
      id
      heading
      _rawContent
    }
  }
`;
