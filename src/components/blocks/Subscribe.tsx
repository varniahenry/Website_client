'use client';
import { useActionState, useState } from 'react';
import type { SubscribeProps } from '@/types';
import { usePathname } from 'next/navigation';
import { subscribeAction } from '@/data/actions';
import { SubmitButton } from '../SubmitButton';

const INITIAL_STATE = {
  zodErrors: null,
  errorMessage: null,
  successMessage: null,
};

export function Subscribe({
  headline,
  content,
  placeholder,
  buttonText,
}: Readonly<SubscribeProps>) {
  const pathName = usePathname();
  const [formState, formAction] = useActionState(
    subscribeAction,
    INITIAL_STATE
  );

  const [agreed, setAgreed] = useState(false);

  const zodErrors = formState?.zodErrors?.email;

  const errorMessage = zodErrors || formState.errorMessage;
  const successMessage = formState?.successMessage;

  return (
    <section
      className={` pb-10 px-6 lg:px-8 ${
        pathName === '/'
          ? 'w-full mx-0 mt-0 bg-black/70 '
          : ' max-w-7xl mx-auto mt-10'
      }`}>
      <div className='relative isolate overflow-hidden bg-gray-900 px-6 py-10 shadow-2xl rounded-2xl sm:rounded-3xl '>
        <h4 className='mx-auto max-w-2xl text-center text-3xl font-bold tracking-tight text-[#E7CD78]  sm:text-4xl '>
          {headline}
        </h4>
        <p className='mx-auto mt-2 max-w-xl text-center text-lg leading-8 text-gray-300'>
          {content}
        </p>
        <form
          className='mx-auto mt-10 flex flex-col gap-4 max-w-md gap-x-4'
          action={formAction}>
          <div className='flex flex-row gap-x-4'>
            <input
              name='email'
              type='text'
              placeholder={placeholder}
              className={`min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-[#E7CD78]/10 focus:ring-2 focus:ring-inset focus:ring-[#E7CD78] sm:text-sm sm:leading-6`}
            />
            <SubmitButton
              text={buttonText}
              disabled={!agreed}
            />
          </div>
          <div className='flex items-center mb-4'>
            <input
              name='agree'
              type='checkbox'
              checked={agreed}
              className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500  ring-offset-gray-800 focus:ring-2 '
              onChange={(e) => setAgreed(e.target.checked)}
            />
            <label
              htmlFor='agree'
              className='ms-2 text-sm font-medium text-gray-300'>
              Please click to be able to subscribe to receive email updates and
              offers from Varnia Henry.{' '}
            </label>
          </div>
        </form>
        {errorMessage && (
          <div className='text-center pt-3'>
            <p className='inline-block font-bold text-red-500 '>
              {errorMessage}
            </p>
          </div>
        )}
        {successMessage && (
          <div className='text-center pt-3'>
            <p className='inline-block font-bold text-green-400 '>
              {successMessage}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
