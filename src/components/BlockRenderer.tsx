import type { Block } from '@/types';

import { EventBlock } from './blocks/EventBlock';
import { Paragraph } from './blocks/Paragraph';
import { Hero } from './blocks/Hero';
import { FullImage } from './blocks/FullImage';
import { SectionWithParagraph } from './blocks/SectionWithParagraph';
import { Gallery } from './blocks/Gallery';
import { Heading } from './blocks/Heading';
import { Subscribe } from './blocks/Subscribe';

function blockRenderer(block: Block, index: number) {
  switch (block.__component) {
    case `blocks.event-block`:
      return (
        <EventBlock
          {...block}
          key={index}
        />
      );
    case 'blocks.paragraph':
      return (
        <Paragraph
          {...block}
          key={index}
        />
      );
    case 'blocks.hero':
      return (
        <Hero
          {...block}
          key={index}
        />
      );
    case 'blocks.heading':
      return (
        <Heading
          {...block}
          key={index}
        />
      );
    case 'blocks.image':
      return (
        <FullImage
          {...block}
          key={index}
        />
      );
    case 'blocks.section-with-paragraph':
      return (
        <SectionWithParagraph
          {...block}
          key={index}
        />
      );
    case 'blocks.gallery':
      return (
        <Gallery
          {...block}
          key={index}
        />
      );
    case 'blocks.subscribe':
      return (
        <Subscribe
          {...block}
          key={index}
        />
      );
  }
}

export function BlockRenderer({ blocks }: { blocks: Block[] }) {
  return blocks.map((block, index) => blockRenderer(block, index));
}
