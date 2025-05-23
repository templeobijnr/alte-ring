import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Copy, AlertTriangle, CheckCircle, ArrowRight, Loader } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Card, { CardHeader, CardContent } from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const NfcWritePage: React.FC = () => {
  const { user } = useAuth();
  const profileUrl = `${window.location.origin}/u/${user?.username}`;
  
  const [isNfcSupported, setIsNfcSupported] = useState<boolean | null>(null);
  const [isWriting, setIsWriting] = useState(false);
  const [writeStatus, setWriteStatus] = useState<'idle' | 'writing' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  
  // Check if Web NFC is supported (mainly on Android Chrome)
  useEffect(() => {
    if ('NDEFReader' in window) {
      setIsNfcSupported(true);
    } else {
      setIsNfcSupported(false);
    }
  }, []);
  
  // Handle copy profile URL
  const handleCopyLink = () => {
    navigator.clipboard.writeText(profileUrl);
    // Could add a toast notification here
  };
  
  // Handle write to NFC
  const handleWriteNfc = async () => {
    if (!isNfcSupported) return;
    
    setIsWriting(true);
    setWriteStatus('writing');
    
    try {
      // This is mock code since we can't actually use NDEFReader in most environments
      // In a real implementation, you would use the Web NFC API
      
      // Simulating NFC writing process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate success (in real app, this would be the actual NFC write operation)
      const shouldSucceed = Math.random() > 0.3; // 70% success rate for demo
      
      if (shouldSucceed) {
        setWriteStatus('success');
      } else {
        setWriteStatus('error');
        setErrorMessage('Failed to write to NFC tag. Please try again.');
      }
    } catch (error) {
      setWriteStatus('error');
      setErrorMessage('An error occurred while writing to NFC tag.');
      console.error('NFC write error:', error);
    } finally {
      setIsWriting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Write to Ring</h1>
        <p className="text-gray-600">Program your Altewear ring with your profile</p>
      </div>
      
      {/* Profile URL Card */}
      <Card>
        <CardHeader 
          title="Your Profile Link" 
          subtitle="This is the link that will be written to your ring"
        />
        <CardContent>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg mb-4">
            <span className="font-medium text-gray-700 truncate">{profileUrl}</span>
            <button
              onClick={handleCopyLink}
              className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
              aria-label="Copy link"
            >
              <Copy size={18} />
            </button>
          </div>
          
          <Button
            variant="secondary"
            onClick={handleCopyLink}
            leftIcon={<Copy size={18} />}
          >
            Copy Link
          </Button>
        </CardContent>
      </Card>
      
      {/* NFC Writer Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Android Section */}
        <Card>
          <CardHeader 
            title="Android Users" 
            subtitle="Use Web NFC to program your ring"
          />
          <CardContent>
            {isNfcSupported === null ? (
              <div className="flex justify-center py-8">
                <Loader className="h-8 w-8 text-primary-600 animate-spin" />
              </div>
            ) : isNfcSupported ? (
              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <ol className="list-decimal ml-5 space-y-2 text-gray-700">
                    <li>Make sure NFC is enabled on your device</li>
                    <li>Click the "Write to Ring" button below</li>
                    <li>Hold your Altewear ring to the back of your phone</li>
                    <li>Keep the ring in position until writing is complete</li>
                  </ol>
                </div>
                
                {writeStatus === 'error' && (
                  <div className="bg-red-50 text-red-700 p-4 rounded-lg flex items-start">
                    <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                    <p className="text-sm">{errorMessage}</p>
                  </div>
                )}
                
                {writeStatus === 'success' && (
                  <div className="bg-green-50 text-green-700 p-4 rounded-lg flex items-start">
                    <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                    <p className="text-sm">Successfully wrote to NFC ring! Your profile is now ready to share.</p>
                  </div>
                )}
                
                <div className="flex justify-center">
                  <Button
                    onClick={handleWriteNfc}
                    isLoading={writeStatus === 'writing'}
                    leftIcon={<Smartphone size={18} />}
                  >
                    {writeStatus === 'writing' 
                      ? 'Writing...' 
                      : writeStatus === 'success' 
                        ? 'Write Again' 
                        : 'Write to Ring'}
                  </Button>
                </div>
                
                {writeStatus === 'writing' && (
                  <div className="text-center text-gray-500 text-sm">
                    Hold your ring to the back of your phone...
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-yellow-50 p-4 rounded-lg">
                <div className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-yellow-800">
                      Web NFC not supported
                    </h3>
                    <p className="mt-1 text-sm text-yellow-700">
                      Your browser doesn't support Web NFC. Try using Google Chrome on Android.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* iOS Section */}
        <Card>
          <CardHeader 
            title="iOS Users" 
            subtitle="Use the NFC Tools app to program your ring"
          />
          <CardContent>
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <ol className="list-decimal ml-5 space-y-2 text-gray-700">
                  <li>Download the NFC Tools app from the App Store</li>
                  <li>Copy your profile link using the button above</li>
                  <li>Open NFC Tools and tap "Write"</li>
                  <li>Select "URL/URI" and paste your link</li>
                  <li>Tap "Write" and hold your ring to the top of your iPhone</li>
                </ol>
              </div>
              
              <div className="flex flex-col items-center space-y-4">
                <Button
                  variant="secondary"
                  as="a"
                  href="https://apps.apple.com/us/app/nfc-tools/id1252962749"
                  target="_blank"
                  rel="noopener noreferrer"
                  rightIcon={<ArrowRight size={18} />}
                >
                  Get NFC Tools App
                </Button>
                
                <Button
                  variant="secondary"
                  onClick={handleCopyLink}
                  leftIcon={<Copy size={18} />}
                >
                  Copy Profile Link
                </Button>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-start">
                  <div className="text-blue-600 mr-2 flex-shrink-0 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="16" x2="12" y2="12"></line>
                      <line x1="12" y1="8" x2="12.01" y2="8"></line>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-blue-800">
                      Tip for iPhone users
                    </h3>
                    <p className="mt-1 text-sm text-blue-700">
                      On iPhone, NFC reading is automatic but writing requires an app. iOS 14 or newer is recommended.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Troubleshooting Card */}
      <Card>
        <CardHeader 
          title="Troubleshooting" 
          subtitle="Having issues with your ring?"
        />
        <CardContent>
          <div className="space-y-4">
            <div className="border-b pb-3">
              <button className="flex w-full justify-between items-center text-left">
                <span className="font-medium">Ring not being detected?</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
            </div>
            
            <div className="border-b pb-3">
              <button className="flex w-full justify-between items-center text-left">
                <span className="font-medium">Write operation fails repeatedly?</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
            </div>
            
            <div>
              <button className="flex w-full justify-between items-center text-left">
                <span className="font-medium">Ring works inconsistently when tapped?</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <a 
              href="/support" 
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              Visit Support Center
            </a>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default NfcWritePage;