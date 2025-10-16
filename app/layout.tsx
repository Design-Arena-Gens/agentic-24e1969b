import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CT vs MRI - AI Analyzer',
  description: 'Zero-shot CT vs MRI classifier with image metrics',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
