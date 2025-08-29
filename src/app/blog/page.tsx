import { getPageBySlug } from '@/data/loaders';
import { notFound } from 'next/navigation';
import { Card, CardProps } from '@/src/components/Card';
import { BlockRenderer } from '@/src/components/BlockRenderer';
import { BlogPostList } from '@/src/components/BlogPostList';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Varnia Henry | Musician | Public Speaker| Blog Page',
  description:
    'Insights on music, Carnival, creativity, and joy from a Canadian-Trinidadian musician and speaker. #Music #JazzFusion #Fete #MotivationalSpeaker',
};

async function loader(slug: string) {
  const { data } = await getPageBySlug(slug);
  if (data.length === 0) notFound();
  return { blocks: data[0]?.blocks };
}

export const BlogCard = (props: Readonly<CardProps>) => (
  <Card
    {...props}
    basePath='blog'
  />
);

interface PageProps {
  searchParams: Promise<{ page?: string; query?: string }>;
}

export default async function BlogPage({ searchParams }: PageProps) {
  const { page, query } = await searchParams;
  const { blocks } = await loader('blog');
  return (
    <div className='min-h-screen'>
      <BlockRenderer blocks={blocks} />
      <BlogPostList
        component={BlogCard}
        headline='Blog Posts'
        path='/api/blog-posts'
        showPagination
        showSearch
        query={query}
        page={page}
      />
    </div>
  );
}
