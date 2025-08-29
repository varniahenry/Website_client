import { GalleryProps } from '@/types';
import { StrapiImage } from '../StrapiImage';
import Link from 'next/link';
import { getStrapiURL } from '@/utils/get-strapi-url';

export function Gallery({ images }: Readonly<GalleryProps>) {
  return (
    <section className=' my-3  grid grid-cols-gallery max-w-screen-xl mx-auto px-10 auto-rows-[10px]'>
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
    </section>
  );
}
