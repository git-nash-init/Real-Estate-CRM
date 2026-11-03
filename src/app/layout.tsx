import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'RealEstateOS — NEXORA DEVELOPERS Prototype',
  description: 'White-Label Real Estate Developer CRM + ERP Client Demo Prototype',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-100 text-slate-900 antialiased">{children}</body>
    </html>
  );
}
