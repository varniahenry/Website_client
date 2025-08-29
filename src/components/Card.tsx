import { ImageProps } from '@/types';
import Link from 'next/link';
import { StrapiImage } from './StrapiImage';
import { formatDate } from '@/utils/format-date';

export interface CardProps {
  documentId: string;
  title: string;
  description: string;
  slug: string;
  image: ImageProps;
  date: string;
  basePath: string;
  createdAt: string;
}

export function Card({
  title,
  description,
  slug,
  image,
  date,
  basePath,
}: Readonly<CardProps>) {
  return (
    <div className='max-w-sm border-2  col-span-full md:col-span-3 border-[#E7CD78] rounded-xl bg-black shadow-sm'>
      <Link href={`/${basePath}/${slug}`}>
        <div className='w-full md:h-96'>
          <StrapiImage
            src={image.url}
            alt={image.alternativeText || 'No alternative text provided'}
            width={400}
            height={400}
            className='rounded-t-xl w-full h-full object-cover'
          />
        </div>
        <div className='p-5'>
          <div className='mb-3'>
            <h5 className='text-3xl font-extrabold text-[#E7CD78]'>{title}</h5>
            <p className='text-xl text-[#E7CD78] italic'>{formatDate(date)}</p>
          </div>
          <p className='mb-3 text-base font-normal text-white event-p'>
            {description.slice(0, 144)}
          </p>
        </div>
      </Link>
    </div>
  );
}
