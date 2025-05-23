import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BellRingIcon as Ring, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

// Step components
const StepIndicator: React.FC<{ currentStep: number; totalSteps: number }> = ({ 
  currentStep, 
  totalSteps 
}) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <React.Fragment key={index}>
            {/* Step circle */}
            <div className={`
              relative z-10 rounded-full flex items-center justify-center w-8 h-8 
              ${currentStep > index 
                ? 'bg-primary-600 text-white' 
                : currentStep === index 
                  ? 'border-2 border-primary-600 text-primary-600' 
                  : 'bg-gray-200 text-gray-400'}
            `}>
              {currentStep > index ? (
                <CheckCircle2 size={16} />
              ) : (
                <span className="text-sm font-medium">{index + 1}</span>
              )}
            </div>
            
            {/* Connector line */}
            {index < totalSteps - 1 && (
              <div className={`flex-1 h-0.5 ${currentStep > index ? 'bg-primary-600' : 'bg-gray-200'}`} />
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="flex justify-between mt-2">
        <span className="text-xs font-medium">Account</span>
        <span className="text-xs font-medium">Profile</span>
        <span className="text-xs font-medium">Ring Setup</span>
      </div>
    </div>
  );
};

const WelcomeStep: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="text-center mb-6">
        <div className="w-16 h-16 mx-auto bg-primary-100 rounded-full flex items-center justify-center mb-4">
          <Ring className="h-8 w-8 text-primary-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to Altewear</h2>
        <p className="text-gray-600">Let's set up your smart ring in just a few steps</p>
      </div>
      <div className="space-y-4">
        <div className="border border-gray-200 rounded-lg p-4 flex items-start space-x-4">
          <div className="bg-primary-100 rounded-full p-2 mt-1">
            <CheckCircle2 className="h-5 w-5 text-primary-600" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900">Create your profile</h3>
            <p className="text-sm text-gray-500 mt-1">
              Set up your digital identity to share with others
            </p>
          </div>
        </div>
        <div className="border border-gray-200 rounded-lg p-4 flex items-start space-x-4">
          <div className="bg-primary-100 rounded-full p-2 mt-1">
            <CheckCircle2 className="h-5 w-5 text-primary-600" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900">Customize your style</h3>
            <p className="text-sm text-gray-500 mt-1">
              Choose how your public profile looks when shared
            </p>
          </div>
        </div>
        <div className="border border-gray-200 rounded-lg p-4 flex items-start space-x-4">
          <div className="bg-primary-100 rounded-full p-2 mt-1">
            <CheckCircle2 className="h-5 w-5 text-primary-600" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900">Program your ring</h3>
            <p className="text-sm text-gray-500 mt-1">
              Write your profile link to your Altewear NFC ring
            </p>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <Button onClick={onNext} className="w-full" rightIcon={<ArrowRight size={18} />}>
          Let's get started
        </Button>
      </div>
    </motion.div>
  );
};

const AccountStep: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h2 className="text-xl font-bold text-gray-900 mb-4">Create your account</h2>
      <p className="text-gray-600 mb-6">
        First, let's set up your Altewear account to manage your ring
      </p>
      
      <Button onClick={() => window.location.href = '/signup'} className="w-full mb-4">
        Sign up with email
      </Button>
      
      <div className="text-center my-4">
        <span className="text-sm text-gray-500">Already have an account?</span>
      </div>
      
      <Button variant="secondary" onClick={() => window.location.href = '/login'} className="w-full">
        Log in
      </Button>
      
      <div className="mt-6 text-center">
        <button 
          onClick={onNext} 
          className="text-sm font-medium text-primary-600 hover:text-primary-700"
        >
          I'll do this later
        </button>
      </div>
    </motion.div>
  );
};

const ProfileStep: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h2 className="text-xl font-bold text-gray-900 mb-4">Set up your profile</h2>
      <p className="text-gray-600 mb-6">
        Customize what others see when they tap your ring
      </p>
      
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
        <p className="text-sm text-gray-700">
          You'll need to be logged in to create and customize your profile.
          Please sign up or log in first.
        </p>
      </div>
      
      <Button onClick={() => window.location.href = '/signup'} className="w-full mb-4">
        Sign up to continue
      </Button>
      
      <Button variant="secondary" onClick={() => window.location.href = '/login'} className="w-full mb-4">
        Log in instead
      </Button>
      
      <div className="mt-6 text-center">
        <button 
          onClick={onNext} 
          className="text-sm font-medium text-primary-600 hover:text-primary-700"
        >
          Skip for now
        </button>
      </div>
    </motion.div>
  );
};

const RingSetupStep: React.FC<{ onDone: () => void }> = ({ onDone }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h2 className="text-xl font-bold text-gray-900 mb-4">Program your ring</h2>
      <p className="text-gray-600 mb-6">
        Configure your Altewear ring with your profile link
      </p>
      
      <div className="space-y-6">
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="font-medium text-gray-900 mb-2">Android Users</h3>
          <p className="text-sm text-gray-600 mb-4">
            Use our Web NFC writer to program your ring directly from your browser.
          </p>
          <Button variant="secondary" className="w-full" onClick={() => window.location.href = '/dashboard/nfc-write'}>
            Open NFC Writer
          </Button>
        </div>
        
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="font-medium text-gray-900 mb-2">iOS Users</h3>
          <p className="text-sm text-gray-600 mb-4">
            For iPhone users, we recommend using the NFC Tools app.
          </p>
          <ol className="list-decimal text-sm text-gray-600 ml-5 space-y-2 mb-4">
            <li>Download the NFC Tools app from the App Store</li>
            <li>Copy your profile link from your dashboard</li>
            <li>In NFC Tools, choose "Write" and then "URL"</li>
            <li>Paste your URL and tap "Write"</li>
            <li>Hold your ring to the top of your iPhone</li>
          </ol>
          <Button variant="secondary" className="w-full" onClick={() => window.location.href = '/dashboard'}>
            Go to Dashboard
          </Button>
        </div>
      </div>
      
      <div className="mt-8">
        <Button onClick={onDone} className="w-full">
          Complete Setup
        </Button>
      </div>
    </motion.div>
  );
};

const SetupPage: React.FC = () => {
  const [step, setStep] = useState(0);
  const [hasSeenWelcome, setHasSeenWelcome] = useState(false);
  const navigate = useNavigate();
  
  const totalSteps = 3;
  
  const handleNext = () => {
    if (!hasSeenWelcome) {
      setHasSeenWelcome(true);
      return;
    }
    
    if (step < totalSteps - 1) {
      setStep(step + 1);
    }
  };
  
  const handleDone = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="w-full max-w-md">
        <Card>
          {hasSeenWelcome && <StepIndicator currentStep={step} totalSteps={totalSteps} />}
          
          {!hasSeenWelcome ? (
            <WelcomeStep onNext={handleNext} />
          ) : (
            <>
              {step === 0 && <AccountStep onNext={handleNext} />}
              {step === 1 && <ProfileStep onNext={handleNext} />}
              {step === 2 && <RingSetupStep onDone={handleDone} />}
            </>
          )}
        </Card>
      </div>
    </div>
  );
};

export default SetupPage;