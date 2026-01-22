import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { productAPI, categoryAPI } from '../services/api';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { ArrowRight, ShoppingBag, Truck, CreditCard, Shield } from 'lucide-react';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [productsRes, categoriesRes] = await Promise.all([
        productAPI.getAllProducts({ limit: 8 }),
        categoryAPI.getAllCategories(),
      ]);

      if (productsRes.data.success) {
        setFeaturedProducts(productsRes.data.data || []);
        console.log(`Loaded ${productsRes.data.data?.length || 0} featured products`);
      }
      if (categoriesRes.data.success) {
        setCategories(categoriesRes.data.data || []);
        console.log(`Loaded ${categoriesRes.data.data?.length || 0} categories`);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setFeaturedProducts([]);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="container-custom py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                Shop Smart,
                <br />
                Live Better
              </h1>
              <p className="text-xl text-primary-100">
                Discover amazing products at unbeatable prices. Your one-stop destination for all your shopping needs.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/products" className="btn-primary bg-white text-primary-600 hover:bg-gray-100">
                  Shop Now
                  <ArrowRight className="inline-block ml-2 w-5 h-5" />
                </Link>
                <Link to="/products?category=Electronics" className="btn-outline border-white text-white hover:bg-white hover:text-primary-600">
                  View Deals
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <img
                src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&h=600&fit=crop"
                alt="Shopping"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-white border-b">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex items-start space-x-4">
              <div className="bg-primary-100 p-3 rounded-lg">
                <Truck className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Free Shipping</h3>
                <p className="text-sm text-gray-600">On orders over $50</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-primary-100 p-3 rounded-lg">
                <CreditCard className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Secure Payment</h3>
                <p className="text-sm text-gray-600">100% secure transactions</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-primary-100 p-3 rounded-lg">
                <Shield className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Money Back</h3>
                <p className="text-sm text-gray-600">30-day guarantee</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-primary-100 p-3 rounded-lg">
                <ShoppingBag className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Premium Quality</h3>
                <p className="text-sm text-gray-600">Top-rated products</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Browse through our diverse range of categories and find exactly what you're looking for
            </p>
          </div>

          {loading ? (
            <LoadingSpinner />
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {(categories || []).slice(0, 6).map((category) => (
                <Link
                  key={category._id}
                  to={`/products?category=${category.name}`}
                  className="card p-6 text-center hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="w-16 h-16 mx-auto mb-3 bg-primary-100 rounded-full flex items-center justify-center group-hover:bg-primary-600 transition-colors">
                    <ShoppingBag className="w-8 h-8 text-primary-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                    {category.name}
                  </h3>
                </Link>
              ))}
            </div>
          )}

          <div className="text-center mt-8">
            <Link to="/products" className="btn-outline">
              View All Categories
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Featured Products
              </h2>
              <p className="text-gray-600">Discover our handpicked selection of top products</p>
            </div>
            <Link to="/products" className="hidden md:block btn-outline">
              View All
            </Link>
          </div>

          {loading ? (
            <LoadingSpinner />
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {(featuredProducts || []).map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>

              <div className="text-center mt-8 md:hidden">
                <Link to="/products" className="btn-primary">
                  View All Products
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Shopping?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers and experience the best online shopping
          </p>
          <Link to="/register" className="btn-primary bg-white text-primary-600 hover:bg-gray-100">
            Create Account
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
