// components/ui/ProductCard.tsx
'use client';

import Image from 'next/image';
import { Product } from '@/lib/types';
import { urlFor } from '@/lib/sanity';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: index * 0.05 }} className={`bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 ${!product.available ? 'opacity-60' : ''}`}>
      {product.image && (
        <div className="relative h-48 bg-gray-100">
          <Image src={urlFor(product.image).width(400).height(300).url()} alt={product.name} fill className="object-cover" />
          {!product.available && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"><span className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold">Indisponible</span></div>
          )}
        </div>
      )}

      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
        {product.description && <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>}

        {product.allergenes && product.allergenes.length > 0 && (
          <div className="mb-3">
            <p className="text-xs text-gray-500 mb-1">Allergènes:</p>
            <div className="flex flex-wrap gap-1">{product.allergenes.map((allergen) => (<span key={allergen} className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">{allergen}</span>))}</div>
          </div>
        )}

        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
          <span className="text-2xl font-bold text-red-600">{product.price.toFixed(2)}€</span>
          {product.available && <a href={`tel:0146802120`} className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition font-medium text-sm">Commander</a>}
        </div>
      </div>
    </motion.div>
  );
}