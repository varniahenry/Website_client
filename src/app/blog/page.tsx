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
export const revalidate = 60;

async function loader(slug: string) {
  const { data } = await getPageBySlug(slug);

  if (!data || data.length === 0) {
    return notFound(); // Return empty array instead of undefined
    // return { blocks: [] }; // Return empty array instead of undefined
  }

  // Ensure blocks is always an array
  const blocks = data[0]?.blocks ?? [];
  return { blocks };
}
const BlogCard = (props: Readonly<CardProps>) => (
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

  if (!blocks.length) {
    return (
      <div className='min-h-screen text-white flex items-center justify-center'>
        No content available.
      </div>
    );
  }
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
