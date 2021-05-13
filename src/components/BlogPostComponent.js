import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import PortableText from './PortableText';
import ShareLinks from './ShareLinks';
import dayjs from 'dayjs';

// import { format, distanceInWords, differenceInDays } from "date-fns";
// import { buildImageObj } from "../lib/helpers";
// import { imageUrlFor } from "../lib/image-url";
// import Container from "./container";
// import AuthorList from "./author-list";

// import * as styles from "./blog-post.module.css";
const Container = styled.div`
  max-width: 960px;
  padding: 1.5em;
  margin: 0 auto;
  h2 {
    font-size: 1.5rem;
    margin: 0.5em 0;
  }
  @media screen and (max-width: 600px) {
    padding: 0.5em;
    h1 {
      font-size: 1.5rem;
    }
    h2 {
      font-size: 1.2rem;
    }
  }
`;
const BlogHeader = styled.div`
  color: var(--white);
  h1 {
    margin: 0.5em 0 0.25rem 0;
    font-size: 1.9rem;
  }
  aside {
    margin-left: auto;
    margin-bottom: 0.5rem;
  }
`;
const ImageDiv = styled.div`
  text-align: center;
  max-width: 95%;
  margin: 0 auto;
`;
const BlogBody = styled.article`
  a {
    margin: 0;
    padding: 0;
    color: darkblue;
    text-decoration: underline;
  }
`;

function BlogPost(props) {
  const { _rawBody, title, mainImage, publishedAt } = props;
  const image = props.mainImage.asset.gatsbyImageData;

  return (
    <Container>
      {mainImage && mainImage.asset && (
        <ImageDiv>
          <GatsbyImage image={image} alt={props.mainImage.alt} />
        </ImageDiv>
      )}
      <main>
        <BlogHeader>
          <h1>{title}</h1>
          <aside>
            {publishedAt && (
              <p>{dayjs(props.publishedAt).format('MMMM DD, YYYY')}</p>
            )}
          </aside>
        </BlogHeader>
        {/* <ShareLinks url={window.location.href} text={_rawExcerpt} /> */}
        <BlogBody className='contentBox'>
          {_rawBody && <PortableText blocks={_rawBody} />}
        </BlogBody>
      </main>
    </Container>
  );
}

export default BlogPost;
