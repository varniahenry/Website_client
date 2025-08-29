import mailchimp from '@mailchimp/mailchimp_marketing';
import { ErrorResponse } from '@mailchimp/mailchimp_marketing';
mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER,
});

export async function addSubscriberService(email: string) {
  try {
    await mailchimp.lists.addListMember(process.env.MAILCHIMP_AUDIANCE_ID!, {
      email_address: email,
      status: 'subscribed',
    });
    return {
      successmessage: `Thank you. ${email} has been subscribed successfully to our mailing list`,
    };
  } catch (error: unknown) {
    const unknownError = error as ErrorResponse;
    if (unknownError.title === 'Member Exists') {
      return {
        error: {
          errorMessage: `Ooops! It looks like ${email} is already subscribed.`,
        },
      };
    }
    console.log(unknownError);

    return {
      error: {
        errorMessage: `Ooops there was an error subscribing ${email} to the list`,
      },
    };
  }
}

// export async function contactFormService({
//   firstName,
//   lastName,
//   email,
//   phoneNumber,
//   message,
// }: EmailTemplateProps) {
//   const resend = new Resend(process.env.RESEND_API_KEY);
//   try {
//     const response = await resend.emails.send({
//       from: process.env.RESEND_FROM_EMAIL!,
//       to: 'cmartells2@gmail.com', // send to yourself
//       subject: `New Contact Form Message from ${firstName} ${lastName}`,
//       text: `<h1>hi </h1>`,
//       // react: EmailTemplate({
//       //   firstName,
//       //   lastName,
//       //   email,
//       //   phoneNumber,
//       //   message,
//       // }),
//     });

//     // if (error) {
//     //   return Response.json({ error }, { status: 500 });
//     // }
//     return {
//       success: true,
//       successMessage:
//         'Thanks for reaching out! We will get back to you shortly!',
//       response, // this is the full response object
//     };

//     // Response.json(data);
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   } catch (error: any) {
//     console.log('This is the error we are getting' + error);
//     return {
//       success: false,
//       error: error.message,
//     };
//   }
// }
