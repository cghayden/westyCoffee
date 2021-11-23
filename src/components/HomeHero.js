import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import PortableText from '../components/PortableText';
const HeroStyles = styled.div`
  display: grid;
`;
const OverlayContainer = styled.div`
  place-items: center;
  grid-row: 1/-1;
  grid-column: 1/-1;
  display: grid;
  position: relative;
`;
const OverLayTextContainer = styled.div`
  background: hsla(0, 0%, 0%, 0.55);
  color: #d5e5d5;
  padding: 1rem 2rem;
`;

export default function Hero({ src, textOverlay }) {
  return (
    <HeroStyles>
      <GatsbyImage
        layout='fullWidth'
        style={{ gridArea: '1 / 1' }}
        // You can optionally force an aspect ratio for the generated image
        // aspectRatio={4 / 5}
        alt=''
        image={src}
        formats={['auto', 'webp', 'avif']}
      />
      {textOverlay && (
        <OverlayContainer>
          <OverLayTextContainer>
            <PortableText blocks={textOverlay} />
          </OverLayTextContainer>
        </OverlayContainer>
      )}
    </HeroStyles>
  );
}
