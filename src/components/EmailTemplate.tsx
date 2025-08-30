// emails/ContactEmailForm.tsx
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

export interface ContactFormEmailProps {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  message?: string;
}

export default function ContactEmailForm({
  firstName,
  lastName,
  email,
  phoneNumber,
  message,
}: ContactFormEmailProps) {
  return (
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
}

const main: React.CSSProperties = {
  backgroundColor: '#ffffff',
  fontFamily: 'Arial, sans-serif',
};

const container: React.CSSProperties = {
  margin: '0 auto',
  padding: '20px',
};
