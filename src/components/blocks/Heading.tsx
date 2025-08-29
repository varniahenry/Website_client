import { HeadingProps } from '@/types';
export function Heading({ heading }: Readonly<HeadingProps>) {
  return (
    <h3 className=' text-5xl md:text-6xl text-[#E7CD78] text-center underline decoration-white mb-5'>
      {heading}
    </h3>
  );
}
