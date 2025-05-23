import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, Layout, Columns, Grid, CheckCircle, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Card, { CardHeader, CardContent } from '../../components/ui/Card';
import Button from '../../components/ui/Button';

// Layout option type
interface LayoutOption {
  id: string;
  name: string;
  icon: React.ReactNode;
  preview: string;
}

// Color theme option type
interface ColorTheme {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  preview: string;
}

const StyleCustomize: React.FC = () => {
  const { user } = useAuth();
  const [selectedLayout, setSelectedLayout] = useState<string>('minimal');
  const [selectedTheme, setSelectedTheme] = useState<string>('blue');
  const [isLoading, setIsLoading] = useState(false);
  
  // Available layout options
  const layoutOptions: LayoutOption[] = [
    {
      id: 'minimal',
      name: 'Minimal',
      icon: <Layout size={20} />,
      preview: 'https://images.pexels.com/photos/5691622/pexels-photo-5691622.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: 'card',
      name: 'Card',
      icon: <Columns size={20} />,
      preview: 'https://images.pexels.com/photos/5691623/pexels-photo-5691623.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: 'grid',
      name: 'Grid',
      icon: <Grid size={20} />,
      preview: 'https://images.pexels.com/photos/5691624/pexels-photo-5691624.jpeg?auto=compress&cs=tinysrgb&w=300'
    }
  ];
  
  // Available color themes
  const colorThemes: ColorTheme[] = [
    {
      id: 'blue',
      name: 'Cobalt Blue',
      primary: '#3b5cff',
      secondary: '#e5e9ed',
      accent: '#0abf6b',
      preview: 'https://images.pexels.com/photos/2559941/pexels-photo-2559941.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: 'emerald',
      name: 'Emerald',
      primary: '#10b981',
      secondary: '#e5e9ed',
      accent: '#6366f1',
      preview: 'https://images.pexels.com/photos/1261728/pexels-photo-1261728.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: 'cyber',
      name: 'Cyber',
      primary: '#7c3aed',
      secondary: '#e5e9ed',
      accent: '#f97316',
      preview: 'https://images.pexels.com/photos/2693212/pexels-photo-2693212.png?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: 'monochrome',
      name: 'Monochrome',
      primary: '#27272a',
      secondary: '#e5e9ed',
      accent: '#71717a',
      preview: 'https://images.pexels.com/photos/2098427/pexels-photo-2098427.jpeg?auto=compress&cs=tinysrgb&w=300'
    }
  ];
  
  // Handle save changes
  const handleSaveChanges = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Show success message
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Customize Style</h1>
        <p className="text-gray-600">Personalize how your public profile looks</p>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-2/3 space-y-6">
          {/* Layout Selection */}
          <Card>
            <CardHeader 
              title="Layout Style" 
              subtitle="Choose how your profile information is displayed"
            />
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {layoutOptions.map(layout => (
                  <div 
                    key={layout.id}
                    className={`relative cursor-pointer rounded-lg overflow-hidden transition-all ${
                      selectedLayout === layout.id 
                        ? 'ring-2 ring-primary-600 ring-offset-2' 
                        : 'hover:shadow-md border border-gray-200'
                    }`}
                    onClick={() => setSelectedLayout(layout.id)}
                  >
                    {/* Preview image */}
                    <img 
                      src={layout.preview} 
                      alt={layout.name}
                      className="w-full h-48 object-cover"
                    />
                    
                    {/* Layout name */}
                    <div className="p-3 bg-white">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <span className="mr-2 text-gray-500">{layout.icon}</span>
                          <span className="font-medium">{layout.name}</span>
                        </div>
                        
                        {selectedLayout === layout.id && (
                          <CheckCircle size={18} className="text-primary-600" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Color Theme Selection */}
          <Card>
            <CardHeader 
              title="Color Theme" 
              subtitle="Select a color scheme for your profile"
            />
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {colorThemes.map(theme => (
                  <div 
                    key={theme.id}
                    className={`relative cursor-pointer rounded-lg overflow-hidden transition-all ${
                      selectedTheme === theme.id 
                        ? 'ring-2 ring-primary-600 ring-offset-2' 
                        : 'hover:shadow-md border border-gray-200'
                    }`}
                    onClick={() => setSelectedTheme(theme.id)}
                  >
                    {/* Color preview */}
                    <div className="h-24 w-full relative">
                      <img
                        src={theme.preview}
                        alt={theme.name}
                        className="w-full h-full object-cover"
                      />
                      <div 
                        className="absolute inset-0 opacity-70"
                        style={{ backgroundColor: theme.primary }}
                      ></div>
                    </div>
                    
                    {/* Color swatches */}
                    <div className="p-3 bg-white">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">{theme.name}</span>
                        {selectedTheme === theme.id && (
                          <CheckCircle size={16} className="text-primary-600" />
                        )}
                      </div>
                      
                      <div className="flex space-x-1">
                        <div 
                          className="w-6 h-6 rounded-full" 
                          style={{ backgroundColor: theme.primary }}
                        ></div>
                        <div 
                          className="w-6 h-6 rounded-full" 
                          style={{ backgroundColor: theme.accent }}
                        ></div>
                        <div 
                          className="w-6 h-6 rounded-full" 
                          style={{ backgroundColor: theme.secondary }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Background Options */}
          <Card>
            <CardHeader 
              title="Background Options" 
              subtitle="Customize your profile background"
            />
            <CardContent>
              <div className="space-y-6">
                {/* Background Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Background Type
                  </label>
                  <div className="flex space-x-4">
                    <label className="inline-flex items-center">
                      <input 
                        type="radio" 
                        className="form-radio h-4 w-4 text-primary-600" 
                        name="background_type" 
                        value="color"
                        defaultChecked
                      />
                      <span className="ml-2 text-gray-700">Solid Color</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input 
                        type="radio" 
                        className="form-radio h-4 w-4 text-primary-600" 
                        name="background_type" 
                        value="gradient"
                      />
                      <span className="ml-2 text-gray-700">Gradient</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input 
                        type="radio" 
                        className="form-radio h-4 w-4 text-primary-600" 
                        name="background_type" 
                        value="image"
                      />
                      <span className="ml-2 text-gray-700">Image</span>
                    </label>
                  </div>
                </div>
                
                {/* Background Color (simplified for demo) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Background Color
                  </label>
                  <div className="grid grid-cols-8 gap-2">
                    {['#ffffff', '#f8f9fa', '#e5e9ed', '#3b5cff', '#0abf6b', '#f97316', '#7c3aed', '#27272a'].map(color => (
                      <div 
                        key={color} 
                        className="w-8 h-8 rounded-full cursor-pointer border border-gray-200"
                        style={{ backgroundColor: color }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Button Style */}
          <Card>
            <CardHeader 
              title="Button Style" 
              subtitle="Choose how your action buttons look"
            />
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div className="border border-gray-200 hover:border-primary-300 rounded-lg p-4 cursor-pointer">
                  <div className="bg-primary-600 text-white text-center py-2 px-4 rounded-lg mb-2">
                    Filled
                  </div>
                  <p className="text-xs text-center text-gray-500">Solid background</p>
                </div>
                
                <div className="border border-gray-200 hover:border-primary-300 rounded-lg p-4 cursor-pointer">
                  <div className="bg-white text-primary-600 text-center py-2 px-4 rounded-lg border border-primary-600 mb-2">
                    Outlined
                  </div>
                  <p className="text-xs text-center text-gray-500">Border only</p>
                </div>
                
                <div className="border border-gray-200 hover:border-primary-300 rounded-lg p-4 cursor-pointer">
                  <div className="bg-white text-primary-600 text-center py-2 px-4 rounded-lg shadow-md mb-2">
                    Soft
                  </div>
                  <p className="text-xs text-center text-gray-500">Soft shadow</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Save Button */}
          <div className="flex justify-end">
            <Button
              onClick={handleSaveChanges}
              isLoading={isLoading}
            >
              Save Changes
            </Button>
          </div>
        </div>
        
        {/* Preview Panel */}
        <div className="lg:w-1/3">
          <div className="sticky top-6">
            <Card>
              <CardHeader 
                title="Live Preview" 
                subtitle="See how your profile will look"
                action={
                  <Button 
                    variant="secondary" 
                    size="sm"
                    leftIcon={<Eye size={16} />}
                  >
                    Full Preview
                  </Button>
                }
              />
              <CardContent>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div 
                    className="h-64 w-full bg-cover bg-center"
                    style={{ 
                      backgroundImage: `url('https://images.pexels.com/photos/2693212/pexels-photo-2693212.png?auto=compress&cs=tinysrgb&w=600')`,
                      backgroundColor: colorThemes.find(t => t.id === selectedTheme)?.primary
                    }}
                  >
                    <div className="h-full w-full flex flex-col items-center justify-center text-white p-4">
                      <div className="w-20 h-20 rounded-full bg-white mb-3 flex items-center justify-center">
                        <User className="text-gray-500 h-10 w-10" />
                      </div>
                      <h3 className="text-xl font-bold">{user?.name || user?.username || 'Your Name'}</h3>
                      <p className="text-sm opacity-90 text-center mt-1">Your bio would appear here, describing who you are and what you do.</p>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4">
                    <div className="grid grid-cols-1 gap-2">
                      <button className="w-full bg-primary-600 text-white py-2 rounded-lg text-sm">
                        Website
                      </button>
                      <button className="w-full bg-primary-600 text-white py-2 rounded-lg text-sm">
                        Instagram
                      </button>
                      <button className="w-full bg-primary-600 text-white py-2 rounded-lg text-sm">
                        LinkedIn
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 text-center text-xs text-gray-500">
                  This is a simplified preview. Some elements may appear differently on the actual profile.
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default StyleCustomize;