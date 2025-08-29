'use client';

import { FaFacebook, FaInstagram, FaTiktok, FaLinkedin } from 'react-icons/fa6';

import { LinkProps, LogoProps } from '@/types';
import Link from 'next/link';
import { StrapiImage } from '../StrapiImage';

interface FooterProps {
  data: {
    logo: LogoProps;
    navigation: LinkProps[];
    copy: string;
  };
}

export function Footer({ data }: FooterProps) {
  if (!data) return null;
  const { logo, navigation, copy } = data;

  return (
    <footer className=' w-full shadow-sm bg-black '>
      <div className='w-full max-w-screen-xl mx-auto p-4 md:py-4'>
        <div className='sm:flex sm:items-center sm:justify-between'>
          <Link
            href='https://flowbite.com/'
            className='flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse'>
            <StrapiImage
              src={logo.image.url}
              alt={logo.image.alternativeText || 'No alternative text provided'}
              width={150}
              height={150}
            />
          </Link>
          <ul className='flex flex-wrap items-center mb-6 gap-5 text-sm font-medium text-[#E7CD78] sm:mb-0 '>
            {navigation.map((link) => (
              <li key={link.id}>
                <Link
                  href={link.href}
                  className='hover:underline hover:text-white '>
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <hr className='my-6 border-[#E7CD78] sm:mx-auto lg:my-8' />
        <div className='flex justify-between text-[#E7CD78]'>
          <div>
            <span className='block text-sm text-[#E7CD78] sm:text-center '>
              {copy}
            </span>
          </div>
          <div className='flex gap-4 text-lg mb-2 md:mb-0'>
            <a
              href='https://www.facebook.com/VarniaHenryMusic'
              target='_blank'>
              <FaFacebook className='hover:text-white' />
            </a>
            <a
              href='https://www.instagram.com/varniahenry?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=='
              target='_blank'>
              <FaInstagram className='hover:text-white' />
            </a>
            <a
              href='https://www.tiktok.com/@varniahenry'
              target='_blank'>
              <FaTiktok className='hover:text-white' />
            </a>
            <a
              href='https://www.linkedin.com/in/varniahenry/'
              target='_blank'>
              <FaLinkedin className='hover:text-white' />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
