import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import PortableText from './PortableText';
import ShareLinks from './ShareLinks';
import dayjs from 'dayjs';

const BlogHeader = styled.div`
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
  width: 80%;
  max-width: 400px;
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
    <main>
      <div className='contentBox'>
        <BlogHeader>
          <h1>{title}</h1>
          <aside>
            {publishedAt && (
              <p>{dayjs(props.publishedAt).format('MMMM DD, YYYY')}</p>
            )}
          </aside>
        </BlogHeader>
        {mainImage && mainImage.asset && (
          <ImageDiv>
            <GatsbyImage image={image} alt={props.mainImage.alt} />
          </ImageDiv>
        )}
        {/* <ShareLinks url={window.location.href} text={_rawExcerpt} /> */}
        <BlogBody className='contentBox'>
          {_rawBody && <PortableText blocks={_rawBody} />}
        </BlogBody>
      </div>
    </main>
  );
}

export default BlogPost;
