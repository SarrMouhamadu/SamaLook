
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingCart, Star, Heart } from 'lucide-react';

// Define types locally or import if shared (putting here for now for speed)
export interface ProductVariant {
  name: string;
  class: string; // Tailwind class for background color
  image?: string; // Optional specific image for this color
}

export interface Product {
    id: number;
    name: string;
    price: string;
    image: string;
    rating: number;
    sizes?: string[]; // Optional sizes
    variants?: ProductVariant[]; // Optional color variants
}

interface ProductDetailProps {
  product: Product | null;
  onClose: () => void;
}

export function ProductDetail({ product, onClose }: ProductDetailProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);

  if (!product) return null;

  // Reset state when product opens (simple effect-like logic)
  const currentImage = selectedVariant?.image || product.image;

  return (
    <AnimatePresence>
      {product && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/50 backdrop-blur-sm cursor-pointer"
            />
            
            {/* Modal */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row z-[70]"
            >
                    {/* Close Button */}
                    <button 
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 bg-white/80 rounded-full hover:bg-gray-100 z-10 transition-colors shadow-sm"
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>

                    {/* Image Section */}
                    <div className="w-full md:w-1/2 bg-gray-100 relative min-h-[300px] md:min-h-[500px]">
                        <img 
                            src={currentImage} 
                            alt={product.name} 
                            className="w-full h-full object-cover absolute inset-0"
                        />
                        <div className="absolute top-4 left-4 inline-flex items-center gap-1 bg-white/90 px-3 py-1.5 rounded-full text-sm font-bold text-gray-900 shadow-sm">
                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                            {product.rating}
                        </div>
                    </div>

                    {/* Details Section */}
                    <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col overflow-y-auto">
                        <div className="mb-auto">
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h2>
                            <div className="flex items-baseline gap-2 mb-8">
                                <span className="text-2xl font-bold text-gray-900">{product.price}</span>
                                <span className="text-sm font-medium text-gray-500">FCFA</span>
                            </div>

                            {/* Variants / Colors */}
                            {product.variants && product.variants.length > 0 && (
                                <div className="mb-8">
                                    <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">Couleurs disponibles</h3>
                                    <div className="flex gap-3">
                                        {product.variants.map((variant, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => setSelectedVariant(variant)}
                                                className={`w-10 h-10 rounded-full border-2 transition-all relative ${
                                                    selectedVariant === variant || (!selectedVariant && idx === 0) 
                                                        ? 'border-gray-900 scale-110 ring-2 ring-gray-200 ring-offset-2' 
                                                        : 'border-transparent hover:scale-110'
                                                }`}
                                                title={variant.name}
                                            >
                                                <span className={`absolute inset-0.5 rounded-full ${variant.class}`} />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Sizes */}
                            {product.sizes && product.sizes.length > 0 && (
                                <div className="mb-8">
                                    <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">Pointure / Taille</h3>
                                    <div className="flex flex-wrap gap-3">
                                        {product.sizes.map((size) => (
                                            <button
                                                key={size}
                                                onClick={() => setSelectedSize(size)}
                                                className={`min-w-[48px] h-12 px-4 rounded-lg text-sm font-semibold border transition-all flex items-center justify-center ${
                                                    selectedSize === size
                                                        ? 'bg-gray-900 text-white border-gray-900'
                                                        : 'bg-white text-gray-700 border-gray-200 hover:border-gray-900 hover:text-gray-900'
                                                }`}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Actions */}
                        <div className="mt-8 flex gap-4">
                            <button className="flex-1 h-14 bg-gradient-to-r from-red-600 via-yellow-500 to-green-600 text-white rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 flex items-center justify-center gap-3">
                                <ShoppingCart className="w-5 h-5" />
                                Ajouter au panier
                            </button>
                            <button className="h-14 w-14 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors text-gray-500 hover:text-red-500 flex items-center justify-center">
                                <Heart className="w-6 h-6" />
                            </button>
                        </div>
                        
                        {/* Wave Info */}
                        <div className="mt-6 pt-6 border-t border-gray-100 flex flex-col items-center gap-1 text-sm text-gray-500">
                            <span>Payer avec Wave au:</span>
                            <span className="font-bold text-xl text-[#1dc4ff]">76 262 92 01</span>
                        </div>
                    </div>
            </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
