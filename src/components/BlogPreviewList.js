import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import BlogPostPreview from './BlogPostPreview';

// import * as styles from "./blog-post-preview-list.module.css";

const BlogPreviewUlStyles = styled.ul`
  display: grid;
  grid-gap: 20px;
  margin: 0 auto;
  width: 95%;
  a {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-gap: 10px;
    background: white;
  }
`;

export default function BlogPreviewList(props) {
  return (
    <div>
      {props.title && <h2>{props.title}</h2>}
      <BlogPreviewUlStyles>
        {props.nodes &&
          props.nodes.map((node) => (
            <li key={node.id}>
              <BlogPostPreview {...node} />
            </li>
          ))}
      </BlogPreviewUlStyles>
      {props.browseMoreHref && (
        <div className={styles.browseMoreNav}>
          <Link to={props.browseMoreHref}>Browse more</Link>
        </div>
      )}
    </div>
  );
}

BlogPreviewList.defaultProps = {
  title: '',
  nodes: [],
  browseMoreHref: '',
};
