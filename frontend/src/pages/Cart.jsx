import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';

const Cart = () => {
  const { cart, loading, updateCartItem, removeFromCart, getCartTotal, getCartCount } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [updatingItem, setUpdatingItem] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleQuantityChange = async (itemId, currentQuantity, change) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity > 0) {
      setUpdatingItem(itemId);
      await updateCartItem(itemId, newQuantity);
      setUpdatingItem(null);
    }
  };

  const handleRemoveItem = async (itemId) => {
    setUpdatingItem(itemId);
    await removeFromCart(itemId);
    setUpdatingItem(null);
  };

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  const cartItems = cart?.items || [];
  const cartTotal = getCartTotal();
  const cartCount = getCartCount();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <ShoppingBag className="w-24 h-24 mx-auto text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some products to get started!</p>
          <Link to="/products" className="btn-primary">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-custom">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <span className="text-gray-600 font-medium">{cartCount} {cartCount === 1 ? 'item' : 'items'}</span>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4 min-h-[400px]">
              {cartItems.map((item) => {
                const product = item.product;
                const price = product?.salePrice || product?.price || 0;
                const subtotal = price * item.quantity;
                const isUpdating = updatingItem === item._id;

                return (
                  <div 
                    key={item._id} 
                    className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 transition-all duration-200 min-h-[180px] ${isUpdating ? 'opacity-60 pointer-events-none' : 'hover:shadow-md'}`}
                  >
                    <div className="flex gap-6">
                      {/* Product Image */}
                      <Link to={`/product/${product?._id}`} className="flex-shrink-0">
                        <img
                          src={product?.images?.[0] || 'https://via.placeholder.com/150'}
                          alt={product?.title || 'Product'}
                          className="w-28 h-28 object-cover rounded-lg border border-gray-100"
                        />
                      </Link>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <Link
                          to={`/product/${product?._id}`}
                          className="font-semibold text-lg text-gray-900 hover:text-primary-600 line-clamp-2 transition-colors"
                        >
                          {product?.title || 'Unknown Product'}
                        </Link>
                        {product?.brand && (
                          <p className="text-sm text-gray-500 mt-1 font-medium">{product.brand}</p>
                        )}
                        
                        <div className="flex items-center gap-4 mt-3">
                          <div className="flex flex-col">
                            <span className="text-xs text-gray-500">Price</span>
                            <p className="text-xl font-bold text-gray-900">₹{price}</p>
                          </div>
                          
                          {product?.salePrice && product.price > product.salePrice && (
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                              {Math.round(((product.price - product.salePrice) / product.price) * 100)}% OFF
                            </span>
                          )}
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-4 mt-4">
                          <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1">
                            <button
                              onClick={() => handleQuantityChange(item._id, item.quantity, -1)}
                              disabled={isUpdating}
                              className="w-9 h-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-100 hover:border-primary-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <Minus className="w-4 h-4 text-gray-700" />
                            </button>
                            <span className="w-12 text-center font-bold text-gray-900">{item.quantity}</span>
                            <button
                              onClick={() => handleQuantityChange(item._id, item.quantity, 1)}
                              disabled={item.quantity >= (product?.stock || 0) || isUpdating}
                              className="w-9 h-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-100 hover:border-primary-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <Plus className="w-4 h-4 text-gray-700" />
                            </button>
                          </div>

                          <button
                            onClick={() => handleRemoveItem(item._id)}
                            disabled={isUpdating}
                            className="text-red-600 hover:text-red-700 flex items-center gap-2 font-medium hover:bg-red-50 px-3 py-2 rounded-lg transition-all disabled:opacity-50"
                          >
                            <Trash2 className="w-4 h-4" />
                            Remove
                          </button>
                        </div>

                        {product?.stock && product.stock < 5 && (
                          <p className="text-xs text-orange-600 mt-2 font-medium">Only {product.stock} left in stock</p>
                        )}
                      </div>

                      {/* Subtotal */}
                      <div className="text-right flex flex-col justify-between">
                        <div>
                          <span className="text-xs text-gray-500 block">Subtotal</span>
                          <p className="font-bold text-2xl text-gray-900">₹{subtotal.toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Subtotal ({cartCount} {cartCount === 1 ? 'item' : 'items'})</span>
                  <span className="font-bold text-gray-900">₹{cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Shipping</span>
                  <span className={`font-bold ${cartTotal >= 500 ? 'text-green-600' : 'text-gray-900'}`}>
                    {cartTotal >= 500 ? 'FREE' : '₹50.00'}
                  </span>
                </div>
                {cartTotal < 500 && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-sm text-blue-700 font-medium">
                      Add ₹{(500 - cartTotal).toFixed(2)} more for free shipping! 🚚
                    </p>
                    <div className="mt-2 bg-blue-200 rounded-full h-2 overflow-hidden">
                      <div 
                        className="bg-blue-600 h-full transition-all duration-300"
                        style={{ width: `${(cartTotal / 500) * 100}%` }}
                      />
                    </div>
                  </div>
                )}
                <div className="border-t pt-4 flex justify-between items-center">
                  <span className="font-bold text-lg">Total</span>
                  <span className="font-bold text-2xl text-primary-600">
                    ₹{(cartTotal + (cartTotal >= 500 ? 0 : 50)).toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="w-full btn-primary py-3.5 text-lg flex items-center justify-center gap-2 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all"
              >
                Proceed to Checkout
                <ArrowRight className="w-5 h-5" />
              </button>

              <Link
                to="/products"
                className="block text-center text-primary-600 hover:text-primary-700 mt-4 font-medium transition-colors"
              >
                ← Continue Shopping
              </Link>

              <div className="mt-6 pt-6 border-t space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Secure checkout
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  30-day return policy
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
