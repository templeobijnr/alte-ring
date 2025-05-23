import React from 'react';
import { Link } from 'react-router-dom';
import { BellRingIcon as RingIcon, Instagram, Twitter, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <RingIcon className="w-6 h-6 text-primary-600" />
              <span className="text-xl font-bold text-gray-900">Altewear</span>
            </div>
            <p className="text-gray-600 mb-6 max-w-md">
              Transform your NFC ring into a powerful tool for sharing your digital identity. 
              Connect with others instantly with just a tap.
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary-600">
                <Instagram size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary-600">
                <Twitter size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary-600">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Products
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/shop" className="text-gray-600 hover:text-primary-600">
                  Smart Rings
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-gray-600 hover:text-primary-600">
                  Accessories
                </Link>
              </li>
              <li>
                <Link to="/setup" className="text-gray-600 hover:text-primary-600">
                  Activate Ring
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-primary-600">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-primary-600">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-primary-600">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-primary-600">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-12 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Altewear. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;