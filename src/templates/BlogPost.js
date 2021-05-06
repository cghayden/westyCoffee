import React from 'react';
import { graphql } from 'gatsby';
// import Container from "../components/container";
import GraphQLErrorList from '../components/GraphqlErrorList';
import BlogPostComponent from '../components/BlogPostComponent';
import SEO from '../components/SEO';
// import SEO from "../components/seo";
// import Layout from "../containers/layout";
import { toPlainText } from '../utils/helpers';

export const query = graphql`
  query BlogPostTemplateQuery($id: String!) {
    post: sanityPost(id: { eq: $id }) {
      id
      publishedAt
      mainImage {
        asset {
          gatsbyImageData(
            width: 400
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
          )
        }
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
    <div>
      {/* {errors && <SEO title='GraphQL Error' />} */}
      {post && (
        <SEO
          title={post.title || 'Untitled'}
          description={toPlainText(post._rawExcerpt)}
          // image={post.mainImage}
        />
      )}

      {errors && (
        <div>
          <GraphQLErrorList errors={errors} />
        </div>
      )}

      {post && <BlogPostComponent {...post} />}
    </div>
  );
};

export default BlogPostTemplate;
