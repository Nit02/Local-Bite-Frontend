import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { api } from '../api/api';
import { useAuth } from '../context/AuthContext';

const SignUpPage = ({ setCurrentPage }) => {
  const { login } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'CUSTOMER' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await api.post('/api/auth/register', form);
      login(res.data);
      setCurrentPage('foods');
    } catch (err) {
      setError(err.message || 'Registration failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100 px-4 py-8">
      <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 w-full max-w-md" style={{ animation: 'scaleIn 0.5s ease-out' }}>
        <div className="flex justify-center mb-4">
          <Heart className="w-10 h-10 text-orange-500" />
        </div>
        <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">Join Local Bites</h2>

        {error && (
          <div className="bg-red-50 border border-red-300 text-red-700 rounded-xl px-4 py-3 mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            required
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl mb-4 focus:border-orange-500 focus:outline-none transition-all duration-300"
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            required
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl mb-4 focus:border-orange-500 focus:outline-none transition-all duration-300"
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            required
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl mb-4 focus:border-orange-500 focus:outline-none transition-all duration-300"
          />
          <select
            value={form.role}
            onChange={e => setForm({ ...form, role: e.target.value })}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl mb-6 focus:border-orange-500 focus:outline-none transition-all duration-300 bg-white"
          >
            <option value="CUSTOMER">I'm a Customer</option>
            <option value="VENDOR">I'm a Vendor</option>
          </select>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          Already have an account?
          <button onClick={() => setCurrentPage('login')} className="text-orange-500 font-semibold ml-2 hover:text-orange-600">
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
