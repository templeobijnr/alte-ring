import React, { useState } from 'react';
import { Cloud, X } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';

interface CloudStorageInputProps {
  links: string[];
  onChange: (links: string[]) => void;
}

export const CloudStorageInput: React.FC<CloudStorageInputProps> = ({ links, onChange }) => {
  const [newLink, setNewLink] = useState('');
  const [error, setError] = useState('');

  const validateUrl = (url: string) => {
    const pattern = /^https?:\/\/(drive\.google\.com|www\.dropbox\.com|onedrive\.live\.com).*/i;
    return pattern.test(url);
  };

  const handleAdd = () => {
    if (!newLink) {
      setError('Please enter a URL');
      return;
    }

    if (!validateUrl(newLink)) {
      setError('Please enter a valid Google Drive, Dropbox, or OneDrive URL');
      return;
    }

    if (links.length >= 10) {
      setError('Maximum 10 cloud storage links allowed');
      return;
    }

    onChange([...links, newLink]);
    setNewLink('');
    setError('');
  };

  const handleRemove = (index: number) => {
    const newLinks = [...links];
    newLinks.splice(index, 1);
    onChange(newLinks);
  };

  return (
    <div className="space-y-4">
      <div>
        <Input
          label="Add Cloud Storage Link"
          placeholder="Paste your cloud storage share link"
          value={newLink}
          onChange={(e) => {
            setNewLink(e.target.value);
            setError('');
          }}
          error={error}
          leftIcon={<Cloud size={18} />}
          helperText="Get shareable link from your cloud storage service settings"
        />
        <Button
          onClick={handleAdd}
          variant="secondary"
          className="mt-2"
        >
          Add Link
        </Button>
      </div>

      {links.length > 0 && (
        <div className="space-y-2">
          {links.map((link, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-700 truncate mr-2"
              >
                {link}
              </a>
              <button
                onClick={() => handleRemove(index)}
                className="text-gray-400 hover:text-red-600"
              >
                <X size={18} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};