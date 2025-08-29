export interface LinkProps {
  id: number;
  text: string;
  href: string;
  isExternal: boolean;
}

export interface ImageProps {
  id: number;
  documentId: string;
  url: string;
  alternativeText: string;
  width?: number;
  height?: number;
}

export interface LogoProps {
  logoText: string;
  image: ImageProps;
}

export interface BlogPostProps {
  id: number;
  documentId: string;
  title: string;
  description: string;
  slug: string;
  image: ImageProps;
  author: string;
  date: string;
  createdAt: string;
  content: string;
}

export interface EventProps {
  venue: string;
  date: string;
  startTime: string;
  endTime: string;
  address: string;
  city: string;
  province: string;
  country: string;
  description: string;
}

type ComponentType =
  | 'blocks.hero'
  | 'blocks.event-block'
  | 'blocks.heading'
  | 'blocks.section-with-paragraph'
  | 'blocks.paragraph'
  | 'blocks.image'
  | 'blocks.gallery'
  | 'blocks.subscribe';

interface Base<
  T extends ComponentType,
  D extends object = Record<string, unknown>,
> {
  id?: number;
  __component?: T;
  documentId?: string;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
  data?: D;
}

export type Block =
  | HeroProps
  | EventBlockProps
  | HeadingProps
  | SectionWithParagraphProps
  | GalleryProps
  | FullImageProps
  | SubscribeProps
  | ParagraphProps;

export interface HeroProps extends Base<'blocks.hero'> {
  image?: ImageProps;
  tag?: string;
  subheading?: string;
  heading?: string;
  cta?: LinkProps;
  darken: boolean;
  paragraph?: string;
}

export interface EventBlockProps extends Base<'blocks.event-block'> {
  heading: string;
  events: EventProps[];
}

export interface HeadingProps extends Base<'blocks.heading'> {
  heading: string;
}

export interface SectionWithParagraphProps
  extends Base<'blocks.section-with-paragraph'> {
  heading: string;
  content: string;
  isBlackBackground?: boolean;
}

export interface ParagraphProps extends Base<'blocks.paragraph'> {
  content: string;
  isBlackBackground?: boolean;
  isFaded?: boolean;
}

export interface GalleryProps extends Base<'blocks.gallery'> {
  images: ImageProps[];
}

export interface FullImageProps extends Base<'blocks.image'> {
  image: ImageProps;
}

export interface SubscribeProps extends Base<'blocks.subscribe'> {
  headline: string;
  content: string;
  placeholder: string;
  buttonText: string;
}
