import { Anonymous_Pro } from 'next/font/google';
import './globals.css';
import { getHeaderAndFooter } from '../../data/loaders';
import { Header } from '../components/Layout/Header';
import { Footer } from '../components/Layout/Footer';

const anonymousPro = Anonymous_Pro({ weight: '400', subsets: ['latin'] });

async function loader() {
  const { data } = await getHeaderAndFooter();
  if (!data) throw new Error('Failed to retrieve header and footer');
  return { header: data?.header, footer: data?.footer };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { header, footer } = await loader();
  return (
    <html lang='en'>
      <body className={`${anonymousPro.className} antialiased  `}>
        <Header data={header} />
        {children}

        <Footer data={footer} />
      </body>
    </html>
  );
}
