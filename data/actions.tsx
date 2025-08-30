'use server';
import ContactEmailForm from '@/src/components/EmailTemplate';
import { addSubscriberService } from './services';

import { Resend } from 'resend';
import { z } from 'zod';
import React from 'react';
import { render } from '@react-email/render';
// import ContactEmailForm from '@/src/components/EmailTemplate';

const resend = new Resend(process.env.RESEND_API_KEY);

const subscribeSchema = z.object({
  email: z.email({
    message: 'Please enter a vaild email address',
  }),
  agree: z.literal('on', {
    message: 'You must agree to be put on mailing list.',
  }),
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function subscribeAction(prevState: any, formData: FormData) {
  const email = formData.get('email');

  const validatedFields = subscribeSchema.safeParse({ email: email });

  if (!validatedFields.success) {
    console.dir(validatedFields.error.flatten().fieldErrors, { depth: null });

    return {
      ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      strapiErrors: null,
    };
  }

  const responseData = await addSubscriberService(validatedFields.data.email);

  if (!responseData) {
    return {
      ...prevState,
      zodErrors: null,
      errorMessage: 'Oops! Something went wrong. Please try again.',
    };
  }

  if (responseData.error) {
    return {
      ...prevState,
      zodErrors: null,
      errorMessage: responseData.error.errorMessage,
    };
  }

  return {
    ...prevState,
    zodErrors: null,
    successMessage: responseData.successmessage,
  };
}

const contactFormSchema = z.object({
  firstName: z.string().min(1, {
    message: 'Please enter your first name',
  }),
  lastName: z.string().min(1, {
    message: 'Please enter your last name',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address',
  }),
  phoneNumber: z
    .string()
    .regex(
      /^(\+\d{1,3}[-.]?)?\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
      {
        message: 'Please enter a valid phone number',
      }
    ),
  message: z.string().default('No message provided'),
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// export async function contactFormAction(prevState: any, formData: FormData) {
//   const formDataObject = {
//     firstName: formData.get('firstName'),
//     lastName: formData.get('lastName'),
//     email: formData.get('email'),
//     phoneNumber: formData.get('phoneNumber'),
//     message: formData.get('message'),
//   };

//   const honeypot = formData.get('check') as string;

//   if (honeypot) return;

//   const validatedFields = contactFormSchema.safeParse(formDataObject);

//   if (!validatedFields.success) {
//     console.dir(validatedFields.error.flatten().fieldErrors, { depth: null });
//     return {
//       ...prevState,
//       zodErrors: validatedFields.error.flatten().fieldErrors,
//     };
//   }

//   const message = formDataObject.message as string;

//   if (validatedFields.success) {
//     const { firstName, lastName, email, phoneNumber } = validatedFields.data;
//     try {
//       const { data, error } = await resend.emails.send({
//         from: process.env.RESEND_FROM_EMAIL!,
//         to: 'cmartells2@gmail.com', // send to yourself
//         // to: process.env.RESEND_FROM_EMAIL!, // send to yourself
//         // to: 'varniahenry@gmail.com', // send to yourself
//         subject: `New Contact Form Message from ${firstName} ${lastName}`,
//         // html: `
//         //       <h1>Contact Request</h1>
//         //       <p>Name: ${firstName} ${lastName}</p>
//         //       <p>Email: ${email}</p>
//         //       <p>Phone Number: ${phoneNumber}</p>
//         //       <p>Message: ${message || 'No message provided'}</p>
//         //     `,
//         react: (
//           <ContactEmailForm
//             firstName={firstName}
//             lastName={lastName}
//             email={email}
//             phoneNumber={phoneNumber}
//             message={message}
//           />
//         ),
//       });

//       if (error) {
//         console.log(error);
//         return {
//           ...prevState,
//           zodErrors: null,
//           formData: {
//             ...formDataObject,
//           },
//           errorMessage:
//             'There was an error in your submission. Please try again',
//         };
//       }

//       return {
//         ...prevState,
//         zodErrors: null,
//         errorMessage: null,
//         formData: null,
//         successMessage:
//           'Thanks for reaching out! We will get back to you shortly!',
//       };
//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     } catch (error: any) {
//       console.log('This is the error we are getting' + error);

//       return {
//         ...prevState,
//         zodErrors: null,
//         formData: {
//           ...formDataObject,
//         },
//         errorMessage:
//           'There was an error in your submission on the server. Please try again later.',
//       };
//     }
//   }
// }

// server/contactFormAction.tsx

interface ContactFormState {
  formData: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phoneNumber?: string;
    message?: string;
  } | null;
  zodErrors?: Record<string, string[] | undefined> | null;
  errorMessage?: string | null;
  successMessage?: string | null;
}

export async function contactFormAction(
  prevState: ContactFormState,
  formData: FormData
) {
  const formDataObject = {
    firstName: formData.get('firstName') as string,
    lastName: formData.get('lastName') as string,
    email: formData.get('email') as string,
    phoneNumber: formData.get('phoneNumber') as string,
    message: formData.get('message') as string,
  };

  const honeypot = formData.get('check') as string;
  if (honeypot) return;

  const validatedFields = contactFormSchema.safeParse(formDataObject);
  if (!validatedFields.success) {
    return {
      ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { firstName, lastName, email, phoneNumber, message } =
    validatedFields.data;

  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: 'cmartells2@gmail.com',
      subject: `New Contact Form Message from ${firstName} ${lastName}`,
      html: `
          <h2>New Contact Request</h2>
          <p><strong>From:</strong> ${firstName} ${lastName} (${email})</p>
          <p><strong>Phone:</strong> ${phoneNumber}</p>
          <p><strong>Message:</strong> ${message || 'No message provided'}</p>
        `,
    });

    return {
      ...prevState,
      formData: null,
      successMessage:
        'Thanks for reaching out! We will get back to you shortly!',
    };
  } catch (err) {
    console.error(err);
    return {
      ...prevState,
      formData: formDataObject,
      errorMessage:
        'There was an error sending your message on the server. Please try again later.',
    };
  }
}
