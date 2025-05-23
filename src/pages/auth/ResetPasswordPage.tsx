import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BellRingIcon as RingIcon, Mail, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

const ResetPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitted(true);
    setIsLoading(false);
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
            <RingIcon className="h-12 w-12 text-primary-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Reset password</h2>
          <p className="text-gray-600">
            {!isSubmitted
              ? "We'll send you instructions to reset your password"
              : "Check your email for reset instructions"}
          </p>
        </div>
        
        <Card>
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                id="email"
                type="email"
                label="Email address"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                leftIcon={<Mail size={18} />}
              />
              
              <Button
                type="submit"
                className="w-full"
                isLoading={isLoading}
              >
                Send reset instructions
              </Button>
            </form>
          ) : (
            <div className="text-center py-4">
              <div className="rounded-full bg-green-100 text-green-600 p-3 mx-auto w-16 h-16 flex items-center justify-center mb-4">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-8 w-8" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M5 13l4 4L19 7" 
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Check your inbox</h3>
              <p className="text-gray-600 mb-4">
                We've sent a password reset link to <span className="font-medium">{email}</span>
              </p>
              <p className="text-gray-500 text-sm">
                Didn't receive an email? Check your spam folder or try again.
              </p>
            </div>
          )}
          
          <div className="mt-6 text-center">
            <Link 
              to="/login" 
              className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-500"
            >
              <ArrowLeft size={16} className="mr-1" />
              Back to sign in
            </Link>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default ResetPasswordPage;