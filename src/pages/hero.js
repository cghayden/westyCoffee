import * as React from 'react';
import { StaticImage } from 'gatsby-plugin-image';

export default function Hero() {
  return (
    <div style={{ display: 'grid' }}>
      {/* You can use a GatsbyImage component if the image is dynamic */}
      <StaticImage
        style={{
          gridArea: '1/1',
          // You can set a maximum height for the image, if you wish.
          // maxHeight: 600,
        }}
        layout='fullWidth'
        // You can optionally force an aspect ratio for the generated image
        aspectRatio={3 / 1}
        // This is a presentational image, so the alt should be an empty string
        alt=''
        // Assisi, Perúgia, Itália by Bernardo Ferrari, via Unsplash
        src={
          'https://images.unsplash.com/photo-1604975999044-188783d54fb3?w=2589'
        }
        formats={['auto', 'webp', 'avif']}
      />
      <div
        style={{
          // By using the same grid area for both, they are stacked on top of each other
          gridArea: '1/1',
          position: 'relative',
          // This centers the other elements inside the hero component
          placeItems: 'center',
          display: 'grid',
        }}
      >
        {/* Any content here will be centered in the component */}
        <h1>Hero text</h1>
      </div>
    </div>
  );
}
