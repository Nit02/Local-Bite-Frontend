import React, { useState, useEffect } from 'react';
import { MapPin, Menu, X, Star, Users, Award, Heart, ShoppingCart, LogOut, Package } from 'lucide-react';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import FoodsPage from './pages/FoodsPage';
import CartPage from './pages/CartPage';
import OrdersPage from './pages/OrdersPage';
import AboutPage from './pages/AboutPage';
import TermsPage from './pages/TermsPage';

// ─── Navbar ────────────────────────────────────────────────────────────────
const Navbar = ({ currentPage, setCurrentPage, scrollY, cart }) => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const totalItems = cart.reduce((sum, i) => sum + i.qty, 0);
  const isTransparent = scrollY <= 50 && currentPage === 'home';

  const navTo = (page) => { setCurrentPage(page); setIsMenuOpen(false); setIsBrowseOpen(false); };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isTransparent ? 'bg-transparent' : 'bg-white shadow-lg'}`}>
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div onClick={() => navTo('home')} className="flex items-center cursor-pointer">
          <Heart className={`w-8 h-8 mr-2 ${isTransparent ? 'text-white' : 'text-orange-500'}`} />
          <span className={`text-2xl font-bold ${isTransparent ? 'text-white' : 'text-gray-800'}`}>Local Bites</span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-2">
          <button onClick={() => navTo('foods')} className={`px-4 py-2 rounded-lg transition-all ${isTransparent ? 'text-white hover:bg-white/20' : 'text-gray-700 hover:bg-gray-100'}`}>
            Menu
          </button>
          <button onClick={() => navTo('about')} className={`px-4 py-2 rounded-lg transition-all ${isTransparent ? 'text-white hover:bg-white/20' : 'text-gray-700 hover:bg-gray-100'}`}>
            About
          </button>

          {/* Cart */}
          <button onClick={() => navTo('cart')} className="relative px-4 py-2">
            <ShoppingCart className={`w-6 h-6 ${isTransparent ? 'text-white' : 'text-gray-700'}`} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">{totalItems}</span>
            )}
          </button>

          {user ? (
            <>
              <button onClick={() => navTo('orders')} className={`flex items-center gap-1 px-4 py-2 rounded-lg transition-all ${isTransparent ? 'text-white hover:bg-white/20' : 'text-gray-700 hover:bg-gray-100'}`}>
                <Package className="w-4 h-4" /> Orders
              </button>
              <div className={`flex items-center gap-2 px-3 py-1 rounded-lg ${isTransparent ? 'text-white' : 'text-gray-700'}`}>
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {user.name?.[0]?.toUpperCase()}
                </div>
                <span className="font-semibold text-sm">{user.name}</span>
              </div>
              <button
                onClick={() => { logout(); navTo('home'); }}
                className="flex items-center gap-1 px-4 py-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition-all font-semibold text-sm"
              >
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </>
          ) : (
            <>
              <button onClick={() => navTo('login')} className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all transform hover:scale-105 font-semibold">
                Login
              </button>
              <button onClick={() => navTo('signup')} className="px-6 py-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg hover:from-orange-600 hover:to-pink-600 transition-all transform hover:scale-105 font-semibold">
                Sign Up
              </button>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={`md:hidden ${isTransparent ? 'text-white' : 'text-gray-800'}`}>
          {isMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg px-4 py-4 space-y-3">
          <button onClick={() => navTo('foods')} className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg">Menu</button>
          <button onClick={() => navTo('about')} className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg">About</button>
          <button onClick={() => navTo('cart')} className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg">
            Cart {totalItems > 0 && <span className="ml-2 bg-red-500 text-white rounded-full px-2 py-0.5 text-xs">{totalItems}</span>}
          </button>
          {user ? (
            <>
              <button onClick={() => navTo('orders')} className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg">My Orders</button>
              <button onClick={() => { logout(); navTo('home'); }} className="w-full px-4 py-2 bg-red-50 text-red-500 rounded-lg font-semibold">Logout</button>
            </>
          ) : (
            <>
              <button onClick={() => navTo('login')} className="w-full px-4 py-2 bg-orange-500 text-white rounded-lg font-semibold">Login</button>
              <button onClick={() => navTo('signup')} className="w-full px-4 py-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg font-semibold">Sign Up</button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

// ─── Home Page ──────────────────────────────────────────────────────────────
const HomePage = ({ setCurrentPage, scrollY }) => {
  const suggestedFoods = [
    { name: 'Mountain Momos', image: '🥟', rating: 4.8, price: '₹80' },
    { name: 'Himalayan Thukpa', image: '🍜', rating: 4.9, price: '₹120' },
    { name: 'Local Dhaba Curry', image: '🍛', rating: 4.7, price: '₹150' },
    { name: 'Fresh Pakoras', image: '🥘', rating: 4.6, price: '₹60' },
  ];
  const reviews = [
    { name: 'Priya Sharma', rating: 5, text: 'Amazing app! Found authentic local food in Manali. The momos were incredible!', location: 'Manali' },
    { name: 'Rahul Verma', rating: 5, text: 'Best way to discover hidden gems. Used it in Shimla and loved every bite!', location: 'Shimla' },
    { name: 'Anita Patel', rating: 4, text: 'Great concept. Found some amazing local vendors in Mussoorie.', location: 'Mussoorie' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/40 via-purple-900/40 to-orange-900/40 z-10"></div>
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('data:image/svg+xml,${encodeURIComponent('<svg width="1920" height="1080" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="sky" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" style="stop-color:rgb(135,206,235)"/><stop offset="100%" style="stop-color:rgb(255,182,193)"/></linearGradient></defs><rect width="1920" height="1080" fill="url(#sky)"/><path d="M 0 700 Q 480 600 960 650 T 1920 700 L 1920 1080 L 0 1080 Z" fill="#4a5568" opacity="0.9"/><path d="M 0 750 Q 400 680 800 720 T 1600 750 L 1920 780 L 1920 1080 L 0 1080 Z" fill="#2d3748" opacity="0.8"/><path d="M 0 820 Q 480 780 960 800 T 1920 820 L 1920 1080 L 0 1080 Z" fill="#1a202c" opacity="0.9"/></svg>')}')`, transform: `translateY(${scrollY * 0.5}px)` }}></div>
        <div className="relative z-20 text-center text-white px-4">
          <h1 className="text-6xl md:text-8xl font-bold mb-6" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)', animation: 'slideUp 1s ease-out' }}>Local Bites</h1>
          <p className="text-xl md:text-2xl mb-8" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)', animation: 'slideUp 1s ease-out 0.2s backwards' }}>
            Discover Authentic Local Flavors in Every Mountain Corner
          </p>
          <button
            onClick={() => setCurrentPage('foods')}
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
            style={{ animation: 'slideUp 1s ease-out 0.4s backwards' }}
          >
            🍽️ Explore Menu
          </button>
        </div>
      </div>

      {/* Popular dishes */}
      <div className="py-20 px-4 bg-gradient-to-b from-orange-50 to-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Popular Local Dishes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {suggestedFoods.map((food, idx) => (
              <div key={idx} onClick={() => setCurrentPage('foods')} className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer" style={{ animation: `fadeInUp 0.6s ease-out ${idx * 0.1}s backwards` }}>
                <div className="h-48 bg-gradient-to-br from-orange-200 to-orange-100 flex items-center justify-center text-8xl">{food.image}</div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{food.name}</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center"><Star className="w-5 h-5 text-yellow-500 fill-current" /><span className="ml-1 font-semibold">{food.rating}</span></div>
                    <span className="text-lg font-bold text-orange-600">{food.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Why Choose Local Bites?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <MapPin className="w-12 h-12" />, title: 'Location Based', desc: 'Find vendors near you instantly' },
              { icon: <Award className="w-12 h-12" />, title: 'Authentic Food', desc: 'Only verified local vendors' },
              { icon: <Users className="w-12 h-12" />, title: 'Community Reviews', desc: 'Real feedback from travelers' },
            ].map((f, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl shadow-lg text-center transform transition-all duration-300 hover:scale-105" style={{ animation: `fadeInUp 0.6s ease-out ${idx * 0.15}s backwards` }}>
                <div className="text-orange-500 flex justify-center mb-4">{f.icon}</div>
                <h3 className="text-2xl font-bold mb-3">{f.title}</h3>
                <p className="text-gray-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">What Travelers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((r, idx) => (
              <div key={idx} className="bg-gradient-to-br from-orange-50 to-white p-8 rounded-2xl shadow-lg transform transition-all duration-300 hover:scale-105" style={{ animation: `fadeInUp 0.6s ease-out ${idx * 0.15}s backwards` }}>
                <div className="flex mb-4">{[...Array(r.rating)].map((_, i) => <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />)}</div>
                <p className="text-gray-700 mb-4 italic">"{r.text}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl">{r.name[0]}</div>
                  <div className="ml-3"><p className="font-bold">{r.name}</p><p className="text-sm text-gray-600">{r.location}</p></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-10 px-4 text-center">
        <div className="flex items-center justify-center mb-4">
          <Heart className="w-6 h-6 text-orange-500 mr-2" />
          <span className="text-xl font-bold">Local Bites</span>
        </div>
        <p className="text-gray-400 text-sm">© 2024 Local Bites. Connecting travelers with authentic local food.</p>
      </footer>
    </div>
  );
};

// ─── Root App ────────────────────────────────────────────────────────────────
const AppContent = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [scrollY, setScrollY] = useState(0);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { window.scrollTo(0, 0); }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':    return <HomePage setCurrentPage={setCurrentPage} scrollY={scrollY} />;
      case 'login':   return <LoginPage setCurrentPage={setCurrentPage} />;
      case 'signup':  return <SignUpPage setCurrentPage={setCurrentPage} />;
      case 'foods':   return <FoodsPage setCurrentPage={setCurrentPage} cart={cart} setCart={setCart} />;
      case 'cart':    return <CartPage cart={cart} setCart={setCart} setCurrentPage={setCurrentPage} />;
      case 'orders':  return <OrdersPage setCurrentPage={setCurrentPage} />;
      case 'about':   return <AboutPage />;
      case 'terms':   return <TermsPage />;
      default:        return <HomePage setCurrentPage={setCurrentPage} scrollY={scrollY} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <style>{`
        @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
      `}</style>
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} scrollY={scrollY} cart={cart} />
      {renderPage()}
    </div>
  );
};

const App = () => (
  <AuthProvider>
    <AppContent />
  </AuthProvider>
);

export default App;
