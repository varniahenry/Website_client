import { FullImageProps } from '@/types';
import { StrapiImage } from '@/src/components/StrapiImage';

export function FullImage({ image }: Readonly<FullImageProps>) {
  return (
    <div className='mx-auto my-0 w-full  md:w-[65%] md:min-w-[40rem] mb-6'>
      <StrapiImage
        src={image.url}
        alt={image.alternativeText || 'No alternative text provided'}
        width={1920}
        height={1080}
        className='w-[100%] h-auto'
      />
    </div>
  );
}
