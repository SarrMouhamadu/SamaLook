
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Trash2, ArrowLeft, Loader2, Image as ImageIcon, Lock, Upload, CheckCircle2 } from 'lucide-react';
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  
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
    if (isAuthenticated) {
      fetchProducts();
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple hardcoded password check
    if (password === 'samalook221') {
      setIsAuthenticated(true);
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile && !newProduct.image) {
      alert('Veuillez sélectionner une image');
      return;
    }

    setAdding(true);
    let finalImageUrl = newProduct.image;

    try {
      // 1. Upload image if a file is selected
      if (imageFile) {
        setUploading(true);
        const formData = new FormData();
        formData.append('image', imageFile);
        
        const uploadResponse = await fetch(`${API_URL}/upload`, {
          method: 'POST',
          body: formData,
        });
        
        if (!uploadResponse.ok) throw new Error('Upload failed');
        const uploadData = await uploadResponse.json();
        finalImageUrl = uploadData.url;
        setUploading(false);
      }

      // 2. Create product
      const response = await fetch(`${API_URL}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: newProduct.category,
          product: {
            name: newProduct.name,
            price: newProduct.price,
            image: finalImageUrl,
            rating: newProduct.rating
          }
        }),
      });

      if (response.ok) {
        setNewProduct({ name: '', price: '', image: '', category: 'shoes', rating: 4.5 });
        setImageFile(null);
        fetchProducts();
      }
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Erreur lors de l\'ajout du produit');
    } finally {
      setAdding(false);
      setUploading(false);
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

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full border border-gray-100"
        >
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-4">
              <Lock className="w-8 h-8 text-orange-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Accès Admin</h1>
            <p className="text-gray-500 text-center mt-2">Veuillez entrer le mot de passe pour gérer SamaLook</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mot de passe"
                className={`w-full px-4 py-3 border rounded-xl outline-none focus:ring-2 transition-all ${
                  loginError ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 focus:ring-orange-200'
                }`}
              />
              {loginError && <p className="text-red-500 text-xs mt-1 ml-1">Mot de passe incorrect</p>}
            </div>
            <button 
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all active:scale-95"
            >
              Se connecter
            </button>
            <Link to="/" className="block text-center text-sm text-gray-400 hover:text-gray-600 mt-4">
              Retour au site
            </Link>
          </form>
        </motion.div>
      </div>
    );
  }

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
          <button 
            onClick={() => setIsAuthenticated(false)}
            className="text-sm text-gray-400 hover:text-red-500 transition-colors"
          >
            Déconnexion
          </button>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Photo du produit</label>
                <div 
                  className={`relative border-2 border-dashed rounded-xl p-4 transition-colors text-center ${
                    imageFile ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-orange-400'
                  }`}
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  {imageFile ? (
                    <div className="flex flex-col items-center text-green-600">
                      <CheckCircle2 className="w-8 h-8 mb-1" />
                      <span className="text-xs font-medium truncate max-w-full px-2">{imageFile.name}</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center text-gray-400">
                      <Upload className="w-8 h-8 mb-1" />
                      <span className="text-xs">Cliquez pour choisir une photo</span>
                    </div>
                  )}
                </div>
              </div>

              <button
                disabled={adding || uploading}
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg font-bold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {(adding || uploading) ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
                {uploading ? 'Envoi de l\'image...' : 'Publier l\'article'}
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
                      <AnimatePresence>
                        {products[cat.id].map((product: any) => (
                          <motion.div
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            key={product.id}
                            className="bg-white rounded-xl border border-gray-200 p-4 flex gap-4 group hover:shadow-md transition-shadow"
                          >
                            <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                              {product.image ? (
                                  <img 
                                    src={product.image.startsWith('/uploads') ? `${API_URL.replace('/api', '')}${product.image}` : product.image} 
                                    alt={product.name} 
                                    className="w-full h-full object-cover" 
                                  />
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
                      </AnimatePresence>
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
