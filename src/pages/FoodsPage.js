import React, { useState, useEffect } from 'react';
import { Star, ShoppingCart, Plus, Minus, Search } from 'lucide-react';
import { api } from '../api/api';

const FoodsPage = ({ setCurrentPage, cart, setCart }) => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    api.get('/api/foods')
      .then(res => setFoods(res.data || []))
      .catch(() => setError('Failed to load foods. Is the backend running?'))
      .finally(() => setLoading(false));
  }, []);

  const addToCart = (food) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === food.id);
      if (existing) {
        return prev.map(i => i.id === food.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...food, qty: 1 }];
    });
  };

  const removeFromCart = (food) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === food.id);
      if (existing?.qty === 1) return prev.filter(i => i.id !== food.id);
      return prev.map(i => i.id === food.id ? { ...i, qty: i.qty - 1 } : i);
    });
  };

  const getQty = (id) => cart.find(i => i.id === id)?.qty || 0;

  const filtered = foods.filter(f =>
    f.name?.toLowerCase().includes(search.toLowerCase())
  );

  const totalItems = cart.reduce((sum, i) => sum + i.qty, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white pt-20 px-4 pb-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-4">
          <h1 className="text-4xl font-bold text-gray-800">🍽️ Local Menu</h1>
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-72">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search dishes..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
              />
            </div>
            {totalItems > 0 && (
              <button
                onClick={() => setCurrentPage('cart')}
                className="relative bg-orange-500 text-white px-5 py-3 rounded-xl flex items-center gap-2 hover:bg-orange-600 transition-all font-semibold shadow-lg"
              >
                <ShoppingCart className="w-5 h-5" />
                Cart
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                  {totalItems}
                </span>
              </button>
            )}
          </div>
        </div>

        {/* States */}
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-orange-500 border-t-transparent"></div>
          </div>
        )}
        {error && (
          <div className="bg-red-50 border border-red-300 text-red-700 rounded-xl p-6 text-center">{error}</div>
        )}

        {/* Food Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((food) => (
              <div key={food.id} className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                <div className="h-48 overflow-hidden bg-gradient-to-br from-orange-100 to-orange-200">
                  {food.imageUrl ? (
                    <img src={food.imageUrl} alt={food.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-7xl">🍽️</div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold mb-1 text-gray-800">{food.name}</h3>
                  {food.description && (
                    <p className="text-gray-500 text-sm mb-3 line-clamp-2">{food.description}</p>
                  )}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-semibold">4.5</span>
                    </div>
                    <span className="text-xl font-bold text-orange-600">₹{food.price}</span>
                  </div>
                  <div className="flex items-center justify-center gap-3">
                    {getQty(food.id) === 0 ? (
                      <button
                        onClick={() => addToCart(food)}
                        className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-2 rounded-xl font-semibold hover:from-orange-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
                      >
                        Add to Cart
                      </button>
                    ) : (
                      <div className="flex items-center gap-3 w-full justify-center">
                        <button
                          onClick={() => removeFromCart(food)}
                          className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center hover:bg-orange-200 transition-all font-bold"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="text-xl font-bold text-gray-800 w-6 text-center">{getQty(food.id)}</span>
                        <button
                          onClick={() => addToCart(food)}
                          className="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center hover:bg-orange-600 transition-all"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {filtered.length === 0 && !loading && (
              <div className="col-span-4 text-center text-gray-400 py-20 text-xl">No dishes found 😕</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodsPage;
