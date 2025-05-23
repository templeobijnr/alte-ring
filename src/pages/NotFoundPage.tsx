import React from 'react';
import { Link } from 'react-router-dom';
import { BellRingIcon as Ring, ArrowLeft } from 'lucide-react';
import Button from '../components/ui/Button';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="text-center">
        <Ring className="h-16 w-16 text-primary-600 mx-auto mb-6" />
        
        <h1 className="text-5xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Page Not Found</h2>
        
        <p className="text-gray-600 max-w-md mx-auto mb-8">
          The page you are looking for might have been removed, had its name changed,
          or is temporarily unavailable.
        </p>
        
        <Button
          as={Link}
          to="/"
          leftIcon={<ArrowLeft size={18} />}
        >
          Back to Home
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;