import { ContactForm } from '@/src/components/ContactForm';
import { getPageBySlug } from '@/data/loaders';
import { notFound } from 'next/navigation';

import { BlockRenderer } from '@/src/components/BlockRenderer';
import {
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTiktok,
} from 'react-icons/fa6';

import { Metadata } from 'next';

export async function generateMetaData(): Promise<Metadata> {
  return {
    title: 'Varnia Henry | Musician | Public Speaker',
    description:
      'Book a musician and speaker for events or inspiration. Spread joy with music and words. #PublicSpeaker #Singer #Motivational #Music #Jazz',
  };
}

async function loader(slug: string) {
  const { data } = await getPageBySlug(slug);
  if (data.length === 0) notFound();
  return { blocks: data[0]?.blocks };
}

export default async function ContactPage() {
  const { blocks } = await loader('contact');

  return (
    <section className='min-h-screen'>
      <BlockRenderer blocks={blocks} />
      <div className=' max-w-screen-xl mx-auto px-10 text-center mb-20 mt-10'>
        <h4 className='mx-auto max-w-2xl text-center text-3xl font-bold tracking-tight text-[#E7CD78] sm:text-4xl'>
          My Links
        </h4>
        <div className='flex justify-center text-3xl w-full mt-3 gap-4'>
          <a
            href='https://www.facebook.com/VarniaHenryMusic'
            target='_blank'>
            <FaFacebook className='hover:text-white text-4xl md:text-7xl hover:opacity-20 ' />
          </a>
          <a
            href='https://www.instagram.com/varniahenry?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=='
            target='_blank'>
            <FaInstagram className='hover:text-white text-4xl md:text-7xl hover:opacity-20 ' />
          </a>
          <a
            href='https://www.tiktok.com/@varniahenry'
            target='_blank'>
            <FaTiktok className='hover:text-white text-4xl md:text-7xl hover:opacity-20 ' />
          </a>
          <a
            href='https://www.linkedin.com/in/varniahenry/'
            target='_blank'>
            <FaLinkedin className='hover:text-white text-4xl md:text-7xl hover:opacity-20 ' />
          </a>
          <a
            href='mailto:varniahenry@gmail.com'
            target='_blank'>
            <FaEnvelope className='hover:text-white text-4xl md:text-7xl hover:opacity-20 ' />
          </a>
        </div>
      </div>
      <div>
        <ContactForm />
      </div>
    </section>
  );
}
