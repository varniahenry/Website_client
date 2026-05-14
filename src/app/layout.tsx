import { Anonymous_Pro } from 'next/font/google';
import './globals.css';
import { getHeaderAndFooter } from '../../data/loaders';
import { Header } from '../components/Layout/Header';
import { Footer } from '../components/Layout/Footer';

const anonymousPro = Anonymous_Pro({ weight: '400', subsets: ['latin'] });

// async function loader() {
//   const { data } = await getHeaderAndFooter();
//   if (!data) throw new Error('Failed to retrieve header and footer');
//   return { header: data?.header, footer: data?.footer };
// }
async function loader() {
  try {
    const { data } = await getHeaderAndFooter();

    return {
      header: data?.header ?? null,
      footer: data?.footer ?? null,
    };
  } catch (error) {
    console.error('Layout fetch failed:', error);

    return {
      header: null,
      footer: null,
    };
  }
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
        {header && <Header data={header} />}
        {children}

        {footer && <Footer data={footer} />}
      </body>
    </html>
  );
}
