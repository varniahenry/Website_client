import { BlogPostProps } from '@/types';
import { getContent } from '@/data/loaders';
import { PaginationComponent } from './PaginationComponent';
import { Search } from './Search';

interface BlockPostListProps {
  headline: string;
  featured?: boolean;
  query?: string;
  path: string;
  component: React.ComponentType<BlogPostProps & { basePath: string }>;
  showSearch?: boolean;
  page?: string;
  showPagination?: boolean;
}

async function loader(
  path: string,
  featured?: boolean,
  query?: string,
  page?: string
) {
  const { data, meta } = await getContent(path, featured, query, page);
  return {
    blogs: (data as BlogPostProps[]) || [],
    pageCount: meta?.pagination.pageCount || 1,
  };
}

export async function BlogPostList({
  featured,
  component,
  headline,
  path,
  page,
  query,
  showPagination,
  showSearch,
}: Readonly<BlockPostListProps>) {
  const { blogs, pageCount } = await loader(path, featured, query, page);
  const Component = component;
  return (
    <section className='max-w-screen-xl m-auto px-10 grid'>
      <h3 className='text-5xl md:text-6xl text-[#E7CD78] text-center underline decoration-white mb-5 mt-10'>
        {headline}
      </h3>
      {showSearch && <Search />}
      {blogs.length === 0 ? (
        <div className='justify-self-center mb-10'>
          <h4 className='text-center text-4xl'>No Posts</h4>
        </div>
      ) : (
        <div className='grid justify-center md:justify-normal md:grid-cols-list gap-8'>
          {blogs.map((blog) => (
            <Component
              key={blog.documentId}
              {...blog}
              basePath={path}
            />
          ))}
        </div>
      )}
      {/* {blogs.map((blog) => (
          <Component
            key={blog.documentId}
            {...blog}
            basePath={path}
          />
        ))} */}
      {showPagination && <PaginationComponent pageCount={pageCount} />}
    </section>
  );
}
