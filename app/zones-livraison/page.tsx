// app/zones-livraison/page.tsx
import { client, queries } from '@/lib/sanity';
import { Settings } from '@/lib/types';
import { MapPin, Check, Clock } from 'lucide-react';

export const metadata = {
  title: 'Zones de Livraison - Marina Pizza',
  description: 'Découvrez si nous livrons dans votre ville. Livraison gratuite à partir de 15€.',
};

export default async function ZonesLivraisonPage() {
  const settings = await client.fetch<Settings>(queries.getSettings());

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">🚚</div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Zones de Livraison</h1>
          <p className="text-xl text-gray-600">Livraison gratuite à partir de 15€ de commande</p>
        </div>

        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl p-8 mb-12 shadow-xl">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4">
              <Clock className="shrink-0 mt-1" size={32} />
              <div>
                <h3 className="text-xl font-bold mb-2">Délai de livraison</h3>
                <p className="text-red-100">Environ 30-45 minutes</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <MapPin className="shrink-0 mt-1" size={32} />
              <div>
                <h3 className="text-xl font-bold mb-2">Notre restaurant</h3>
                <p className="text-red-100">
                  {settings?.address}
                  <br />
                  {settings?.zipCode} {settings?.city}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <MapPin className="text-red-600" size={28} />
            Villes et quartiers livrés
          </h2>

          {settings?.deliveryZones && settings.deliveryZones.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-4">
              {settings.deliveryZones.map((zone, index) => (
                <div key={index} className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <Check className="text-green-600 shrink-0" size={24} />
                  <span className="font-medium text-gray-800">{zone}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">Aucune zone de livraison configurée. Contactez-nous pour plus d'informations.</p>
          )}

          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <p className="text-gray-700">
              <strong className="text-blue-800">Note :</strong> Votre ville n'apparaît pas dans la liste ?{' '}
              Contactez-nous au <a href={`tel:${settings?.phone}`} className="text-blue-600 hover:underline font-semibold">{settings?.phone}</a> pour vérifier si nous pouvons vous livrer.
            </p>
          </div>
        </div>

        <div className="mt-12 text-center bg-gray-50 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Prêt à commander ?</h2>
          <p className="text-gray-600 mb-6">Appelez-nous pour passer votre commande</p>
          <a href={`tel:${settings?.phone}`} className="inline-block bg-red-600 text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-red-700 transition">📞 {settings?.phone}</a>
        </div>
      </div>
    </div>
  );
}