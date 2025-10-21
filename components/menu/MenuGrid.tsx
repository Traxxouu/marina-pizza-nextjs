// components/menu/MenuGrid.tsx
import ProductCard from '@/components/ui/ProductCard';
import { Product } from '@/lib/types';

interface MenuGridProps { products: Product[]; }

export default function MenuGrid({ products }: MenuGridProps) {
  if (products.length === 0) return (<div className="text-center py-16"><p className="text-gray-500 text-lg">Aucun produit disponible dans cette catégorie.</p></div>);
  return (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{products.map((product, index) => (<ProductCard key={product._id} product={product} index={index} />))}</div>);
}