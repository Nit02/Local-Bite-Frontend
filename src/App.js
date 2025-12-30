import React, { useState, useEffect } from 'react';
import { MapPin, Search, Menu, X, Star, Users, Award, Heart, ChevronDown, Mail, Phone, Facebook, Instagram, Twitter } from 'lucide-react';

const LocalBites = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBrowseOpen, setIsBrowseOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [scrollY, setScrollY] = useState(0);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const suggestedFoods = [
    { name: 'Mountain Momos', image: '🥟', rating: 4.8, price: '₹80' },
    { name: 'Himalayan Thukpa', image: '🍜', rating: 4.9, price: '₹120' },
    { name: 'Local Dhaba Curry', image: '🍛', rating: 4.7, price: '₹150' },
    { name: 'Fresh Pakoras', image: '🥘', rating: 4.6, price: '₹60' }
  ];

  const reviews = [
    { name: 'Priya Sharma', rating: 5, text: 'Amazing app! Found authentic local food in Manali. The momos were incredible!', location: 'Manali' },
    { name: 'Rahul Verma', rating: 5, text: 'Best way to discover hidden gems. Used it in Shimla and loved every bite!', location: 'Shimla' },
    { name: 'Anita Patel', rating: 4, text: 'Great concept. Found some amazing local vendors in Mussoorie.', location: 'Mussoorie' }
  ];

  const HomePage = () => (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/40 via-purple-900/40 to-orange-900/40 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000"
          style={{
            backgroundImage: `url('data:image/svg+xml,${encodeURIComponent(`
              <svg width="1920" height="1080" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="sky" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style="stop-color:rgb(135,206,235);stop-opacity:1" />
                    <stop offset="100%" style="stop-color:rgb(255,182,193);stop-opacity:1" />
                  </linearGradient>
                </defs>
                <rect width="1920" height="1080" fill="url(#sky)"/>
                <path d="M 0 700 Q 480 600 960 650 T 1920 700 L 1920 1080 L 0 1080 Z" fill="#4a5568" opacity="0.9"/>
                <path d="M 0 750 Q 400 680 800 720 T 1600 750 L 1920 780 L 1920 1080 L 0 1080 Z" fill="#2d3748" opacity="0.8"/>
                <path d="M 0 820 Q 480 780 960 800 T 1920 820 L 1920 1080 L 0 1080 Z" fill="#1a202c" opacity="0.9"/>
                <circle cx="300" cy="650" r="3" fill="white" opacity="0.8"/>
                <circle cx="450" cy="680" r="2" fill="white" opacity="0.6"/>
                <circle cx="600" cy="640" r="2.5" fill="white" opacity="0.7"/>
                <circle cx="1200" cy="670" r="3" fill="white" opacity="0.8"/>
                <circle cx="1400" cy="650" r="2" fill="white" opacity="0.6"/>
              </svg>
            `)}')`,
            transform: `translateY(${scrollY * 0.5}px)`
          }}
        ></div>
        
        <div className="relative z-20 text-center text-white px-4 animate-fade-in">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 animate-slide-up" style={{
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
            animation: 'slideUp 1s ease-out'
          }}>
            Local Bites
          </h1>
          <p className="text-xl md:text-2xl mb-8 animate-slide-up" style={{
            animationDelay: '0.2s',
            textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
          }}>
            Discover Authentic Local Flavors in Every Mountain Corner
          </p>
          <button 
            onClick={() => setCurrentPage('signup')}
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl animate-slide-up"
            style={{ animationDelay: '0.4s' }}
          >
            Start Exploring
          </button>
        </div>
      </div>

      {/* Suggested Foods Section */}
      <div className="py-20 px-4 bg-gradient-to-b from-orange-50 to-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Popular Local Dishes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {suggestedFoods.map((food, idx) => (
              <div 
                key={idx} 
                className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${idx * 0.1}s backwards`
                }}
              >
                <div className="h-48 bg-gradient-to-br from-orange-200 to-orange-100 flex items-center justify-center text-8xl">
                  {food.image}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{food.name}</h3>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <Star className="w-5 h-5 text-yellow-500 fill-current" />
                      <span className="ml-1 font-semibold">{food.rating}</span>
                    </div>
                    <span className="text-lg font-bold text-orange-600">{food.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Why Choose Local Bites?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <MapPin className="w-12 h-12" />, title: 'Location Based', desc: 'Find vendors near you instantly' },
              { icon: <Award className="w-12 h-12" />, title: 'Authentic Food', desc: 'Only verified local vendors' },
              { icon: <Users className="w-12 h-12" />, title: 'Community Reviews', desc: 'Real feedback from travelers' }
            ].map((feature, idx) => (
              <div 
                key={idx}
                className="bg-white p-8 rounded-2xl shadow-lg text-center transform transition-all duration-300 hover:scale-105"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${idx * 0.15}s backwards`
                }}
              >
                <div className="text-orange-500 flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">What Travelers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review, idx) => (
              <div 
                key={idx}
                className="bg-gradient-to-br from-orange-50 to-white p-8 rounded-2xl shadow-lg transform transition-all duration-300 hover:scale-105"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${idx * 0.15}s backwards`
                }}
              >
                <div className="flex mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{review.text}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {review.name[0]}
                  </div>
                  <div className="ml-3">
                    <p className="font-bold">{review.name}</p>
                    <p className="text-sm text-gray-600">{review.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const LoginPage = () => (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 via-pink-100 to-purple-100 px-4 py-8">
      <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 w-full max-w-md transform transition-all duration-300 hover:shadow-3xl" style={{ animation: 'scaleIn 0.5s ease-out' }}>
        <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">Welcome Back</h2>
        
        <button className="w-full bg-white border-2 border-gray-300 text-gray-700 py-3 rounded-xl mb-6 flex items-center justify-center hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 font-semibold">
          <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Sign in with Google
        </button>
        
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500">Or continue with email</span>
          </div>
        </div>
        
        <input 
          type="email" 
          placeholder="Email" 
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl mb-4 focus:border-orange-500 focus:outline-none transition-all duration-300"
        />
        <input 
          type="password" 
          placeholder="Password" 
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl mb-6 focus:border-orange-500 focus:outline-none transition-all duration-300"
        />
        
        <button className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg">
          Login
        </button>
        
        <p className="text-center mt-6 text-gray-600">
          Don't have an account? 
          <button 
            onClick={() => setCurrentPage('signup')}
            className="text-orange-500 font-semibold ml-2 hover:text-orange-600"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );

  const SignUpPage = () => (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100 px-4 py-8">
      <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 w-full max-w-md transform transition-all duration-300 hover:shadow-3xl" style={{ animation: 'scaleIn 0.5s ease-out' }}>
        <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">Join Local Bites</h2>
        
        <button className="w-full bg-white border-2 border-gray-300 text-gray-700 py-3 rounded-xl mb-6 flex items-center justify-center hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 font-semibold">
          <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Sign up with Google
        </button>
        
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500">Or sign up with email</span>
          </div>
        </div>
        
        <input 
          type="text" 
          placeholder="Full Name" 
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl mb-4 focus:border-orange-500 focus:outline-none transition-all duration-300"
        />
        <input 
          type="email" 
          placeholder="Email" 
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl mb-4 focus:border-orange-500 focus:outline-none transition-all duration-300"
        />
        <input 
          type="password" 
          placeholder="Password" 
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl mb-6 focus:border-orange-500 focus:outline-none transition-all duration-300"
        />
        
        <button className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg">
          Create Account
        </button>
        
        <p className="text-center mt-6 text-gray-600">
          Already have an account? 
          <button 
            onClick={() => setCurrentPage('login')}
            className="text-orange-500 font-semibold ml-2 hover:text-orange-600"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );

  const AboutPage = () => (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-8 text-gray-800">About Local Bites</h1>
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <p className="text-lg text-gray-700 mb-6">
            Local Bites is your ultimate companion for discovering authentic local cuisine in mountain tourist destinations. We connect travelers with hidden culinary gems and local food vendors who offer the most authentic taste of regional flavors.
          </p>
          <p className="text-lg text-gray-700 mb-6">
            Our mission is to support local businesses while providing travelers with unforgettable food experiences. Whether you're hiking in the Himalayas or exploring hill stations, Local Bites helps you find the best local food vendors nearby.
          </p>
          <p className="text-lg text-gray-700">
            We believe in authentic experiences, community support, and making every journey delicious. Join thousands of food lovers who trust Local Bites to guide their culinary adventures.
          </p>
        </div>
      </div>
    </div>
  );

  const TermsPage = () => (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-8 text-gray-800">Terms of Use</h1>
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">1. Acceptance of Terms</h2>
          <p className="text-gray-700 mb-6">
            By accessing and using Local Bites, you accept and agree to be bound by the terms and conditions of this agreement.
          </p>
          
          <h2 className="text-2xl font-bold mb-4 text-gray-800">2. User Responsibilities</h2>
          <p className="text-gray-700 mb-6">
            Users are responsible for maintaining the confidentiality of their account information and for all activities that occur under their account.
          </p>
          
          <h2 className="text-2xl font-bold mb-4 text-gray-800">3. Content Guidelines</h2>
          <p className="text-gray-700 mb-6">
            Reviews and ratings must be honest and based on actual experiences. Inappropriate or false content will be removed.
          </p>
          
          <h2 className="text-2xl font-bold mb-4 text-gray-800">4. Privacy</h2>
          <p className="text-gray-700 mb-6">
            We respect your privacy and handle your data according to our Privacy Policy. Location data is used solely to provide nearby vendor recommendations.
          </p>
          
          <h2 className="text-2xl font-bold mb-4 text-gray-800">5. Limitation of Liability</h2>
          <p className="text-gray-700">
            Local Bites is a platform connecting users with food vendors. We are not responsible for the quality of food or services provided by vendors listed on our platform.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-slide-up {
          animation: slideUp 1s ease-out backwards;
        }
      `}</style>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrollY > 50 ? 'bg-white shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div 
            onClick={() => setCurrentPage('home')}
            className="flex items-center cursor-pointer"
          >
            <Heart className={`w-8 h-8 mr-2 ${scrollY > 50 ? 'text-orange-500' : 'text-white'}`} />
            <span className={`text-2xl font-bold ${scrollY > 50 ? 'text-gray-800' : 'text-white'}`}>
              Local Bites
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <div className="relative">
              <button 
                onClick={() => setIsBrowseOpen(!isBrowseOpen)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  scrollY > 50 ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/20'
                }`}
              >
                <Search className="w-5 h-5" />
                <span>Browse</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {isBrowseOpen && (
                <div className="absolute top-full mt-2 bg-white rounded-lg shadow-xl p-4 w-64">
                  <input 
                    type="text" 
                    placeholder="Search by location..." 
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg mb-3 focus:border-orange-500 focus:outline-none"
                  />
                  <div className="space-y-2">
                    <button className="w-full text-left px-4 py-2 hover:bg-orange-50 rounded-lg transition-colors">
                      Manali
                    </button>
                    <button className="w-full text-left px-4 py-2 hover:bg-orange-50 rounded-lg transition-colors">
                      Shimla
                    </button>
                    <button className="w-full text-left px-4 py-2 hover:bg-orange-50 rounded-lg transition-colors">
                      Mussoorie
                    </button>
                    <button className="w-full text-left px-4 py-2 hover:bg-orange-50 rounded-lg transition-colors">
                      Nainital
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            <button className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
              scrollY > 50 ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/20'
            }`}>
              <MapPin className="w-5 h-5" />
              <span>Update Location</span>
            </button>
            
            <button 
              onClick={() => setCurrentPage('about')}
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                scrollY > 50 ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/20'
              }`}
            >
              About Us
            </button>
            
            <button 
              onClick={() => setCurrentPage('login')}
              className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all duration-300 transform hover:scale-105"
            >
              Login
            </button>
            
            <button 
              onClick={() => setCurrentPage('signup')}
              className="px-6 py-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg hover:from-orange-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
            >
              Sign Up
            </button>
          </div>
          
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden ${scrollY > 50 ? 'text-gray-800' : 'text-white'}`}
          >
            {isMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>
        
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-lg">
            <div className="px-4 py-4 space-y-4">
              <button className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg">Browse</button>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg">Update Location</button>
              <button 
                onClick={() => {
                  setCurrentPage('about');
                  setIsMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg"
              >
                About Us
              </button>
              <button 
                onClick={() => {
                  setCurrentPage('login');
                  setIsMenuOpen(false);
                }}
                className="w-full px-4 py-2 bg-orange-500 text-white rounded-lg"
              >
                Login
              </button>
              <button 
                onClick={() => {
                  setCurrentPage('signup');
                  setIsMenuOpen(false);
                }}
                className="w-full px-4 py-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg"
              >
                Sign Up
              </button>
            </div>
          </div>
        )}
      </nav>
    </div>
  )
}
export default LocalBites;