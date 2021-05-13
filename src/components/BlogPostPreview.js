import { Link } from 'gatsby';
import React from 'react';
import { getBlogUrl } from '../utils/helpers';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import dayjs from 'dayjs';
import PortableText from './PortableText';
import styled from 'styled-components';

// import { buildImageObj, cn, getBlogUrl } from "../lib/helpers";
// import { imageUrlFor } from "../lib/image-url";
// import * as styles from "./blog-post-preview.module.css";
// import { responsiveTitle3 } from "./typography.module.css";
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
function BlogPostPreview(props) {
  // console.log('BlogPostPreview props', props);
  const image = props.mainImage.asset.gatsbyImageData;
  return (
    <Link to={getBlogUrl(props.slug.current)}>
      <div>
        {props.mainImage && props.mainImage.asset && (
          <GatsbyImage
            layout='constrained'
            image={image}
            alt={props.mainImage.alt}
          />
        )}
      </div>
      <BlogPreviewText>
        <h2>{props.title}</h2>
        {props._rawExcerpt && (
          <div>
            <PortableText blocks={props._rawExcerpt} />
          </div>
        )}
        {/* <div>{format(props.publishedAt, 'MMMM Do, YYYY')}</div> */}
        <Date>{dayjs(props.publishedAt).format('MMMM DD, YYYY')}</Date>
      </BlogPreviewText>
    </Link>
  );
}

export default BlogPostPreview;
