import { HeroProps } from '@/types';
import { Pacifico } from 'next/font/google';
import { getStrapiURL } from '@/utils/get-strapi-url';
import Link from 'next/link';

const pacifico = Pacifico({
  weight: '400',
  subsets: ['latin'],
});

export function Hero({
  heading,
  subheading,
  tag,
  cta,
  paragraph,
  image,
  darken = false,
}: Readonly<HeroProps>) {
  return (
    <section
      className={`relative w-full min-h-[30rem] md:min-h-[45rem] md:pt-20 bg-center bg-no-repeat md:bg-top bg-cover  ${
        darken ? `bg-blend-overlay bg-black/60` : ''
      }`}
      style={{
        backgroundImage: image
          ? `url('${getStrapiURL() + image?.url}')`
          : 'none',
      }}>
      <div className='w-full md:max-w-screen-xl text-center md:text-left p-5 items-center flex-col justify-center md:items-start mx-auto'>
        <div className=' max-w-xl md:max-w-2xl mb-5 mx-auto md:mx-0'>
          <h1 className='font-extrabold text-7xl md:text-8xl '>{heading}</h1>
        </div>
        <div className=''>
          <h2
            className={`text-6xl md:text-7xl ${pacifico.className} text-[#E7CD78]`}>
            {subheading}
          </h2>
          <h3 className='text-3xl mb-10'> {tag}</h3>
        </div>
        <h4 className='md:text-2xl font-bold '>{paragraph}</h4>
        {cta && (
          <div className='w-full md:max-w-sm text-center '>
            <Link
              className='text-white hover:bg-white hover:text-black bg-[#E7CD78] text-5xl font-bold p-2 rounded-3xl'
              href={cta.href}>
              {cta.text}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
