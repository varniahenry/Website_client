'use client';
import { FC } from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

// Props interface for the main pagination component
interface PaginationProps {
  pageCount: number; // Total number of pages
}

// Props interface for the arrow buttons
interface PaginationArrowProps {
  direction: 'left' | 'right'; // Direction of the arrow
  href: string; // URL to navigate to
  isDisabled: boolean; // Whether the arrow should be disabled
}

// Arrow button component for navigation
const PaginationArrow: FC<PaginationArrowProps> = ({
  direction,
  href,
  isDisabled,
}) => {
  const router = useRouter();
  const isLeft = direction === 'left';

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        // Use Next.js client-side navigation without scroll reset
        router.push(href, { scroll: false });
      }}
      className={`py-2.5 px-5 text-[#E7CD78] transition-all ease delay-200 hover:text-white translate-y-[-1px] ${
        isDisabled
          ? 'opacity-70 cursor-not-allowed hover:transform-none text-gray-500'
          : ''
      }`}
      aria-disabled={isDisabled}
      disabled={isDisabled}>
      {isLeft ? '«' : '»'}
    </button>
  );
};

export function PaginationComponent({ pageCount }: Readonly<PaginationProps>) {
  // Get current URL path and search parameters using Next.js hooks
  const pathname = usePathname();
  const searchParams = useSearchParams();
  // Extract current page from URL params, defaulting to 1 if not present
  const currentPage = Number(searchParams.get('page')) || 1;

  // Helper function to create URLs for pagination
  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`; // Combines current path with updated page parameter
  };

  return (
    <nav
      role='navigation'
      aria-label='Pagination'
      className='flex justify-center py-4 text-3xl'>
      <ul className='flex items-center gap list-none'>
        {/* Left arrow - disabled if on first page */}
        <li>
          <PaginationArrow
            direction='left'
            href={createPageURL(currentPage - 1)}
            isDisabled={currentPage <= 1}
          />
        </li>
        {/* Current page indicator */}
        <li>
          <span className='py-2.5 px-5 font-semibold min-w-10 text-center text-black active: bg-[#E7CD78] rounded-lg'>
            Page {currentPage}
          </span>
        </li>
        {/* Right arrow - disabled if on last page */}
        <li>
          <PaginationArrow
            direction='right'
            href={createPageURL(currentPage + 1)}
            isDisabled={currentPage >= pageCount}
          />
        </li>
      </ul>
    </nav>
  );
}
