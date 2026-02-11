import { getPageBySlug } from '@/data/loaders';
import { notFound } from 'next/navigation';
import { BlockRenderer } from '@/src/components/BlockRenderer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Varnia Henry | Musician | Public Speaker| Blog Page',
  description:
    'Learn about a vocalist and motivational speaker sharing culture, music, and stories across Canada and Trinidad. #Singer #Storyteller #Motivational',
};

export const dynamic = 'force-dynamic';

async function loader(slug: string) {
  const { data } = await getPageBySlug(slug);
  if (data.length === 0) notFound();
  return { blocks: data[0]?.blocks };
}

export default async function AboutPage() {
  const { blocks } = await loader('about');
  return (
    <div className='min-h-screen'>
      <BlockRenderer blocks={blocks} />
    </div>
  );
}
