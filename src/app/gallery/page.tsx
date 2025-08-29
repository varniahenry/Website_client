import { getPageBySlug } from '@/data/loaders';
import { notFound } from 'next/navigation';
import { BlockRenderer } from '@/src/components/BlockRenderer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Varnia Henry | Musician | Public Speaker',
  description:
    'Experience vibrant moments from live shows, fetes, and speaking events. #Singer #Songwriter #Jazz #Soca #Storyteller #Canadian #Trinidad',
};

async function loader(slug: string) {
  const { data } = await getPageBySlug(slug);
  if (data.length === 0) notFound();
  return { blocks: data[0]?.blocks };
}

export default async function GalleryPage() {
  const { blocks } = await loader('gallery');
  // console.log(blocks);
  return (
    <div className='min-h-screen'>
      <h3 className='text-5xl md:text-6xl text-[#E7CD78] text-center underline decoration-white mb-5 mt-10 '>
        The Gallery
      </h3>
      <BlockRenderer blocks={blocks} />
    </div>
  );
}
