import clientConfig from '../../client-config';
import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder(clientConfig.sanity);

export function imageUrlFor(source) {
  source._ref = source._id;
  return builder.image(source);
}
