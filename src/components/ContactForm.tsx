'use client';
import { useActionState } from 'react';
import { SubmitButton } from './SubmitButton';
import { contactFormAction } from '@/data/actions';

const INITIAL_STATE = {
  zodErrors: null,
  errorMessage: null,
  successMessage: null,
  formData: null,
};

interface TextInputProps {
  id: string;
  label: string;
  name: string;
  type?: string;
  error?: string;
  defaultValue?: string;
}

function TextInput({
  id,
  label,
  name,
  type = 'text',
  error,
  defaultValue,
}: TextInputProps) {
  return (
    <div className='relative z-0 w-full mb-5 group'>
      <label
        htmlFor={id}
        className='block w-full font-bold text-sm md:text-lg'>
        {label}
      </label>
      {type === 'textarea' ? (
        <textarea
          name={name}
          id={id}
          rows={5}
          maxLength={500}
          // className='input input__text input--beige'
          className='outline-0 border-0 rounded-2xl mb-5 p-2 px-0 bg-white block w-full text-black font-bold '
          defaultValue={defaultValue}
        />
      ) : (
        <div>
          <input
            type={type}
            name={name}
            id={id}
            className='outline-0 border-0 rounded-2xl p-2 h-6 md:h-9 mb-1 bg-white block w-full text-black font-bold '
            defaultValue={defaultValue}
          />
          {error && <p className='text-red-500 mt-1'>{error}</p>}
        </div>
      )}
    </div>
  );
}

export function ContactForm({}) {
  const [formState, formAction] = useActionState(
    contactFormAction,
    INITIAL_STATE
  );

  const zodErrors = formState?.zodErrors;
  const errorMessage = formState?.errorMessage;
  const successMessage = formState?.successMessage;

  return (
    <section className=''>
      <form
        action={formAction}
        className='max-w-xl mx-7 mb-10 md:mx-auto relative overflow-hidden py-10 bg-black px-10  shadow-2xl rounded-2xl sm:rounded-3xl'>
        {/* <form
        action={formAction}
        className='flex justify-center mx-auto flex-col w-[30%] h-96 items-center '> */}
        <div>
          <p className=' text-xl md:text-4xl text-[#E7CD78] text-center underline decoration-white mb-5'>
            Contact Me!
          </p>
        </div>
        <div className='grid md:grid-cols-2 md:gap-6'>
          {/* <div className='flex justify-between gap-7 w-full mb-'> */}
          <TextInput
            id='firstName'
            label='First Name'
            name='firstName'
            error={zodErrors?.firstName}
            defaultValue={formState?.formData?.firstName ?? ''}
          />
          <TextInput
            id='lastName'
            label='Last Name'
            name='lastName'
            error={zodErrors?.lastName}
            defaultValue={formState?.formData?.lastName ?? ''}
          />
        </div>
        <div className='grid md:grid-cols-2 md:gap-6'>
          <TextInput
            id='email'
            label='Email'
            name='email'
            type='email'
            error={zodErrors?.email}
            defaultValue={formState?.formData?.email ?? ''}
          />
          <TextInput
            id='phoneNumber'
            label='Phone'
            name='phoneNumber'
            type='text'
            error={zodErrors?.phoneNumber}
            defaultValue={formState?.formData?.phoneNumber ?? ''}
          />
        </div>
        <div className=' w-full'>
          <TextInput
            id='message'
            label='Message'
            name='message'
            type='textarea'
            defaultValue={formState?.formData?.message ?? ''}
          />
        </div>
        <input
          type='text'
          name='check'
          className='hidden'
          tabIndex={-1}
          autoComplete='off'
        />
        <SubmitButton
          text='Sign Up'
          className='w-full'
        />
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
      </form>
    </section>
  );
}
