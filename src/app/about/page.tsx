import { getPageBySlug } from '@/data/loaders';
import { notFound } from 'next/navigation';
import { BlockRenderer } from '@/src/components/BlockRenderer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Varnia Henry | Musician | Public Speaker| Blog Page',
  description:
    'Learn about a vocalist and motivational speaker sharing culture, music, and stories across Canada and Trinidad. #Singer #Storyteller #Motivational',
};

export const revalidate = 60;

async function loader(slug: string) {
  const response = await getPageBySlug(slug);
  console.log('Strapi response:', response);
  const { data } = await getPageBySlug(slug);

  // Only 404 if the page itself doesn't exist
  if (!data || data.length === 0) {
    notFound();
  }

  // Pass blocks to page, even if some are empty
  const blocks = data[0]?.blocks ?? [];
  return { blocks };
}

export default async function AboutPage() {
  const { blocks } = await loader('about');

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
    </div>
  );
}
