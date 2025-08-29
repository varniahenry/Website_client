import { SectionWithParagraphProps } from '@/types';
import { Paragraph } from './Paragraph';

export function SectionWithParagraph({
  heading,
  content,
}: Readonly<SectionWithParagraphProps>) {
  return (
    <section className='mb-10'>
      <h3 className=' text-5xl md:text-6xl text-[#E7CD78] text-center underline decoration-white mb-5 '>
        {heading}
      </h3>
      <Paragraph content={content} />
    </section>
  );
}
