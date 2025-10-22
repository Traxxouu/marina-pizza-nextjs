// components/layout/Header.tsx
'use client';

import Link from 'next/link';
import { Phone, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Category } from '@/lib/types';

interface HeaderProps {
  categories: Category[];
  phone: string;
}

export default function Header({ categories, phone }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="bg-red-600 text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <span>🍕 Livraison gratuite à partir de 15€</span>
          <a href={`tel:${phone}`} className="flex items-center gap-2 hover:underline">
            <Phone size={16} />
            <span className="font-semibold">{phone}</span>
          </a>
        </div>
      </div>

      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-3xl font-bold text-red-600 hover:text-red-700 transition">Marina Pizza</Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-red-600 hover:text-red-700 transition font-medium">Accueil</Link>
            {categories.map((cat) => (
              <Link key={cat._id} href={`/menu/${cat.slug.current}`} className="text-red-600 hover:text-red-700 transition font-medium">{cat.icon} {cat.name}</Link>
            ))}
            <Link href="/contact" className="text-red-600 hover:text-red-700 transition font-medium">Contact</Link>
            <Link href="/zones-livraison" className="text-red-600 hover:text-red-700 transition font-medium">Livraison</Link>
          </nav>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition" aria-label="Menu">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 flex flex-col gap-3 border-t pt-4">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="text-red-600 hover:text-red-700 transition font-medium py-2">Accueil</Link>
            {categories.map((cat) => (
              <Link key={cat._id} href={`/menu/${cat.slug.current}`} onClick={() => setMobileMenuOpen(false)} className="text-red-600 hover:text-red-700 transition font-medium py-2">{cat.icon} {cat.name}</Link>
            ))}
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="text-red-600 hover:text-red-700 transition font-medium py-2">Contact</Link>
            <Link href="/zones-livraison" onClick={() => setMobileMenuOpen(false)} className="text-red-600 hover:text-red-700 transition font-medium py-2">Livraison</Link>
          </nav>
        )}
      </div>
    </header>
  );
}