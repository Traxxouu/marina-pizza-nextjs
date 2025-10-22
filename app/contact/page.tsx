// app/contact/page.tsx
import ContactForm from '@/components/contact/ContactForm';
import { client, queries } from '@/lib/sanity';
import { Settings } from '@/lib/types';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export const metadata = {
  title: 'Contact - Marina Pizza',
  description: 'Contactez Marina Pizza pour toute question ou pour passer une commande.',
};

export default async function ContactPage() {
  const settings = await client.fetch<Settings>(queries.getSettings());

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Contactez-nous</h1>
          <p className="text-xl text-gray-600">Une question ? Une commande ? Nous sommes là pour vous aider !</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Nos coordonnées</h2>

              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm">
                  <MapPin className="text-red-600 shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Adresse</h3>
                    <p className="text-gray-600">
                      {settings?.address}
                      <br />
                      {settings?.zipCode} {settings?.city}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm">
                  <Phone className="text-red-600 shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Téléphone</h3>
                    <a href={`tel:${settings?.phone}`} className="text-red-600 hover:text-red-700 font-medium">{settings?.phone}</a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm">
                  <Mail className="text-red-600 shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Email</h3>
                    <a href={`mailto:${settings?.email}`} className="text-red-600 hover:text-red-700 font-medium">{settings?.email}</a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm">
                  <Clock className="text-red-600 shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Horaires d&apos;ouverture</h3>
                    <div className="space-y-1 text-gray-600">
                      {settings?.openingHours?.map((schedule, index) => (
                        <div key={index} className="flex justify-between gap-4">
                          <span className="font-medium">{schedule.day}:</span>
                          <span>{schedule.hours}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
              <p className="text-gray-500">🗺️ Carte Google Maps (à ajouter)</p>
            </div>
          </div>

          <div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Envoyez-nous un message</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}