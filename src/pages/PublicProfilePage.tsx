import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Instagram, 
  Twitter, 
  Linkedin, 
  Globe, 
  Share, 
  QrCode,
  ExternalLink,
  MessageSquare,
  MapPin
} from 'lucide-react';
import { usePublicProfile } from '../hooks/usePublicProfile';
import Button from '../components/ui/Button';
import QRCodeModal from '../components/profile/QRCodeModal';

const PublicProfilePage: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const { profile, loading, error } = usePublicProfile(username || '');
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  
  // Get icon based on link type
  const getLinkIcon = (type: string) => {
    switch (type) {
      case 'instagram':
        return <Instagram size={18} />;
      case 'twitter':
        return <Twitter size={18} />;
      case 'linkedin':
        return <Linkedin size={18} />;
      case 'whatsapp':
        return <MessageSquare size={18} />;
      default:
        return <Globe size={18} />;
    }
  };
  
  // Handle share profile
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${profile?.name}'s Altewear Profile`,
          text: `Check out ${profile?.name}'s profile on Altewear`,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing', err);
      }
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      // Could show a toast here
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }
  
  if (error || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Profile Not Found</h2>
          <p className="text-gray-600 mb-6">The profile you're looking for doesn't exist or may have been removed.</p>
          <Button as="a" href="/" variant="secondary">
            Go Home
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div 
      className="min-h-screen flex flex-col items-center py-12 px-4" 
      style={{ backgroundColor: '#f8f9fa' }}
    >
      <div className="w-full max-w-md">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-soft overflow-hidden mb-6"
        >
          <div 
            className="h-32 w-full" 
            style={{ backgroundColor: profile.theme?.primaryColor || '#3b5cff' }}
          ></div>
          
          <div className="px-6 pb-6 text-center -mt-16">
            <div className="inline-block relative">
              {profile.avatar_url ? (
                <img 
                  src={profile.avatar_url} 
                  alt={profile.full_name || profile.username}
                  className="h-32 w-32 rounded-full border-4 border-white object-cover"
                />
              ) : (
                <div className="h-32 w-32 rounded-full border-4 border-white bg-gray-200 flex items-center justify-center">
                  <span className="text-4xl font-bold text-gray-400">
                    {(profile.full_name || profile.username).charAt(0)}
                  </span>
                </div>
              )}
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 mt-4 mb-1">
              {profile.full_name || profile.username}
            </h1>
            {profile.location && (
              <div className="flex items-center justify-center text-gray-600 mb-2">
                <MapPin size={16} className="mr-1" />
                <span className="text-sm">{profile.location}</span>
              </div>
            )}
            <p className="text-gray-600">{profile.bio}</p>
          </div>
        </motion.div>
        
        {/* Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-3 mb-8"
        >
          {profile.links?.map((link, index) => (
            <motion.a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`
                flex items-center justify-between w-full px-6 py-3 rounded-xl
                ${profile.theme?.buttonStyle === 'filled' 
                  ? `bg-primary-600 text-white hover:bg-primary-700` 
                  : profile.theme?.buttonStyle === 'outline'
                    ? `bg-white border border-primary-600 text-primary-600 hover:bg-primary-50`
                    : `bg-white shadow-soft text-primary-600 hover:shadow-medium`
                }
                transition-all duration-200
              `}
            >
              <div className="flex items-center">
                {getLinkIcon(link.platform)}
                <span className="ml-3 font-medium">{link.label}</span>
              </div>
              <ExternalLink size={18} />
            </motion.a>
          ))}
        </motion.div>
        
        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center space-x-4"
        >
          <button
            onClick={handleShare}
            className="flex items-center justify-center p-3 bg-white rounded-full shadow-soft hover:shadow-medium transition-all duration-200"
            aria-label="Share profile"
          >
            <Share size={20} className="text-gray-700" />
          </button>
          
          <button
            onClick={() => setIsQRModalOpen(true)}
            className="flex items-center justify-center p-3 bg-white rounded-full shadow-soft hover:shadow-medium transition-all duration-200"
            aria-label="Show QR code"
          >
            <QrCode size={20} className="text-gray-700" />
          </button>
        </motion.div>
        
        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-xs text-gray-500">
            Shared via <span className="font-medium">Altewear Smart Ring</span>
          </p>
        </div>
      </div>

      {/* QR Code Modal */}
      <QRCodeModal
        url={window.location.href}
        isOpen={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
      />
    </div>
  );
};

export default PublicProfilePage;