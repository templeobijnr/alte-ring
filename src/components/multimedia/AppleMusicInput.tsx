import React, { useState } from 'react';
import { Music2, X } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';

interface AppleMusicInputProps {
  links: string[];
  onChange: (links: string[]) => void;
}

export const AppleMusicInput: React.FC<AppleMusicInputProps> = ({ links, onChange }) => {
  const [newLink, setNewLink] = useState('');
  const [error, setError] = useState('');

  const validateUrl = (url: string) => {
    const pattern = /^https?:\/\/music\.apple\.com\/.*/i;
    return pattern.test(url);
  };

  const getEmbedUrl = (url: string) => {
    return url.replace('music.apple.com', 'embed.music.apple.com');
  };

  const handleAdd = () => {
    if (!newLink) {
      setError('Please enter a URL');
      return;
    }

    if (!validateUrl(newLink)) {
      setError('Please enter a valid Apple Music track or album URL');
      return;
    }

    if (links.length >= 5) {
      setError('Maximum 5 Apple Music tracks allowed');
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
          label="Add Apple Music Track"
          placeholder="Paste Apple Music track or album link"
          value={newLink}
          onChange={(e) => {
            setNewLink(e.target.value);
            setError('');
          }}
          error={error}
          leftIcon={<Music2 size={18} />}
          helperText="Click share button on Apple Music and copy link"
        />
        <Button
          onClick={handleAdd}
          variant="secondary"
          className="mt-2"
        >
          Add Track
        </Button>
      </div>

      {links.length > 0 && (
        <div className="space-y-4">
          {links.map((link, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
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
              <iframe
                src={getEmbedUrl(link)}
                width="100%"
                height="150"
                frameBorder="0"
                allow="encrypted-media"
                className="rounded-lg"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};