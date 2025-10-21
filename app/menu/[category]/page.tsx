import { client, queries } from '@/lib/sanity';
import { Product, Category } from '@/lib/types';
import MenuGrid from '@/components/menu/MenuGrid';
import { notFound } from 'next/navigation';

export const revalidate = 60;

interface MenuPageProps {
  params: Promise<{
    category: string;
  }>;
}

export async function generateStaticParams() {
  const categories = await client.fetch<Category[]>(queries.getAllCategories());
  return categories.map((cat) => ({ category: cat.slug.current }));
}

export async function generateMetadata({ params }: MenuPageProps) {
  const { category } = await params;
  const categories = await client.fetch<Category[]>(queries.getAllCategories());
  const currentCategory = categories.find((cat) => cat.slug.current === category);

  return {
    title: `${currentCategory?.name || 'Menu'} - Marina Pizza`,
    description: currentCategory?.description || `Découvrez notre sélection de ${currentCategory?.name}`,
  };
}

export default async function MenuPage({ params }: MenuPageProps) {
  const { category } = await params;

  const [products, categories] = await Promise.all([
    client.fetch<Product[]>(queries.getProductsByCategory(category)),
    client.fetch<Category[]>(queries.getAllCategories()),
  ]);

  const currentCategory = categories.find((cat) => cat.slug.current === category);

  if (!currentCategory) notFound();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <div className="text-6xl mb-4">{currentCategory.icon || '🍽️'}</div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">{currentCategory.name}</h1>
        {currentCategory.description && <p className="text-xl text-gray-600 max-w-2xl mx-auto">{currentCategory.description}</p>}
      </div>

      <MenuGrid products={products} />

      <div className="mt-16 bg-red-50 border border-red-200 rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Prêt à commander ?</h2>
        <p className="text-gray-600 mb-6">Appelez-nous pour passer votre commande</p>
        <a href="tel:0146802120" className="inline-block bg-red-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-red-700 transition">📞 01 46 80 21 20</a>
      </div>
    </div>
  );
}