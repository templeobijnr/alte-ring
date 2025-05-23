import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, BellRingIcon as Ring, Smartphone, MoveRight, ShieldCheck, Clock, Globe, Share2, Palette, Zap, Users, Sparkles } from 'lucide-react';
import Button from '../components/ui/Button';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                The Smart Ring for <span className="text-primary-400">Digital</span><br />
                <span className="text-primary-400">Self-Expression</span>
              </h1>
              <p className="text-lg text-gray-300 mb-8 max-w-lg">
                Alté Link Ring combines NFC technology with style, letting you share your curated digital presence with a simple tap. Express yourself, connect instantly, and make every interaction memorable.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg"
                  onClick={() => navigate('/setup')}
                  rightIcon={<ArrowRight size={18} />}
                >
                  Activate Your Ring
                </Button>
                <Button 
                  variant="secondary" 
                  size="lg"
                  onClick={() => navigate('/shop')}
                  className="bg-dark-700 text-white hover:bg-dark-600"
                >
                  Shop Rings
                </Button>
              </div>
            </motion.div>
            
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <img 
                src="https://images.pexels.com/photos/7319307/pexels-photo-7319307.jpeg" 
                alt="Alté Link Ring" 
                className="w-full h-auto rounded-2xl shadow-2xl ring-1 ring-dark-700"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-dark-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              One Ring, Endless Possibilities
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Customize your Altewear ring to instantly share whatever matters to you, 
              all through a simple tap.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <motion.div 
              className="bg-dark-700/50 backdrop-blur-sm rounded-xl p-6 border border-dark-600"
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <div className="w-12 h-12 bg-primary-900/30 rounded-lg flex items-center justify-center mb-4">
                <Ring className="text-primary-400" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Digital Identity</h3>
              <p className="text-gray-300">
                Share your professional profile, social media, or contact details with a quick tap.
              </p>
            </motion.div>
            
            {/* Feature 2 */}
            <motion.div 
              className="bg-dark-700/50 backdrop-blur-sm rounded-xl p-6 border border-dark-600"
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <div className="w-12 h-12 bg-accent-900/30 rounded-lg flex items-center justify-center mb-4">
                <ShieldCheck className="text-accent-400" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Privacy Control</h3>
              <p className="text-gray-300">
                You decide what information is shared and can update it anytime from your dashboard.
              </p>
            </motion.div>
            
            {/* Feature 3 */}
            <motion.div 
              className="bg-dark-700/50 backdrop-blur-sm rounded-xl p-6 border border-dark-600"
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <div className="w-12 h-12 bg-primary-900/30 rounded-lg flex items-center justify-center mb-4">
                <Smartphone className="text-primary-400" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Any Smartphone</h3>
              <p className="text-gray-300">
                Works with both Android and iOS devices, no special app required for visitors.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Alté Link Section */}
      <section className="py-20 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Introducing <span className="text-primary-400">Alté Link</span>
              </h2>
              <p className="text-lg text-gray-300 mb-8">
                Your personalized digital profile that opens instantly when someone taps your ring. Share your story, your work, and your social presence—all in one stylish page.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <Globe className="h-6 w-6 text-primary-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Custom Domain</h3>
                    <p className="text-gray-400 text-sm">Get your own altewear.com/u/username profile</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <Share2 className="h-6 w-6 text-primary-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Social Integration</h3>
                    <p className="text-gray-400 text-sm">Connect all your social profiles in one place</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <Palette className="h-6 w-6 text-primary-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Custom Themes</h3>
                    <p className="text-gray-400 text-sm">Personalize your profile's look and feel</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <Zap className="h-6 w-6 text-primary-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Instant Updates</h3>
                    <p className="text-gray-400 text-sm">Change your profile anytime, instantly</p>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img 
                src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg"
                alt="Alté Link Profile"
                className="w-full rounded-2xl shadow-2xl border border-dark-700"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 bg-dark-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Perfect for Every Occasion
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Discover how Alté Link transforms the way you connect and share in various scenarios.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Use Case 1 */}
            <motion.div 
              className="bg-dark-700/50 backdrop-blur-sm rounded-xl p-8 border border-dark-600"
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <div className="w-16 h-16 bg-primary-900/30 rounded-xl flex items-center justify-center mb-6">
                <Users className="text-primary-400" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Networking Events</h3>
              <p className="text-gray-300">
                Share your professional profile and LinkedIn instantly at conferences and meetups. No more fumbling with business cards.
              </p>
            </motion.div>

            {/* Use Case 2 */}
            <motion.div 
              className="bg-dark-700/50 backdrop-blur-sm rounded-xl p-8 border border-dark-600"
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <div className="w-16 h-16 bg-accent-900/30 rounded-xl flex items-center justify-center mb-6">
                <Sparkles className="text-accent-400" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Creative Showcase</h3>
              <p className="text-gray-300">
                Artists and creators can share their portfolio, latest works, and booking information with a simple tap.
              </p>
            </motion.div>

            {/* Use Case 3 */}
            <motion.div 
              className="bg-dark-700/50 backdrop-blur-sm rounded-xl p-8 border border-dark-600"
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <div className="w-16 h-16 bg-primary-900/30 rounded-xl flex items-center justify-center mb-6">
                <Globe className="text-primary-400" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Social Connection</h3>
              <p className="text-gray-300">
                Connect all your social media profiles in one place. Make it easy for people to follow and engage with your content.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-dark-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Getting started with your Altewear ring is simple and takes only minutes.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-primary-900/30 rounded-full flex items-center justify-center mb-6">
                <span className="text-xl font-bold text-primary-400">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Create Your Profile</h3>
              <p className="text-gray-300">
                Sign up and build your digital profile with links, social media, and contact info.
              </p>
            </div>
            
            {/* Arrow */}
            <div className="hidden md:flex items-center justify-center">
              <MoveRight size={32} className="text-dark-600" />
            </div>
            
            {/* Step 2 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-primary-900/30 rounded-full flex items-center justify-center mb-6">
                <span className="text-xl font-bold text-primary-400">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Configure Your Ring</h3>
              <p className="text-gray-300">
                Use our Web NFC writer to program your ring with your customized profile link.
              </p>
            </div>
            
            {/* Arrow (Mobile) */}
            <div className="flex md:hidden items-center justify-center">
              <MoveRight size={32} className="text-dark-600 transform rotate-90" />
            </div>
            
            {/* Arrow */}
            <div className="hidden md:flex items-center justify-center">
              <MoveRight size={32} className="text-dark-600" />
            </div>
            
            {/* Step 3 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-primary-900/30 rounded-full flex items-center justify-center mb-6">
                <span className="text-xl font-bold text-primary-400">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Share With a Tap</h3>
              <p className="text-gray-300">
                Tap your ring on any smartphone to instantly share your chosen information.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 border-t border-dark-700">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Ready to Simplify Your Digital Life?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-300">
            Join thousands of users who've streamlined their digital interactions with Altewear.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="primary" 
              size="lg"
              onClick={() => navigate('/signup')}
              className="bg-primary-500 hover:bg-primary-600"
            >
              Get Started
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-primary-500 text-primary-400 hover:bg-primary-500/10"
              onClick={() => navigate('/shop')}
            >
              Browse Rings
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;