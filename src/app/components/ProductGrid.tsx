import { motion } from 'motion/react';
import { Heart, ShoppingCart } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  rating: number;
}

interface ProductGridProps {
  id: string;
  title: string;
  emoji: string;
  products: Product[];
  bgColor: string;
  onProductClick?: (product: Product) => void;
}

export function ProductGrid({ id, title, emoji, products, bgColor, onProductClick }: ProductGridProps) {
  return (
    <section id={id} className={`py-16 ${bgColor}`}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header - Simple and Bold */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="text-5xl mb-3">{emoji}</div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            {title}
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-red-500 via-yellow-400 to-green-500 mx-auto mt-4 rounded-full" />
        </motion.div>

        {/* Products Grid - Mobile First */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl overflow-hidden shadow-md cursor-pointer hover:shadow-xl transition-shadow"
              onClick={() => onProductClick?.(product)}
            >
              {/* Product Image */}
              <div className="relative aspect-square overflow-hidden">
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Quick Action Button */}
                <button className="absolute top-2 right-2 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg">
                  <Heart className="w-4 h-4 text-red-500" />
                </button>
              </div>

              {/* Product Info */}
              <div className="p-3">
                <h3 className="font-semibold text-sm text-gray-900 mb-2 line-clamp-1">
                  {product.name}
                </h3>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-base font-bold text-gray-900">{product.price}</div>
                    <div className="text-xs text-gray-500">FCFA</div>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    className="p-2 bg-gradient-to-r from-red-500 via-yellow-400 to-green-500 text-white rounded-full shadow-lg"
                  >
                    <ShoppingCart className="w-4 h-4" />
                  </motion.button>
                </div>

                {/* Wave Payment Number */}
                <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs text-gray-500">Payer avec Wave au:</span>
                  <span className="text-xs font-bold text-[#1dc4ff]">76 262 92 01</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <button className="px-8 py-3 bg-gradient-to-r from-red-600 via-yellow-500 to-green-600 text-white rounded-full font-semibold shadow-lg">
            Voir Plus
          </button>
        </motion.div>
      </div>
    </section>
  );
}