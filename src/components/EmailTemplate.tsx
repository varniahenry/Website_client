// import React from 'react';
// interface ContactFormEmailProps {
//   firstName: string;
//   lastName: string;
//   email: string;
//   phoneNumber: string;
//   message?: string;
// }

// const ContactEmailForm: React.FC<Readonly<ContactFormEmailProps>> = ({
//   firstName,
//   lastName,
//   message,
//   phoneNumber,
//   email,
// }) => (
//   <div>
//     <h1>
//       <p>
//         FROM{' '}
//         <strong>
//           {firstName} {lastName}
//         </strong>{' '}
//         at {email}
//       </p>
//       <p>Phone Number: {phoneNumber}</p>
//     </h1>
//     <h2>Message</h2>
//     <p>{message || 'No Message'}</p>
//   </div>
// );

// export default ContactEmailForm;

import * as React from 'react';
import {
  Html,
  Head,
  Body,
  Container,
  Heading,
  Text,
  Section,
} from '@react-email/components';

interface ContactFormEmailProps {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  message?: string;
}

const ContactEmailForm = ({
  firstName,
  lastName,
  message,
  phoneNumber,
  email,
}: Readonly<ContactFormEmailProps>) => (
  <Html>
    <Head />
    <Body style={main}>
      <Container style={container}>
        <Heading as='h2'>New Contact Request</Heading>
        <Section>
          <Text>
            <strong>From:</strong> {firstName} {lastName} ({email})
          </Text>
          <Text>
            <strong>Phone:</strong> {phoneNumber}
          </Text>
        </Section>
        <Section>
          <Heading as='h3'>Message</Heading>
          <Text>{message || 'No message provided.'}</Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default ContactEmailForm;

// Optional inline styles (React Email recommends this approach)
const main = {
  backgroundColor: '#ffffff',
  fontFamily: 'Arial, sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px',
};
