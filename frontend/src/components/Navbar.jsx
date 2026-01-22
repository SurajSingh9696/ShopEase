import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { ShoppingCart, User, Search, Menu, X, LogOut, Package, Settings, LayoutDashboard, HelpCircle, Home, Store, Mail, Heart } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { getCartCount } = useCart();
  const { wishlist } = useWishlist();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const cartCount = getCartCount();
  const wishlistCount = wishlist?.length || 0;

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${searchQuery}`);
    }
  };

  const handleLogout = async () => {
    await logout();
    setIsUserMenuOpen(false);
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src="/shopease.png" alt="ShopEase Logo" className="w-12 h-12 object-contain" />
            <span className="text-2xl font-bold text-primary-600">ShopEase</span>
          </Link>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 transition-colors group-hover:text-primary-500" />
              <input
                type="text"
                placeholder="Search products, brands, categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-2.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:bg-white outline-none transition-all duration-200"
              />
            </div>
          </form>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className="flex items-center gap-1 text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              <Home className="w-4 h-4" />
              Home
            </Link>
            <Link
              to="/products"
              className="flex items-center gap-1 text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              <Store className="w-4 h-4" />
              Products
            </Link>
            <Link
              to="/faq"
              className="flex items-center gap-1 text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              <HelpCircle className="w-4 h-4" />
              FAQ
            </Link>
            <Link
              to="/contact"
              className="flex items-center gap-1 text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              <Mail className="w-4 h-4" />
              Contact
            </Link>

            {isAuthenticated ? (
              <>
                {user?.role !== 'admin' && (
                  <>
                    <Link
                      to="/orders"
                      className="flex items-center gap-1 text-gray-700 hover:text-primary-600 transition-colors"
                    >
                      <Package className="w-5 h-5" />
                      <span className="font-medium">Orders</span>
                    </Link>
                    <Link
                      to="/cart"
                      className="relative text-gray-700 hover:text-primary-600 transition-colors"
                    >
                      <ShoppingCart className="w-6 h-6" />
                      {cartCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold animate-pulse">
                          {cartCount}
                        </span>
                      )}
                    </Link>
                  </>
                )}

                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors"
                  >
                    <User className="w-6 h-6" />
                    <span className="font-medium">{user?.name || 'Account'}</span>
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg py-2 z-50 border border-gray-100">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm text-gray-500">Signed in as</p>
                        <p className="text-sm font-semibold text-gray-900 truncate">{user?.email}</p>
                      </div>
                      {user?.role !== 'admin' && (
                        <>
                          <Link
                            to="/orders"
                            className="flex items-center space-x-3 px-4 py-2.5 hover:bg-gray-50 transition-colors"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <Package className="w-4 h-4 text-gray-600" />
                            <span>My Orders</span>
                          </Link>
                          <Link
                            to="/wishlist"
                            className="flex items-center space-x-3 px-4 py-2.5 hover:bg-gray-50 transition-colors relative"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <Heart className="w-4 h-4 text-gray-600" />
                            <span>My Wishlist</span>
                            {wishlistCount > 0 && (
                              <span className="ml-auto bg-pink-500 text-white text-xs rounded-full px-2 py-0.5 font-bold">
                                {wishlistCount}
                              </span>
                            )}
                          </Link>
                        </>
                      )}
                      <Link
                        to="/profile"
                        className="flex items-center space-x-3 px-4 py-2.5 hover:bg-gray-50 transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Settings className="w-4 h-4 text-gray-600" />
                        <span>Profile Settings</span>
                      </Link>
                      {user?.role === 'admin' && (
                        <Link
                          to="/admin"
                          className="flex items-center space-x-3 px-4 py-2.5 hover:bg-primary-50 text-primary-600 transition-colors"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <LayoutDashboard className="w-4 h-4" />
                          <span className="font-medium">Admin Panel</span>
                        </Link>
                      )}
                      <hr className="my-2" />
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-3 px-4 py-2.5 hover:bg-red-50 w-full text-left text-red-600 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
                  Login
                </Link>
                <Link to="/register" className="btn-primary px-6 py-2">
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-700 hover:text-primary-600"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t bg-white">
            <form onSubmit={handleSearch} className="mb-4 px-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                />
              </div>
            </form>

            <div className="space-y-1 px-4">
              <Link
                to="/"
                className="flex items-center gap-2 py-2.5 text-gray-700 hover:text-primary-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                <Home className="w-4 h-4" />
                Home
              </Link>
              <Link
                to="/products"
                className="flex items-center gap-2 py-2.5 text-gray-700 hover:text-primary-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >                <Store className="w-4 h-4" />                Products
              </Link>
              <Link
                to="/faq"
                className="flex items-center gap-2 py-2.5 text-gray-700 hover:text-primary-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                <HelpCircle className="w-4 h-4" />
                FAQ
              </Link>
              <Link
                to="/contact"
                className="flex items-center gap-2 py-2.5 text-gray-700 hover:text-primary-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                <Mail className="w-4 h-4" />
                Contact
              </Link>

              {isAuthenticated ? (
                <>
                  {user?.role !== 'admin' && (
                    <>
                      <Link
                        to="/orders"
                        className="flex items-center gap-2 py-2.5 text-gray-700 hover:text-primary-600 font-medium"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Package className="w-4 h-4" />
                        My Orders
                      </Link>
                      <Link
                        to="/wishlist"
                        className="flex items-center justify-between py-2.5 text-gray-700 hover:text-primary-600 font-medium"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <span className="flex items-center gap-2">
                          <Heart className="w-4 h-4" />
                          My Wishlist
                        </span>
                        {wishlistCount > 0 && (
                          <span className="bg-pink-500 text-white text-xs rounded-full px-2.5 py-0.5 font-bold">
                            {wishlistCount}
                          </span>
                        )}
                      </Link>
                      <Link
                        to="/cart"
                        className="flex items-center justify-between py-2.5 text-gray-700 hover:text-primary-600 font-medium"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <span className="flex items-center gap-2">
                          <ShoppingCart className="w-4 h-4" />
                          Cart
                        </span>
                        {cartCount > 0 && (
                          <span className="bg-red-500 text-white text-xs rounded-full px-2.5 py-0.5 font-bold">
                            {cartCount}
                          </span>
                        )}
                      </Link>
                    </>
                  )}
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 py-2.5 text-gray-700 hover:text-primary-600 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Settings className="w-4 h-4" />
                    Profile
                  </Link>
                  {user?.role === 'admin' && (
                    <Link
                      to="/admin"
                      className="flex items-center gap-2 py-2.5 text-primary-600 font-semibold"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      Admin Panel
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center gap-2 w-full text-left py-2.5 text-red-600 font-medium"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="flex items-center py-2.5 text-gray-700 hover:text-primary-600 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="flex items-center py-2.5 text-primary-600 font-semibold"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
