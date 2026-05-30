import React, { useState } from 'react';
import { Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { api } from '../api/api';
import { useAuth } from '../context/AuthContext';

const CartPage = ({ cart, setCart, setCurrentPage }) => {
  const { user } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const updateQty = (id, delta) => {
    setCart(prev =>
      prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i)
    );
  };

  const remove = (id) => setCart(prev => prev.filter(i => i.id !== id));

  const placeOrder = async () => {
    if (!user) { setCurrentPage('login'); return; }
    setLoading(true);
    setError('');
    try {
      // Place one order per cart item, then pay for the first
      const orderPromises = cart.map(item =>
        api.post('/api/orders', {
          userId: user.userId,
          foodId: item.id,
          quantity: item.qty,
        })
      );
      const orders = await Promise.all(orderPromises);

      // Process payment for the first order
      await api.post('/api/payments', {
        orderId: orders[0].data.id,
        paymentMethod,
      });

      setCart([]);
      setCurrentPage('orders');
    } catch (err) {
      setError(err.message || 'Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-orange-50 pt-24 flex flex-col items-center justify-center px-4">
        <ShoppingBag className="w-24 h-24 text-orange-200 mb-6" />
        <h2 className="text-3xl font-bold text-gray-600 mb-4">Your cart is empty</h2>
        <button
          onClick={() => setCurrentPage('foods')}
          className="bg-orange-500 text-white px-8 py-3 rounded-xl font-semibold hover:bg-orange-600 transition-all transform hover:scale-105"
        >
          Browse Menu
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-orange-50 pt-20 pb-10 px-4">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => setCurrentPage('foods')}
          className="flex items-center gap-2 text-orange-600 font-semibold mb-6 hover:text-orange-700"
        >
          <ArrowLeft className="w-5 h-5" /> Back to Menu
        </button>

        <h1 className="text-3xl font-bold text-gray-800 mb-8">🛒 Your Cart</h1>

        {error && (
          <div className="bg-red-50 border border-red-300 text-red-700 rounded-xl px-4 py-3 mb-6">{error}</div>
        )}

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
          {cart.map((item, idx) => (
            <div key={item.id} className={`flex items-center gap-4 p-5 ${idx !== cart.length - 1 ? 'border-b border-gray-100' : ''}`}>
              <div className="w-16 h-16 rounded-xl overflow-hidden bg-orange-100 flex-shrink-0">
                {item.imageUrl
                  ? <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                  : <div className="w-full h-full flex items-center justify-center text-3xl">🍽️</div>
                }
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-800">{item.name}</h3>
                <p className="text-orange-600 font-semibold">₹{item.price}</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => updateQty(item.id, -1)} className="w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center hover:bg-orange-200 font-bold text-lg">−</button>
                <span className="w-6 text-center font-bold">{item.qty}</span>
                <button onClick={() => updateQty(item.id, 1)} className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center hover:bg-orange-600 font-bold text-lg">+</button>
              </div>
              <p className="font-bold text-gray-800 w-20 text-right">₹{(item.price * item.qty).toFixed(0)}</p>
              <button onClick={() => remove(item.id)} className="text-red-400 hover:text-red-600 transition-colors ml-2">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>

        {/* Payment method */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h3 className="font-bold text-gray-800 mb-4 text-lg">Payment Method</h3>
          <div className="flex gap-3 flex-wrap">
            {['COD', 'UPI', 'CARD'].map(m => (
              <button
                key={m}
                onClick={() => setPaymentMethod(m)}
                className={`px-6 py-2 rounded-xl font-semibold border-2 transition-all ${
                  paymentMethod === m
                    ? 'bg-orange-500 text-white border-orange-500'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-orange-300'
                }`}
              >
                {m === 'COD' ? '💵 Cash on Delivery' : m === 'UPI' ? '📱 UPI' : '💳 Card'}
              </button>
            ))}
          </div>
        </div>

        {/* Order summary */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <span className="text-xl text-gray-600">Total</span>
            <span className="text-3xl font-bold text-orange-600">₹{total.toFixed(0)}</span>
          </div>
          <button
            onClick={placeOrder}
            disabled={loading}
            className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-4 rounded-xl font-bold text-lg hover:from-orange-600 hover:to-pink-600 transition-all transform hover:scale-105 shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Placing Order...' : '🎉 Place Order'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
