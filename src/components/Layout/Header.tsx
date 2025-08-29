'use client';
import { useState } from 'react';

import { Pacifico } from 'next/font/google';
import {
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaLinkedin,
  FaX,
  FaBars,
} from 'react-icons/fa6';

import { LinkProps, LogoProps } from '@/types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { StrapiImage } from '../StrapiImage';

const pacifico = Pacifico({
  weight: '400',
  subsets: ['latin'],
});

interface HeaderProps {
  data: {
    logo: LogoProps;
    navigation: LinkProps[];
  };
}

export function Header({ data }: HeaderProps) {
  const [isClicked, setIsClicked] = useState(false);
  const toggleMenuIcon = () => setIsClicked(!isClicked);

  const pathName = usePathname();

  if (!data) return null;

  const { logo, navigation } = data;

  return (
    <header className='sticky  md:static z-[500] top-0 w-full text-[#E7CD78] bg-black'>
      <nav className='p-6 flex w-full max-w-screen-xl mx-auto'>
        <div className='flex items-center w-full '>
          <div className='overflow-hidden w-40 md:mr-7'>
            <Link href={'/'}>
              <StrapiImage
                src={logo.image.url}
                alt={
                  logo.image.alternativeText || 'No alternative text provided'
                }
                className='w-[100%] '
                width={100}
                height={120}
              />
            </Link>
          </div>
          <div className='flex items-center gap-4'>
            <ul
              className={`md:flex hidden items-center w-full gap-4 bg-black  ${pacifico.className} text-xl `}>
              {navigation.map((link) => {
                return (
                  <li key={link.id}>
                    <Link
                      href={link.href}
                      target='_self'
                      className={` hover:underline decoration-white ${
                        pathName === link.href ? `underline text-white` : ``
                      }`}>
                      <h5>{link.text}</h5>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className=' hidden md:flex items-center text-[#E7CD78] text-3xl gap-5 '>
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

          {/* <a
            className='text-nowrap text-white hover:bg-white hover:text-black bg-[#E7CD78] text-lg font-bold p-2 rounded-3xl'
            href={cta.href}>
            {cta.text}
          </a> */}
        </div>

        {isClicked ? (
          <div
            className={`md:flex items-center text-center top-28 z-[500] left-0 w-full md:gap-4 md:border-0 md:border-none bg-black pb-7 ${
              pacifico.className
            } text-xl md:static ${isClicked ? 'absolute' : 'hidden'}`}>
            <ul className={`text-center  px-5`}>
              {navigation.map((link, index) => (
                <li
                  key={link.id}
                  className={` ${
                    index == navigation.length - 1 ? `my-2` : `my-5`
                  }`}>
                  <Link
                    href={link.href}
                    target='_self'
                    className={`hover:underline decoration-white ${
                      pathName === link.href ? `underline text-white` : ``
                    }`}
                    onClick={() => setIsClicked(!isClicked)}>
                    <h5>{link.text}</h5>
                  </Link>
                </li>
              ))}
            </ul>
            <div className='border-b-2 border-b-white w-[75%] justify-self-center'></div>

            <div className='flex justify-center text-3xl w-full mt-3 gap-4'>
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
        ) : (
          ''
        )}

        <div className='top-[45px] right-8 absolute md:hidden'>
          {isClicked ? (
            <button
              onClick={toggleMenuIcon}
              className='text-3xl hover:text-white '>
              <FaX />
            </button>
          ) : (
            <button
              onClick={toggleMenuIcon}
              className='text-3xl hover:text-white '>
              <FaBars />
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}
