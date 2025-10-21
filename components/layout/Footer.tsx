// components/layout/Footer.tsx
import Link from 'next/link';
import { MapPin, Phone, Mail, Facebook, Instagram } from 'lucide-react';
import { Settings } from '@/lib/types';

interface FooterProps {
  settings: Settings;
}

export default function Footer({ settings }: FooterProps) {
  const currentYear = new Date().getFullYear();

    if (!settings) {
    return (
      <footer className="bg-gray-900 text-white mt-16">
        <div className="container mx-auto px-4 py-12 text-center">
          <p className="text-gray-400">Configuration du site en cours...</p>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-red-500">Marina Pizza</h3>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-start gap-3">
                <MapPin size={20} className="mt-1 shrink-0" />
                <div>
                  <p>{settings.address}</p>
                  <p>{settings.zipCode} {settings.city}</p>
                </div>
              </div>
              <a href={`tel:${settings.phone}`} className="flex items-center gap-3 hover:text-red-500 transition"><Phone size={20} /><span>{settings.phone}</span></a>
              <a href={`mailto:${settings.email}`} className="flex items-center gap-3 hover:text-red-500 transition"><Mail size={20} /><span>{settings.email}</span></a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Horaires d&apos;ouverture</h3>
            <div className="space-y-2 text-gray-300">
              {settings.openingHours?.map((schedule, index) => (
                <div key={index} className="flex justify-between"><span className="font-medium">{schedule.day}</span><span>{schedule.hours}</span></div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Liens rapides</h3>
            <div className="space-y-2 text-gray-300">
              <Link href="/" className="block hover:text-red-500 transition">Accueil</Link>
              <Link href="/menu/pizzas" className="block hover:text-red-500 transition">Notre menu</Link>
              <Link href="/contact" className="block hover:text-red-500 transition">Contact</Link>
              <Link href="/zones-livraison" className="block hover:text-red-500 transition">Zones de livraison</Link>
            </div>

            {settings.socialMedia && (
              <div className="flex gap-4 mt-6">
                {settings.socialMedia.facebook && (
                  <a href={settings.socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition" aria-label="Facebook"><Facebook size={24} /></a>
                )}
                {settings.socialMedia.instagram && (
                  <a href={settings.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition" aria-label="Instagram"><Instagram size={24} /></a>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400 text-sm">
          <p>&copy; {currentYear} Marina Pizza. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}