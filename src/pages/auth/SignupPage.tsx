import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BellRingIcon as Ring, Mail, Lock, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

const SignupPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { signup } = useAuth();
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateUsername = (username: string) => {
    const usernameRegex = /^[a-z0-9_-]{3,30}$/;
    return usernameRegex.test(username);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validate fields
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (!validateUsername(username)) {
      setError('Username must be 3-30 characters and can only contain lowercase letters, numbers, underscores, and hyphens');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    
    setIsLoading(true);
    
    try {
      console.log('Starting signup process...');
      await signup(email.toLowerCase().trim(), password, username.toLowerCase());
      console.log('Signup successful, redirecting...');
      navigate('/dashboard');
    } catch (err: any) {
      console.error('Signup error:', err);
      if (err?.message?.includes('already registered')) {
        setError('This email is already registered');
      } else if (err?.message?.includes('Username is already taken')) {
        setError('This username is already taken');
      } else {
        setError(err?.message || 'Failed to create account. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Ring className="h-12 w-12 text-primary-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Create your account</h2>
          <p className="text-gray-600">Set up your Altewear profile in minutes</p>
        </div>
        
        <Card>
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              id="email"
              type="email"
              label="Email address"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value.toLowerCase().trim())}
              required
              leftIcon={<Mail size={18} />}
            />
            
            <Input
              id="username"
              type="text"
              label="Username"
              placeholder="yourname"
              value={username}
              onChange={(e) => setUsername(e.target.value.toLowerCase())}
              required
              helperText="This will be your public profile URL: altewear.com/u/yourname"
              leftIcon={<User size={18} />}
            />
            
            <Input
              id="password"
              type="password"
              label="Password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              helperText="Must be at least 8 characters"
              leftIcon={<Lock size={18} />}
            />
            
            <Input
              id="confirm_password"
              type="password"
              label="Confirm password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              leftIcon={<Lock size={18} />}
            />
            
            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                I agree to the{' '}
                <Link to="/terms" className="font-medium text-primary-600 hover:text-primary-500">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="font-medium text-primary-600 hover:text-primary-500">
                  Privacy Policy
                </Link>
              </label>
            </div>
            
            <Button
              type="submit"
              className="w-full"
              isLoading={isLoading}
            >
              Sign up
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
                Sign in
              </Link>
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default SignupPage;