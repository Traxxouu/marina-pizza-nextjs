// app/page.tsx
import Link from 'next/link';
import Image from 'next/image';
import { client, queries } from '@/lib/sanity';
import { Product, Category, Notification } from '@/lib/types';
import ProductCard from '@/components/ui/ProductCard';
import { urlFor } from '@/lib/sanity';
import NotificationBanner from '@/components/ui/NotificationBanner';
import { ArrowRight, Phone } from 'lucide-react';

export const revalidate = 60;

export default async function HomePage() {
  const [featuredProducts, categories, notifications] = await Promise.all([
    client.fetch<Product[]>(queries.getFeaturedProducts()),
    client.fetch<Category[]>(queries.getAllCategories()),
    client.fetch<Notification[]>(queries.getActiveNotifications()),
  ]);

  return (
    <div>
  <section className="bg-linear-to-br from-red-600 to-red-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Les Meilleures Pizzas de Thiais
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-red-100">
              Pizzas artisanales, pâtes fraîches, ingrédients de qualité 🍕
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:0146802120"
                className="bg-white text-red-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition flex items-center justify-center gap-2"
              >
                <Phone size={24} />
                01 46 80 21 20
              </a>
              <Link
                href="/menu/pizzas"
                className="bg-red-500 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-red-400 transition flex items-center justify-center gap-2"
              >
                Voir le menu
                <ArrowRight size={24} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        
        {notifications.length > 0 && (
          <div className="mb-12">
            <NotificationBanner notifications={notifications} />
          </div>
        )}

        
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Notre Menu</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Link
                key={category._id}
                href={`/menu/${category.slug.current}`}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition text-center group"
              >
                <div className="mb-3 flex items-center justify-center">
                  {category.image ? (
                    <div className="relative w-20 h-20 rounded-full overflow-hidden mx-auto">
                      <Image src={urlFor(category.image).width(160).height(160).url()} alt={category.name} fill className="object-cover" />
                    </div>
                  ) : (
                    <div className="text-5xl">{category.icon || '🍽️'}</div>
                  )}
                </div>
                <h3 className="font-bold text-gray-800 group-hover:text-red-600 transition">
                  {category.name}
                </h3>
              </Link>
            ))}
          </div>
        </section>

        
        {featuredProducts.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Nos Spécialités</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.map((product, index) => (
                <ProductCard key={product._id} product={product} index={index} />
              ))}
            </div>
          </section>
        )}

        
  <section className="bg-linear-to-r from-red-600 to-red-700 text-white rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-bold mb-4">Prêt à commander ?</h2>
          <p className="text-xl mb-8 text-red-100">
            Appelez-nous pour passer votre commande ou pour plus d&apos;informations
          </p>
          <a
            href="tel:0146802120"
            className="inline-flex items-center gap-3 bg-white text-red-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition"
          >
            <Phone size={24} />
            01 46 80 21 20
          </a>
        </section>
      </div>
    </div>
  );
}