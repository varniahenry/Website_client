'use client';

import React from 'react';
import type { Block } from '@/types';
import { Fade, AnimationType } from '@/src/components/Transitions/Fade';
import dynamic from 'next/dynamic';
// Import your block components
import { EventBlock } from './blocks/EventBlock';
import { Paragraph } from './blocks/Paragraph';
import { Hero } from './blocks/Hero';
import { FullImage } from './blocks/FullImage';
import { SectionWithParagraph } from './blocks/SectionWithParagraph';
// import { Gallery } from './blocks/Gallery';
import { Heading } from './blocks/Heading';
import { Subscribe } from './blocks/Subscribe';

const Gallery = dynamic(
  () => import('./blocks/Gallery').then((mod) => mod.Gallery),
  { ssr: false }
);

// ---------------------------
// Map Strapi block components
// ---------------------------
// Use `any` for props since each block has different props
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const COMPONENT_MAP: Record<string, React.ComponentType<any>> = {
  'blocks.event-block': EventBlock,
  'blocks.paragraph': Paragraph,
  'blocks.hero': Hero,
  'blocks.image': FullImage,
  'blocks.section-with-paragraph': SectionWithParagraph,
  'blocks.gallery': Gallery,
  'blocks.heading': Heading,
  'blocks.subscribe': Subscribe,
};

// ---------------------------
// Per-block animations
// ---------------------------
const BLOCK_ANIMATIONS: Record<string, AnimationType> = {
  'blocks.hero': 'fade-up',
  'blocks.paragraph': 'fade-left',
  'blocks.image': 'fade-right',
  'blocks.section-with-paragraph': 'scale-up',
  'blocks.gallery': 'fade-up',
  'blocks.heading': 'fade-up',
  'blocks.subscribe': 'fade-left',
  'blocks.event-block': 'fade-up',
};

function isBlockEmpty(block: Block): boolean {
  switch (block.__component) {
    case 'blocks.paragraph':
      return !block.content?.trim();
    case 'blocks.heading':
      return !block.heading?.trim();
    case 'blocks.hero':
      return !block.heading?.trim() && !block.image;
    case 'blocks.gallery':
      return !block.images?.length;
    case 'blocks.section-with-paragraph':
      return !block.content?.trim();
    case 'blocks.event-block':
      return !block.events?.length;
    case 'blocks.image':
      return !block.image?.url;
    case 'blocks.subscribe':
      return !block.headline?.trim() && !block.content?.trim();
    default:
      return false;
  }
}

// ---------------------------
// Render blocks dynamically
// ---------------------------
export function BlockRenderer({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks
        .filter((block) => !isBlockEmpty(block))
        .map((block, index) => {
          if (!block.__component) return null;

          const Component = COMPONENT_MAP[block.__component];
          if (!Component) return null;

          const animation: AnimationType =
            BLOCK_ANIMATIONS[block.__component] ?? 'fade-up';
          const props =
            block.__component === 'blocks.gallery'
              ? { ...block, ...(block.id && { documentId: block.id }) }
              : block;
          // Spread the block object as props for the component
          return (
            <Fade
              key={block.id ?? index}
              index={index}
              animation={animation}>
              <Component {...props} />
            </Fade>
          );
        })}
    </>
  );
}
