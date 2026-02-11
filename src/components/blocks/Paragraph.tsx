import { ParagraphProps } from '@/types';
import ReactMarkdown from 'react-markdown';

export function Paragraph({ content, isFaded }: Readonly<ParagraphProps>) {
  if (!content || content.trim() === '') {
    return null;
  }
  return (
    <div data-aos='fade-in'>
      <div className={`w-screen ${isFaded ? `bg-black/70 pt-10` : ''}`}>
        <div
          className={`text-sm md:text-xl max-w-screen-xl text-white justify-self-center px-10 copy`}>
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
