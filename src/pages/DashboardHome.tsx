import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ExternalLink, Copy, User, Palette, Smartphone, Link as LinkIcon, Globe, Instagram, Twitter, Linkedin, MessageSquare } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useOwnProfile } from '../hooks/useOwnProfile';
import Card, { CardHeader, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';

const DashboardHome: React.FC = () => {
  const { user } = useAuth();
  const { profile, loading } = useOwnProfile(user?.id || '');
  const profileUrl = `${window.location.origin}/u/${profile?.username || user?.username}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(profileUrl);
  };

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

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Manage your Altewear smart ring</p>
      </div>

      {/* Profile Preview Card */}
      <Card>
        <CardHeader 
          title="Your Profile Link" 
          subtitle="Share this link or write it to your ring"
        />
        <CardContent>
          <div className="flex flex-col md:flex-row gap-6">
            {/* Link and Actions */}
            <div className="flex-1">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg mb-4">
                <a
                  href={profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 font-medium truncate hover:underline flex items-center"
                >
                  {profileUrl}
                  <ExternalLink size={14} className="ml-1 flex-shrink-0" />
                </a>
                <button
                  onClick={handleCopyLink}
                  className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                  aria-label="Copy link"
                >
                  <Copy size={16} />
                </button>
              </div>

              <div className="flex space-x-3">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleCopyLink}
                  leftIcon={<Copy size={16} />}
                >
                  Copy Link
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  as={Link}
                  to={`/u/${profile?.username || user?.username}`}
                  leftIcon={<ExternalLink size={16} />}
                >
                  Preview Profile
                </Button>
              </div>
            </div>

            {/* Profile Preview */}
            {!loading && profile && (
              <div className="w-full md:w-64 bg-dark-900 rounded-lg overflow-hidden">
                <div className="p-4 text-center">
                  {profile.avatar_url ? (
                    <img 
                      src={profile.avatar_url}
                      alt={profile.full_name || profile.username}
                      className="w-16 h-16 rounded-full mx-auto mb-3 object-cover"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-dark-800 mx-auto mb-3 flex items-center justify-center">
                      <span className="text-2xl font-bold text-gray-400">
                        {(profile.full_name || profile.username || '?').charAt(0)}
                      </span>
                    </div>
                  )}
                  <h3 className="text-lg font-semibold text-white mb-1">
                    {profile.full_name || profile.username}
                  </h3>
                  {profile.bio && (
                    <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                      {profile.bio}
                    </p>
                  )}
                  
                  {profile.links && profile.links.length > 0 && (
                    <div className="space-y-2">
                      {profile.links.slice(0, 3).map((link) => (
                        <div
                          key={link.id}
                          className="flex items-center bg-dark-800 rounded p-2 text-sm text-white"
                        >
                          {getLinkIcon(link.platform)}
                          <span className="ml-2 truncate">{link.label}</span>
                        </div>
                      ))}
                      {profile.links.length > 3 && (
                        <div className="text-sm text-gray-400">
                          +{profile.links.length - 3} more links
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {/* Edit Profile Card */}
          <motion.div variants={item}>
            <Link to="/dashboard/profile">
              <Card className="h-full hover:shadow-medium transition-shadow cursor-pointer">
                <div className="flex items-start">
                  <div className="p-3 bg-primary-100 rounded-lg mr-4">
                    <User className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">Edit Profile</h3>
                    <p className="text-sm text-gray-600">Update your personal information and social links</p>
                  </div>
                </div>
              </Card>
            </Link>
          </motion.div>

          {/* Alté Link Card */}
          <motion.div variants={item}>
            <Link to="/dashboard/alte-link">
              <Card className="h-full hover:shadow-medium transition-shadow cursor-pointer">
                <div className="flex items-start">
                  <div className="p-3 bg-accent-100 rounded-lg mr-4">
                    <LinkIcon className="h-6 w-6 text-accent-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">Alté Link</h3>
                    <p className="text-sm text-gray-600">Customize your public profile and manage your links</p>
                  </div>
                </div>
              </Card>
            </Link>
          </motion.div>

          {/* Customize Style Card */}
          <motion.div variants={item}>
            <Link to="/dashboard/style">
              <Card className="h-full hover:shadow-medium transition-shadow cursor-pointer">
                <div className="flex items-start">
                  <div className="p-3 bg-accent-100 rounded-lg mr-4">
                    <Palette className="h-6 w-6 text-accent-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">Customize Style</h3>
                    <p className="text-sm text-gray-600">Change the appearance of your public profile</p>
                  </div>
                </div>
              </Card>
            </Link>
          </motion.div>

          {/* Write to Ring Card */}
          <motion.div variants={item}>
            <Link to="/dashboard/nfc-write">
              <Card className="h-full hover:shadow-medium transition-shadow cursor-pointer">
                <div className="flex items-start">
                  <div className="p-3 bg-primary-100 rounded-lg mr-4">
                    <Smartphone className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">Write to Ring</h3>
                    <p className="text-sm text-gray-600">Program your smart ring with your profile link</p>
                  </div>
                </div>
              </Card>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader 
          title="Recent Activity" 
          subtitle="See who's viewed your profile"
          action={
            <Button variant="text" size="sm">
              View All
            </Button>
          }
        />
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <p>No recent activity to show</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardHome;