import type { Metadata } from 'next';
import './globals.css';

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
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}
