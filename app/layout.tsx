// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { client, queries } from '@/lib/sanity';
import { Category, Settings } from '@/lib/types';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Marina Pizza - Pizzeria à Thiais',
  description: 'Découvrez les meilleures pizzas artisanales de Thiais. Livraison rapide et gratuite à partir de 15€.',
  keywords: 'pizza, pizzeria, Thiais, livraison pizza, pizza artisanale, restaurant italien',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [categories, settings] = await Promise.all([
    client.fetch<Category[]>(queries.getAllCategories()),
    client.fetch<Settings>(queries.getSettings()),
  ]);

  return (
    <html lang="fr">
      <body className={`${inter.className} bg-gray-50`}>
        <Header categories={categories} phone={settings?.phone || '01 46 80 21 20'} />
        <main className="min-h-screen">{children}</main>
        <Footer settings={settings} />
      </body>
    </html>
  );
}