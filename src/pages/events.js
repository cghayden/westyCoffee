import React from 'react';
import { graphql } from 'gatsby';
import { mapEdgesToNodes } from '../utils/helpers';
import SEO from '../components/SEO';
import EventList from '../components/EventList';
import Layout from '../components/Layout';
import styled from 'styled-components';
import PortableText from '../components/PortableText';

const EventRequestTextStyles = styled.div`
  margin-left: auto;
  margin-right: auto;
  color: var(--white);
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: center;
`;

export default function eventsPage({ data, errors }) {
  const pageHeading = data ? data.pageContent.heading : '';
  const topText = data?.pageContent._rawTopText;

  if (errors) {
    return <GraphQLErrorList errors={errors} />;
  }
  const eventNodes = (data || {}).events ? mapEdgesToNodes(data.events) : [];
  return (
    <Layout>
      <SEO title={'Events'} />
      <main>
        <h1 className='alignCenter whiteText'>{pageHeading}</h1>
        {topText && (
          <EventRequestTextStyles>
            <PortableText blocks={topText} />
          </EventRequestTextStyles>
        )}
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
                fit: CROP
                formats: AUTO
                placeholder: DOMINANT_COLOR
              )
            }
            alt
          }
        }
      }
    }
    pageContent: sanityEventsPage(_id: { eq: "eventsPage" }) {
      heading
      _rawTopText(resolveReferences: { maxDepth: 10 })
      _rawBottomText(resolveReferences: { maxDepth: 10 })
    }
    siteSettings: sanitySiteSettings(_id: { eq: "siteSettings" }) {
      backgroundImage {
        asset {
          gatsbyImageData(fit: FILL, formats: AUTO, placeholder: DOMINANT_COLOR)
        }
      }
      backgroundColor {
        hex
      }
    }
  }
`;
