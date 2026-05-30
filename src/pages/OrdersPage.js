import React, { useState, useEffect } from 'react';
import { Package, ArrowLeft, Clock } from 'lucide-react';
import { api } from '../api/api';
import { useAuth } from '../context/AuthContext';

const statusColors = {
  PENDING:          'bg-yellow-100 text-yellow-700',
  CONFIRMED:        'bg-blue-100 text-blue-700',
  PREPARING:        'bg-purple-100 text-purple-700',
  OUT_FOR_DELIVERY: 'bg-orange-100 text-orange-700',
  DELIVERED:        'bg-green-100 text-green-700',
  CANCELLED:        'bg-red-100 text-red-700',
};

const statusIcon = {
  PENDING: '⏳',
  CONFIRMED: '✅',
  PREPARING: '👨‍🍳',
  OUT_FOR_DELIVERY: '🛵',
  DELIVERED: '🎉',
  CANCELLED: '❌',
};

const OrdersPage = ({ setCurrentPage }) => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) { setCurrentPage('login'); return; }
    api.get(`/api/orders/user/${user.userId}`)
      .then(res => setOrders(res.data || []))
      .catch(() => setError('Failed to load orders.'))
      .finally(() => setLoading(false));
  }, [user, setCurrentPage]);

  const cancelOrder = async (id) => {
    try {
      await api.patch(`/api/orders/${id}/cancel`);
      setOrders(prev => prev.map(o => o.id === id ? { ...o, status: 'CANCELLED' } : o));
    } catch {
      alert('Could not cancel order.');
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 pt-20 pb-10 px-4">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => setCurrentPage('foods')}
          className="flex items-center gap-2 text-orange-600 font-semibold mb-6 hover:text-orange-700"
        >
          <ArrowLeft className="w-5 h-5" /> Back to Menu
        </button>

        <h1 className="text-3xl font-bold text-gray-800 mb-8">📦 My Orders</h1>

        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-orange-500 border-t-transparent"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-300 text-red-700 rounded-xl p-6 text-center">{error}</div>
        )}

        {!loading && orders.length === 0 && (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <Package className="w-20 h-20 text-orange-200 mb-4" />
            <h2 className="text-2xl font-bold text-gray-500 mb-2">No orders yet</h2>
            <button onClick={() => setCurrentPage('foods')} className="mt-4 bg-orange-500 text-white px-6 py-2 rounded-xl hover:bg-orange-600 font-semibold">
              Order Now
            </button>
          </div>
        )}

        <div className="space-y-4">
          {orders.map(order => (
            <div key={order.id} className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-500">Order #{order.id}</p>
                  <p className="font-bold text-gray-800 text-lg">Food ID: {order.foodId}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColors[order.status] || 'bg-gray-100 text-gray-600'}`}>
                  {statusIcon[order.status]} {order.status}
                </span>
              </div>
              <div className="flex items-center justify-between text-gray-600">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{order.orderDate ? new Date(order.orderDate).toLocaleString() : 'Just now'}</span>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Qty: {order.quantity}</p>
                  <p className="font-bold text-orange-600 text-lg">₹{order.totalAmount}</p>
                </div>
              </div>
              {order.status === 'PENDING' && (
                <button
                  onClick={() => cancelOrder(order.id)}
                  className="mt-4 text-red-500 border border-red-300 px-4 py-1.5 rounded-lg text-sm hover:bg-red-50 transition-all font-semibold"
                >
                  Cancel Order
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
