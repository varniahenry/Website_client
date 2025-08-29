import { BlockRenderer } from '../components/BlockRenderer';
import { getHomePage } from '@/data/loaders';
import { notFound } from 'next/navigation';

import { getStrapiURL } from '@/utils/get-strapi-url';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Varnia Henry | Musician | Public Speaker',
  description:
    'Canadian singer, songwriter, and speaker blending Calypso, Soca, and Jazz to spread joy. #Singer #Musician #Jazz #Calypso #Soca #PublicSpeaker',
};

async function loader() {
  const data = await getHomePage();
  if (!data) return notFound();
  return { ...data.data };
}

export default async function Home() {
  const data = await loader();
  const blocks = data?.blocks || [];
  const imagePath = getStrapiURL();

  return (
    <main
      className={`bg-cover bg-no-repeat bg-fixed  text-white  min-h-screen `}
      style={{
        backgroundImage:
          imagePath + data?.backgroundImage.url
            ? `url('${imagePath}${data.backgroundImage.url}')`
            : 'none',
      }}>
      <div className='relative z-10 text-white min-h-screen mx-auto'>
        <BlockRenderer blocks={blocks} />
      </div>
    </main>
  );
}
