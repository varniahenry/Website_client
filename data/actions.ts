'use server';
import { addSubscriberService } from './services';

import { Resend } from 'resend';
import { z } from 'zod';

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
  const agree = formData.get('agree');

  const validatedFields = subscribeSchema.safeParse({
    email: email,
    agree: agree,
  });

  if (!validatedFields.success) {
    console.dir(validatedFields.error.flatten().fieldErrors, { depth: null });

    return {
      ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      strapiErrors: null,
    };
  }

  const responseData = await addSubscriberService(validatedFields.data.email);
  console.log(responseData);
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
export async function contactFormAction(prevState: any, formData: FormData) {
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
      to: process.env.RESEND_FROM_EMAIL!,
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
