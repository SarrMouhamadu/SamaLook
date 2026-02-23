
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router';
import { motion, useScroll, useTransform } from 'motion/react';
import { ShoppingBag, Heart, Search, ArrowUp, Settings } from 'lucide-react';
import { Hero } from './components/Hero';
import { ProductGrid } from './components/ProductGrid';
import { Newsletter } from './components/Newsletter';
import { Footer } from './components/Footer';
import { ProductDetail, Product } from './components/ProductDetail';
import { Admin } from './pages/Admin';

const API_URL = import.meta.env.VITE_API_URL || '/api';

function Store() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<any>({});
  const { scrollY } = useScroll();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/products`);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProductClick = (product: any) => {
      setSelectedProduct(product);
  };

  const closeProductDetail = () => {
      setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Simple Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-orange-500/90 via-amber-400/90 to-lime-500/90 backdrop-blur-md shadow-lg"
      >
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2"
            >
              <Link to="/">
                <img src="/samalook-logo.png" alt="SamaLook Logo" className="h-10 w-auto object-contain bg-white/10 rounded-lg p-1" />
              </Link>
            </motion.div>

            <div className="flex items-center gap-4 sm:gap-6">
              <button className="p-2 hover:bg-white/20 rounded-full transition-colors">
                <Search className="w-5 h-5 text-white" />
              </button>
              <button className="p-2 hover:bg-white/20 rounded-full transition-colors relative">
                <ShoppingBag className="w-5 h-5 text-white" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-white text-orange-600 text-xs rounded-full flex items-center justify-center font-bold">
                  0
                </span>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <Hero />

      {/* Products Sections */}
      {products.shoes && (
        <ProductGrid id="chaussures" title="Chaussures" emoji="👟" products={products.shoes} bgColor="bg-amber-50" onProductClick={handleProductClick} />
      )}
      {products.watches && (
        <ProductGrid id="montres" title="Montres" emoji="⌚" products={products.watches} bgColor="bg-green-50" onProductClick={handleProductClick} />
      )}
      {products.perfumes && (
        <ProductGrid id="parfums" title="Parfums" emoji="💐" products={products.perfumes} bgColor="bg-red-50" onProductClick={handleProductClick} />
      )}
      {products.fabrics && (
        <ProductGrid id="tissus-sénégalais" title="Tissus Sénégalais" emoji="🎨" products={products.fabrics} bgColor="bg-yellow-50" onProductClick={handleProductClick} />
      )}
      {products.dresses && (
        <ProductGrid id="robes" title="Robes" emoji="👗" products={products.dresses} bgColor="bg-orange-50" onProductClick={handleProductClick} />
      )}
      {products.pullovers && (
        <ProductGrid id="pull-overs" title="Pull-overs" emoji="🧥" products={products.pullovers} bgColor="bg-teal-50" onProductClick={handleProductClick} />
      )}

      {/* Newsletter */}
      <Newsletter />

      {/* Footer */}
      <Footer />

      {/* Product Detail Modal */}
      <ProductDetail product={selectedProduct} onClose={closeProductDetail} />

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-4 bg-gradient-to-r from-orange-500 via-amber-400 to-lime-500 text-white rounded-full shadow-2xl z-50"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowUp className="w-6 h-6" />
        </motion.button>
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Store />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;