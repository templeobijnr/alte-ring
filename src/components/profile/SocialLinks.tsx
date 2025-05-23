import React, { useState } from 'react';
import { Globe, Instagram, Twitter, Linkedin, Github as GitHub, Link as LinkIcon, Plus, X } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import type { Database } from '../../lib/database.types';

type Link = Database['public']['Tables']['links']['Row'];

interface SocialLinksProps {
  links: Link[];
  onLinksChange: (links: Link[]) => void;
}

const platforms = [
  { value: 'custom', label: 'Custom Link', icon: Globe },
  { value: 'instagram', label: 'Instagram', icon: Instagram },
  { value: 'twitter', label: 'Twitter', icon: Twitter },
  { value: 'linkedin', label: 'LinkedIn', icon: Linkedin },
  { value: 'github', label: 'GitHub', icon: GitHub },
];

export const SocialLinks: React.FC<SocialLinksProps> = ({ links, onLinksChange }) => {
  const [error, setError] = useState('');

  const validateUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleAddLink = () => {
    const newLink: Partial<Link> = {
      platform: 'custom',
      label: '',
      url: '',
      sort_order: links.length,
      is_active: true
    };
    onLinksChange([...links, newLink as Link]);
  };

  const handleUpdateLink = (index: number, field: keyof Link, value: string) => {
    const updatedLinks = [...links];
    updatedLinks[index] = {
      ...updatedLinks[index],
      [field]: value
    };

    if (field === 'url' && !validateUrl(value)) {
      setError('Please enter a valid URL');
      return;
    }
    setError('');
    onLinksChange(updatedLinks);
  };

  const handleRemoveLink = (index: number) => {
    const updatedLinks = links.filter((_, i) => i !== index);
    onLinksChange(updatedLinks);
  };

  const PlatformIcon = ({ platform }: { platform: string }) => {
    const platformConfig = platforms.find(p => p.value === platform);
    const Icon = platformConfig?.icon || LinkIcon;
    return <Icon size={18} />;
  };

  return (
    <div className="space-y-4">
      {links.map((link, index) => (
        <div key={index} className="flex items-start gap-4 bg-gray-50 p-4 rounded-lg">
          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
            <select
              value={link.platform}
              onChange={(e) => handleUpdateLink(index, 'platform', e.target.value)}
              className="rounded-lg border border-gray-300 px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
            >
              {platforms.map((platform) => (
                <option key={platform.value} value={platform.value}>
                  {platform.label}
                </option>
              ))}
            </select>

            <Input
              value={link.label}
              onChange={(e) => handleUpdateLink(index, 'label', e.target.value)}
              placeholder="Link Label"
              className="md:col-span-1"
            />

            <Input
              value={link.url}
              onChange={(e) => handleUpdateLink(index, 'url', e.target.value)}
              placeholder="https://"
              leftIcon={<PlatformIcon platform={link.platform} />}
              error={error}
              className="md:col-span-1"
            />
          </div>

          <button
            onClick={() => handleRemoveLink(index)}
            className="text-gray-400 hover:text-red-600"
          >
            <X size={20} />
          </button>
        </div>
      ))}

      <Button
        onClick={handleAddLink}
        variant="secondary"
        leftIcon={<Plus size={16} />}
      >
        Add Link
      </Button>
    </div>
  );
};