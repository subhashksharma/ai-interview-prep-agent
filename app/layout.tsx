import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Ai agent landing page',
  description:
    'Automate complex workflows, make data-driven decisions, and solve challenging problems effortlessly with our agentic AI platform. Empower your business with intelligent automation and streamlined processes designed for modern enterprises.',
  generator: 'v0.app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
      className={inter.variable}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
