import { BlogPostProps } from '@/types';
import { Card, CardProps } from '@/src/components/Card';
import { notFound } from 'next/navigation';
import { formatDate } from '@/utils/format-date';
import { getContentBySlug } from '@/data/loaders';
import { StrapiImage } from '@/src/components/StrapiImage';
import Markdown from 'react-markdown';
import { BlogPostList } from '@/src/components/BlogPostList';

interface PageProps {
  params: Promise<{ slug: string; page?: string }>;
  page: string;
}

async function loader(slug: string) {
  const data = await getContentBySlug(slug, '/api/blog-posts');

  const blog = data.data[0];

  if (!blog) throw notFound();
  return { blog: blog as BlogPostProps };
}

const BlogCard = (props: Readonly<CardProps>) => (
  <Card
    {...props}
    basePath='blog'
  />
);

export default async function SingleBlogPost({ params }: PageProps) {
  const slug = (await params).slug;
  const { blog } = await loader(slug);
  const { title, date, image, author, content } = blog;

  return (
    <section className='max-w-screen-xl m-auto px-10'>
      <div className='mt-10 text-center md:text-left mb-10'>
        <h3 className=' text-5xl md:text-6xl text-[#E7CD78] decoration-white mb-5'>
          {title}
        </h3>
        <p className='font-bold'>
          By: {author} - {formatDate(date)}
        </p>
      </div>

      <div>
        <StrapiImage
          src={image.url}
          alt={image.alternativeText || 'No alternative text provided'}
          width={1920}
          height={1080}
          className='w-full md:w-[70%] h-auto mx-auto'
        />
      </div>

      <div className='copy mb-5'>
        <Markdown>{content}</Markdown>
      </div>

      <div className='mb-10'>
        <BlogPostList
          headline='Featured Posts'
          component={BlogCard}
          path='/api/blog-posts'
          featured
        />
      </div>

      <div className='text-center mb-20'>
        <a
          className='text-nowrap text-white hover:bg-white hover:text-black bg-[#E7CD78] text-2xl font-bold p-2 rounded-3xl'
          href={'/blog'}>
          Back To Blogs
        </a>
      </div>
    </section>
  );
}
