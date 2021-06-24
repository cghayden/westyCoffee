import React from 'react';
import { graphql } from 'gatsby';
import GraphQLErrorList from '../components/GraphqlErrorList';
import BlogPostComponent from '../components/BlogPostComponent';
import SEO from '../components/SEO';
import { toPlainText } from '../utils/helpers';
import Layout from '../components/Layout';

export const query = graphql`
  query BlogPostTemplateQuery($id: String!) {
    post: sanityPost(id: { eq: $id }) {
      id
      publishedAt
      mainImage {
        asset {
          gatsbyImageData(
            fit: FILL
            placeholder: DOMINANT_COLOR
            formats: [AUTO, WEBP, AVIF]
          )
        }
        alt
        caption
      }
      title
      slug {
        current
      }
      _rawExcerpt(resolveReferences: { maxDepth: 5 })
      _rawBody(resolveReferences: { maxDepth: 5 })
    }
  }
`;

const BlogPostTemplate = (props) => {
  const { data, errors } = props;
  const post = data && data.post;

  return (
    <Layout>
      {post && (
        <SEO
          title={post.title || 'Untitled'}
          description={toPlainText(post._rawExcerpt)}
        />
      )}

      {errors && (
        <div>
          <GraphQLErrorList errors={errors} />
        </div>
      )}

      {post && <BlogPostComponent {...post} />}
    </Layout>
  );
};

export default BlogPostTemplate;
