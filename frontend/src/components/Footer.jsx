import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, Store, Info, HelpCircle, Package, UserCircle, Shield, FileText, Home } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img src="/shopease.png" alt="ShopEase Logo" className="w-12 h-12 object-contain" />
              <h3 className="text-white text-lg font-bold">ShopEase</h3>
            </div>
            <p className="text-sm mb-4">
              Your one-stop destination for all your shopping needs. Quality products at the best prices.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com/SurajSingh9696" target="_blank" rel="noopener noreferrer" className="hover:text-primary-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://github.com/SurajSingh9696" target="_blank" rel="noopener noreferrer" className="hover:text-primary-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://github.com/SurajSingh9696" target="_blank" rel="noopener noreferrer" className="hover:text-primary-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="flex items-center gap-2 hover:text-primary-400 transition-colors">
                  <Home className="w-4 h-4" />
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="flex items-center gap-2 hover:text-primary-400 transition-colors">
                  <Store className="w-4 h-4" />
                  Products
                </Link>
              </li>
              <li>
                <Link to="/about" className="flex items-center gap-2 hover:text-primary-400 transition-colors">
                  <Info className="w-4 h-4" />
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="flex items-center gap-2 hover:text-primary-400 transition-colors">
                  <Mail className="w-4 h-4" />
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/faq" className="flex items-center gap-2 hover:text-primary-400 transition-colors">
                  <HelpCircle className="w-4 h-4" />
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/orders" className="flex items-center gap-2 hover:text-primary-400 transition-colors">
                  <Package className="w-4 h-4" />
                  Orders
                </Link>
              </li>
              <li>
                <Link to="/profile" className="flex items-center gap-2 hover:text-primary-400 transition-colors">
                  <UserCircle className="w-4 h-4" />
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="flex items-center gap-2 hover:text-primary-400 transition-colors">
                  <Shield className="w-4 h-4" />
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="flex items-center gap-2 hover:text-primary-400 transition-colors">
                  <FileText className="w-4 h-4" />
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span className="text-sm">45, MG Road, Connaught Place, New Delhi 110001, India</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm">+91 98765 43210</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm">support@shopease.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} ShopEase. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
