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
          altText
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

const BlogPostTemplate = (props) => {
  const { data, errors } = props;
  console.log('data', data);
  const post = data && data.post;
  const bg = data.siteSettings.backgroundImage
    ? `url(${data.siteSettings.backgroundImage.asset.gatsbyImageData.images.fallback.src})`
    : data.siteSettings.backgroundColor.hex;
  return (
    <Layout bg={bg}>
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
    </Layout>
  );
};

export default BlogPostTemplate;
