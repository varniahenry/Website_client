'use client';
import { useState, useEffect, useRef } from 'react';

import { Great_Vibes } from 'next/font/google';
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

const pacifico = Great_Vibes({
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
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const toggleMenuIcon = () => setIsClicked(!isClicked);

  const pathName = usePathname();
  const { logo, navigation } = data;

  // ✅ Close mobile menu on resize above md
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsClicked(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ✅ Close on outside click (only needed if no backdrop, but we keep for safety)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isClicked &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsClicked(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isClicked]);

  if (!data) return null;

  return (
    <header className='sticky md:static z-[500] top-0 w-full text-[#E7CD78] bg-black'>
      <nav className='p-6 flex w-full max-w-screen-xl mx-auto relative'>
        <div className='flex items-center w-full'>
          {/* Logo */}
          <div className='overflow-hidden w-40 md:mr-7'>
            <Link href={'/'}>
              <StrapiImage
                src={logo.image.url}
                alt={
                  logo.image.alternativeText || 'No alternative text provided'
                }
                className='w-[100%]'
                width={100}
                height={120}
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className='flex items-center gap-4'>
            <ul
              className={`md:flex hidden items-center w-full gap-4 bg-black ${pacifico.className} text-xl`}>
              {navigation.map((link) => (
                <li key={link.id}>
                  <Link
                    href={link.href}
                    target='_self'
                    className={`hover:underline decoration-white ${
                      pathName === link.href ? 'underline text-white' : ''
                    }`}>
                    <h5>{link.text}</h5>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Desktop Socials */}
        <div className='hidden md:flex items-center text-[#E7CD78] text-3xl gap-5'>
          <a
            href='https://www.facebook.com/VarniaHenryMusic'
            target='_blank'>
            <FaFacebook className='hover:text-white' />
          </a>
          <a
            href='https://www.instagram.com/varniahenry'
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

        {/* Mobile Toggle Button */}
        <div className='top-[45px] right-8 absolute md:hidden'>
          <button
            ref={buttonRef}
            onClick={toggleMenuIcon}
            className='text-3xl hover:text-white'>
            {isClicked ? <FaX /> : <FaBars />}
          </button>
        </div>
      </nav>

      {/* ✅ Backdrop */}
      {isClicked && (
        <div
          className='fixed inset-0 bg-black/50 z-[300]'
          onClick={() => setIsClicked(false)}
        />
      )}

      {/* Mobile Dropdown */}
      <div
        ref={menuRef}
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out 
          ${isClicked ? 'max-h-[600px]' : 'max-h-0'} 
          absolute top-20 left-0 w-full bg-black z-[400] ${pacifico.className} text-xl`}>
        <ul className='text-center px-5 py-5'>
          {navigation.map((link, index) => (
            <li
              key={link.id}
              className={` ${index == navigation.length - 1 ? 'my-2' : 'my-5'}`}>
              <Link
                href={link.href}
                target='_self'
                className={`hover:underline decoration-white ${
                  pathName === link.href ? 'underline text-white' : ''
                }`}
                onClick={() => setIsClicked(false)}>
                <h5>{link.text}</h5>
              </Link>
            </li>
          ))}
        </ul>

        <div className='border-b-2 border-b-white w-[75%] mx-auto'></div>

        {/* Socials */}
        <div className='flex justify-center text-3xl w-full mt-3 gap-4 pb-5'>
          <a
            href='https://www.facebook.com/VarniaHenryMusic'
            target='_blank'>
            <FaFacebook className='hover:text-white' />
          </a>
          <a
            href='https://www.instagram.com/varniahenry'
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
    </header>
  );
}
