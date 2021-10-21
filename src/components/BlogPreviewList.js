import React from 'react';
import styled from 'styled-components';
import BlogPostPreview from './BlogPostPreview';

const BlogPreviewUlStyles = styled.ul`
  display: grid;
  grid-gap: 20px;
  margin: 0 auto;
  width: 95%;
  max-width: 800px;
  li {
    overflow: hidden;
  }
  a {
    height: 100%;
    display: grid;
    grid-template-columns: 50% 50%;
    place-items: center;
    grid-gap: 10px;
    background: white;
  }
`;

export default function BlogPreviewList(props) {
  return (
    <div className='blogPreviewWrapper'>
      <BlogPreviewUlStyles>
        {props.nodes &&
          props.nodes.map((node) => (
            <li key={node.id}>
              <BlogPostPreview {...node} />
            </li>
          ))}
      </BlogPreviewUlStyles>
    </div>
  );
}
