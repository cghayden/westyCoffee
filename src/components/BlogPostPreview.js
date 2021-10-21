import { Link } from 'gatsby';
import React from 'react';
import { getBlogUrl } from '../utils/helpers';
import { GatsbyImage } from 'gatsby-plugin-image';
import dayjs from 'dayjs';
import PortableText from './PortableText';
import styled from 'styled-components';

const BlogPreviewText = styled.div`
  h2 {
    font-size: 1.1rem;
    margin: 0.5rem 0;
  }
  div:first-of-type {
    margin: 0.5rem 0;
    font-size: 1rem;
  }
  p {
    font-size: 1em;
  }
  @media screen and (min-width: 767px) {
    h2 {
      font-size: 1.3rem;
    }
    div:first-of-type {
      font-size: 1.1rem;
    }
  }
`;
const Date = styled.div`
  font-size: 13px;
  @media screen and (min-width: 767px) {
    font-size: 0.9em;
  }
`;
const PreviewImageContainer = styled.div`
  max-width: 200px;
`;

function BlogPostPreview(props) {
  const image = props.mainImage.asset.gatsbyImageData;
  return (
    <Link to={getBlogUrl(props.slug.current)}>
      <PreviewImageContainer>
        {props.mainImage && props.mainImage.asset && (
          <GatsbyImage image={image} alt={props.mainImage.alt} />
        )}
      </PreviewImageContainer>
      <BlogPreviewText>
        <h2>{props.title}</h2>
        {props._rawExcerpt && (
          <div>
            <PortableText blocks={props._rawExcerpt} />
          </div>
        )}
        <Date>{dayjs(props.publishedAt).format('MMMM DD, YYYY')}</Date>
      </BlogPreviewText>
    </Link>
  );
}

export default BlogPostPreview;
