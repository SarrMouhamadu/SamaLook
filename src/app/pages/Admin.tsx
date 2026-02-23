
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Plus, Trash2, ArrowLeft, Loader2, Image as ImageIcon } from 'lucide-react';
import { Link } from 'react-router';

const API_URL = import.meta.env.VITE_API_URL || '/api';

const CATEGORIES = [
  { id: 'shoes', name: 'Chaussures', emoji: '👟' },
  { id: 'watches', name: 'Montres', emoji: '⌚' },
  { id: 'perfumes', name: 'Parfums', emoji: '💐' },
  { id: 'fabrics', name: 'Tissus Sénégalais', emoji: '🎨' },
  { id: 'dresses', name: 'Robes', emoji: '👗' },
  { id: 'pullovers', name: 'Pull-overs', emoji: '🧥' },
];

export function Admin() {
  const [products, setProducts] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    image: '',
    category: 'shoes',
    rating: 4.5
  });

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/products`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdding(true);
    try {
      const response = await fetch(`${API_URL}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: newProduct.category,
          product: {
            name: newProduct.name,
            price: newProduct.price,
            image: newProduct.image,
            rating: newProduct.rating
          }
        }),
      });
      if (response.ok) {
        setNewProduct({ name: '', price: '', image: '', category: 'shoes', rating: 4.5 });
        fetchProducts();
      }
    } catch (error) {
      console.error('Error adding product:', error);
    } finally {
      setAdding(false);
    }
  };

  const handleDeleteProduct = async (id: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) return;
    try {
      const response = await fetch(`${API_URL}/products/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchProducts();
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Admin Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Back Office Admin</h1>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
            Live
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Add Product Form */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-24"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Plus className="w-5 h-5 text-orange-500" />
              Ajouter un article
            </h2>
            <form onSubmit={handleAddProduct} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom de l'article</label>
                <input
                  required
                  type="text"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                  placeholder="ex: Baskets de Luxe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Prix (FCFA)</label>
                <input
                  required
                  type="text"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                  placeholder="ex: 7 500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
                <select
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                >
                  {CATEGORIES.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.emoji} {cat.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">URL de l'image</label>
                <input
                  required
                  type="url"
                  value={newProduct.image}
                  onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                  placeholder="https://images.unsplash.com/..."
                />
              </div>
              <button
                disabled={adding}
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg font-bold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {adding ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
                Publier l'article
              </button>
            </form>
          </motion.div>
        </div>

        {/* Product List */}
        <div className="lg:col-span-2">
          {loading ? (
            <div className="h-64 flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
            </div>
          ) : (
            <div className="space-y-8">
              {CATEGORIES.map(cat => (
                products[cat.id] && products[cat.id].length > 0 && (
                  <div key={cat.id}>
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <span>{cat.emoji}</span>
                      {cat.name}
                      <span className="text-sm font-normal text-gray-500 ml-2">({products[cat.id].length})</span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {products[cat.id].map((product: any) => (
                        <motion.div
                          layout
                          key={product.id}
                          className="bg-white rounded-xl border border-gray-200 p-4 flex gap-4 group hover:shadow-md transition-shadow"
                        >
                          <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                            {product.image ? (
                                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center"><ImageIcon className="w-6 h-6 text-gray-400" /></div>
                            )}
                          </div>
                          <div className="flex-grow min-w-0">
                            <h4 className="font-bold text-gray-900 truncate">{product.name}</h4>
                            <p className="text-orange-600 font-bold">{product.price} FCFA</p>
                            <p className="text-xs text-gray-400 mt-1">ID: #{product.id}</p>
                          </div>
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                            title="Supprimer"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
