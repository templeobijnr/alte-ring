import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Key, Mail, Trash2, UserX, AlertTriangle } from 'lucide-react';
import Card, { CardHeader, CardContent } from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

const SettingsPage: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
  // Handle password change
  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Reset form
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setIsLoading(false);
  };
  
  // Toggle delete account modal
  const toggleDeleteModal = () => {
    setIsDeleteModalOpen(!isDeleteModalOpen);
  };
  
  // Handle account deletion
  const handleDeleteAccount = async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Redirect to home
    window.location.href = '/';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
        <p className="text-gray-600">Manage your account preferences and security</p>
      </div>
      
      {/* Change Password */}
      <Card>
        <CardHeader 
          title="Change Password" 
          subtitle="Update your account password"
        />
        <CardContent>
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <Input
              id="current_password"
              type="password"
              label="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
              leftIcon={<Key size={18} />}
            />
            
            <Input
              id="new_password"
              type="password"
              label="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              leftIcon={<Key size={18} />}
              helperText="Must be at least 8 characters"
            />
            
            <Input
              id="confirm_password"
              type="password"
              label="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              leftIcon={<Key size={18} />}
            />
            
            <div className="flex justify-end">
              <Button
                type="submit"
                isLoading={isLoading}
              >
                Update Password
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      
      {/* Email Notifications */}
      <Card>
        <CardHeader 
          title="Email Notifications" 
          subtitle="Manage email preferences"
        />
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Profile activity</h3>
                <p className="text-xs text-gray-500 mt-1">Get notified when someone views your profile</p>
              </div>
              <div className="relative inline-block w-10 align-middle select-none">
                <input
                  type="checkbox"
                  id="toggle_profile"
                  className="sr-only"
                  defaultChecked
                />
                <label
                  htmlFor="toggle_profile"
                  className="block h-6 rounded-full bg-gray-300 cursor-pointer"
                >
                  <span
                    className="absolute left-0 inline-block w-6 h-6 transform translate-x-0 bg-white rounded-full transition-transform duration-200 ease-in-out"
                  ></span>
                </label>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Product updates</h3>
                <p className="text-xs text-gray-500 mt-1">Receive updates about new features and improvements</p>
              </div>
              <div className="relative inline-block w-10 align-middle select-none">
                <input
                  type="checkbox"
                  id="toggle_updates"
                  className="sr-only"
                  defaultChecked
                />
                <label
                  htmlFor="toggle_updates"
                  className="block h-6 rounded-full bg-gray-300 cursor-pointer"
                >
                  <span
                    className="absolute left-0 inline-block w-6 h-6 transform translate-x-0 bg-white rounded-full transition-transform duration-200 ease-in-out"
                  ></span>
                </label>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Marketing emails</h3>
                <p className="text-xs text-gray-500 mt-1">Receive offers, promotions and related marketing</p>
              </div>
              <div className="relative inline-block w-10 align-middle select-none">
                <input
                  type="checkbox"
                  id="toggle_marketing"
                  className="sr-only"
                />
                <label
                  htmlFor="toggle_marketing"
                  className="block h-6 rounded-full bg-gray-300 cursor-pointer"
                >
                  <span
                    className="absolute left-0 inline-block w-6 h-6 transform translate-x-0 bg-white rounded-full transition-transform duration-200 ease-in-out"
                  ></span>
                </label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Account Management */}
      <Card>
        <CardHeader 
          title="Account Management" 
          subtitle="Manage your account data"
        />
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-1">Update Email Address</h3>
              <div className="flex items-center space-x-3">
                <Input
                  id="email"
                  type="email"
                  placeholder="New email address"
                  leftIcon={<Mail size={18} />}
                />
                <Button 
                  variant="secondary"
                  className="flex-shrink-0"
                >
                  Update
                </Button>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-1">Export Your Data</h3>
              <p className="text-xs text-gray-500 mb-2">
                Download a copy of your profile and account data
              </p>
              <Button 
                variant="secondary"
              >
                Export Data
              </Button>
            </div>
            
            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-0.5">
                  <AlertTriangle size={20} className="text-red-600" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-600">Danger Zone</h3>
                  <p className="text-xs text-gray-500 mt-1 mb-3">
                    Once you delete your account, there is no going back. Please be certain.
                  </p>
                  <Button 
                    variant="outline"
                    className="text-red-600 border-red-300 hover:bg-red-50"
                    leftIcon={<Trash2 size={16} />}
                    onClick={toggleDeleteModal}
                  >
                    Delete Account
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Delete Account Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                  <UserX size={20} className="text-red-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 ml-3">Delete Account</h3>
              </div>
              
              <p className="text-gray-600 mb-4">
                Are you sure you want to delete your account? All of your data will be permanently removed. This action cannot be undone.
              </p>
              
              <div className="bg-red-50 border border-red-100 rounded-lg p-3 mb-6">
                <p className="text-sm text-red-800">
                  This will permanently delete your profile, account data, and remove your access to Altewear services.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row-reverse gap-3">
                <Button 
                  className="bg-red-600 hover:bg-red-700"
                  onClick={handleDeleteAccount}
                >
                  Delete Account
                </Button>
                <Button 
                  variant="secondary"
                  onClick={toggleDeleteModal}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default SettingsPage;