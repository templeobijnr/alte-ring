import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Check, Star } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  image: string;
  popular?: boolean;
}

const ShopPage: React.FC = () => {
  // Sample products data
  const products: Product[] = [
    {
      id: 'ring-basic',
      name: 'Altewear Basic',
      price: 49.99,
      description: 'Our entry-level NFC smart ring with essential functionality.',
      features: [
        'Waterproof design',
        'NFC capability',
        'Size options: 7-13',
        'Colors: Black, Silver',
        '1-year warranty'
      ],
      image: 'https://images.pexels.com/photos/6044227/pexels-photo-6044227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 'ring-pro',
      name: 'Altewear Pro',
      price: 89.99,
      description: 'Enhanced NFC smart ring with premium materials and extended range.',
      features: [
        'Premium ceramic coating',
        'Extended NFC range',
        'Size options: 5-14',
        'Colors: Black, Silver, Gold',
        'Custom engraving available',
        '2-year warranty'
      ],
      image: 'https://images.pexels.com/photos/9428161/pexels-photo-9428161.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      popular: true
    },
    {
      id: 'ring-titanium',
      name: 'Altewear Titanium',
      price: 129.99,
      description: 'Our flagship titanium NFC smart ring with scratch-resistant finish.',
      features: [
        'Aerospace-grade titanium',
        'Scratch-resistant coating',
        'Maximum NFC range',
        'Size options: 5-14',
        'Colors: Titanium, Black, Blue',
        'Lifetime warranty'
      ],
      image: 'https://images.pexels.com/photos/10885248/pexels-photo-10885248.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    }
  ];

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="py-12 px-4 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Altewear Smart Rings
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose the perfect NFC smart ring to match your style and needs.
            All rings are compatible with our ring management platform.
          </p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {products.map((product) => (
            <motion.div key={product.id} variants={item}>
              <Card className="h-full flex flex-col">
                <div className="relative">
                  {product.popular && (
                    <div className="absolute top-4 right-4 bg-primary-600 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                      Popular
                    </div>
                  )}
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-t-xl"
                  />
                </div>
                
                <div className="p-6 flex-grow flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-xl font-bold text-gray-900">{product.name}</h2>
                    <div className="flex items-center">
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star 
                            key={star} 
                            size={14} 
                            className={star <= 5 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} 
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-600 ml-1">5.0</span>
                    </div>
                  </div>
                  
                  <p className="text-2xl font-bold text-gray-900 mb-4">
                    ${product.price}
                  </p>
                  
                  <p className="text-gray-600 text-sm mb-4">
                    {product.description}
                  </p>
                  
                  <div className="mb-6 flex-grow">
                    <h3 className="text-sm font-medium text-gray-900 mb-2">Features:</h3>
                    <ul className="space-y-1">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-start text-sm">
                          <Check size={16} className="text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Button
                    leftIcon={<ShoppingCart size={18} />}
                    className="w-full"
                  >
                    Add to Cart
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Accessories Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Accessories
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="flex overflow-hidden">
              <img 
                src="https://images.pexels.com/photos/1209751/pexels-photo-1209751.jpeg?auto=compress&cs=tinysrgb&w=600" 
                alt="Ring Display Case"
                className="w-1/3 h-auto object-cover"
              />
              <div className="p-6 flex-grow">
                <h3 className="text-lg font-bold text-gray-900 mb-1">Ring Display Case</h3>
                <p className="text-lg font-bold text-gray-900 mb-2">$19.99</p>
                <p className="text-sm text-gray-600 mb-4">
                  Elegant display case to store and showcase your Altewear ring when not in use.
                </p>
                <Button variant="secondary" size="sm">
                  View Details
                </Button>
              </div>
            </Card>
            
            <Card className="flex overflow-hidden">
              <img 
                src="https://images.pexels.com/photos/821651/pexels-photo-821651.jpeg?auto=compress&cs=tinysrgb&w=600" 
                alt="Ring Sizing Kit"
                className="w-1/3 h-auto object-cover"
              />
              <div className="p-6 flex-grow">
                <h3 className="text-lg font-bold text-gray-900 mb-1">Ring Sizing Kit</h3>
                <p className="text-lg font-bold text-gray-900 mb-2">$9.99</p>
                <p className="text-sm text-gray-600 mb-4">
                  Find your perfect ring size with our comprehensive sizing kit. Free shipping.
                </p>
                <Button variant="secondary" size="sm">
                  View Details
                </Button>
              </div>
            </Card>
          </div>
        </div>
        
        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">How long does the battery last?</h3>
                <p className="text-gray-600">
                  Altewear rings don't have batteries! They use NFC technology that's powered by the device reading it (like your phone).
                </p>
              </div>
            </Card>
            
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Are the rings waterproof?</h3>
                <p className="text-gray-600">
                  Yes, all Altewear rings are waterproof and can be worn while swimming, showering, or washing hands.
                </p>
              </div>
            </Card>
            
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">How do I find my ring size?</h3>
                <p className="text-gray-600">
                  You can order our ring sizing kit or follow the sizing guide on our website using a string or paper strip.
                </p>
              </div>
            </Card>
            
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Can I return or exchange my ring?</h3>
                <p className="text-gray-600">
                  Yes, we offer a 30-day return policy and free exchanges if you need a different size.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;