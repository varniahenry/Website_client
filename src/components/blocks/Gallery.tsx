/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useEffect, useState } from 'react';
import { GalleryProps, ImageProps } from '@/types';
import { StrapiImage } from '../StrapiImage';
import Link from 'next/link';
import { getStrapiURL } from '@/utils/get-strapi-url';
interface GalleryWithFetchProps extends Omit<GalleryProps, 'images'> {
  documentId: string; // the page or block id to fetch gallery images
  images?: ImageProps[]; // optional preloaded images
}

export function Gallery({
  images: initialImages,
  documentId,
}: GalleryWithFetchProps) {
  const [images, setImages] = useState<ImageProps[]>(initialImages || []);
  const [loading, setLoading] = useState<boolean>(!initialImages?.length);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (documentId && (!initialImages || initialImages.length === 0)) {
      const fetchGallery = async () => {
        setLoading(true);
        setError(null);
        try {
          const res = await fetch(
            `${getStrapiURL()}/api/gallery-images?filters[documentId][$eq]=${documentId}&populate=*&pagination[pageSize]=50`
          );

          if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

          const data = await res.json();

          // Map Strapi response to ImageProps
          const galleryImages: ImageProps[] = data.data.map((img: any) => ({
            id: img.id,
            documentId: img.attributes.documentId,
            url: img.attributes.url,
            alternativeText: img.attributes.alternativeText,
            width: img.attributes.width,
            height: img.attributes.height,
          }));

          const uniqueImages = Array.from(
            new Map(galleryImages.map((img) => [img.id, img])).values()
          );

          setImages(uniqueImages);
        } catch (err: any) {
          console.error('Error fetching gallery images:', err);
          setError('Failed to load gallery images.');
        } finally {
          setLoading(false);
        }
      };

      fetchGallery();
    }
  }, [documentId, initialImages]);

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center text-white'>
        Loading gallery...
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-screen flex items-center justify-center text-red-500'>
        {error}
      </div>
    );
  }

  if (!images.length) {
    return (
      <div className='min-h-screen flex items-center justify-center text-white'>
        No Photos
      </div>
    );
  }

  return (
    <section className='my-3 max-w-screen-xl mx-auto px-10'>
      <div className='hidden sm:grid grid-cols-gallery auto-rows-[10px]'>
        {images ? (
          images.map((photo) => {
            const widthHeightRatio = photo.height! / photo.width!;
            const galleryHeight = Math.ceil(250 * widthHeightRatio);
            const photoSpans = Math.ceil(galleryHeight / 10) + 1;
            return (
              <div
                key={photo.id}
                className='w-[250px] justify-self-center'
                style={{ gridRow: `span ${photoSpans}` }}>
                <div className='overflow-hidden rounded-xl group'>
                  <Link
                    href={getStrapiURL() + photo.url}
                    target='_blank'
                    className='grid place-content-center'>
                    <StrapiImage
                      alt={
                        photo.alternativeText || 'No alternative text provided'
                      }
                      src={photo.url}
                      width={photo.width}
                      height={galleryHeight}
                      sizes='250px'
                      className='group-hover:opacity-75'
                    />
                  </Link>
                </div>
              </div>
            );
          })
        ) : (
          <div className='pb-80'>
            <h2 className='mx-auto max-w-2xl text-center text-3xl font-bold tracking-tight sm:text-2xl'>
              No Photos
            </h2>
          </div>
        )}
      </div>
      <div className='flex flex-col items-center gap-4 sm:hidden'>
        {images ? (
          images.map((photo) => (
            <div key={photo.id}>
              <div className='overflow-hidden rounded-xl group'>
                <Link
                  href={getStrapiURL() + photo.url}
                  target='_blank'
                  className='grid place-content-center'>
                  <StrapiImage
                    alt={
                      photo.alternativeText || 'No alternative text provided'
                    }
                    src={photo.url}
                    width={400}
                    height={400}
                    className='w-full h-auto object-cover rounded-xl'
                    priority
                    unoptimized
                  />
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className='pb-80'>
            <h2 className='mx-auto max-w-2xl text-center text-3xl font-bold tracking-tight sm:text-2xl'>
              No Photos
            </h2>
          </div>
        )}
      </div>
    </section>
  );
}
