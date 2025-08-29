// 'use client';
// import { useFormStatus } from 'react-dom';

// interface SubmitButtonProps {
//   text: string;
//   className?: string;
//   disabled?: boolean;
// }

// export function SubmitButton({
//   text,
//   className,
//   disabled,
// }: Readonly<SubmitButtonProps>) {
//   const status = useFormStatus();
//   const isDisabled = status.pending || disabled;
//   return (
//     <button
//       type='submit'
//       aria-disabled={status.pending}
//       disabled={isDisabled}
//       className={` ${className} flex-none rounded-md px-3.5 py-2.5 text-sm font-semibold shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white
//         ${
//           isDisabled
//             ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
//             : 'bg-[#E7CD78] text-gray-900 hover:bg-gray-100 cursor-pointer'
//         }
//        `}>
//       {status.pending ? 'Loading...' : text}
//     </button>
//   );
// }

'use client';
import { useFormStatus } from 'react-dom';

interface SubmitButtonProps {
  text: string;
  className?: string;
  disabled?: boolean;
}

export function SubmitButton({
  text,
  className = '',
  disabled,
}: Readonly<SubmitButtonProps>) {
  const status = useFormStatus();
  const isDisabled = status.pending || disabled;

  // Base default classes
  const baseClasses = `
    flex-none rounded-md px-3.5 py-2.5 text-sm font-semibold shadow-sm
    focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white
  `;

  // Conditional styling based on disabled state
  const stateClasses = isDisabled
    ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
    : 'bg-[#E7CD78] text-gray-900 hover:bg-gray-100 cursor-pointer';

  return (
    <button
      type='submit'
      aria-disabled={status.pending}
      disabled={isDisabled}
      className={`${baseClasses} ${stateClasses} ${className}`}>
      {status.pending ? 'Loading...' : text}
    </button>
  );
}
