import React, { useState } from 'react';
import { Music, X } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';

interface SpotifyInputProps {
  links: string[];
  onChange: (links: string[]) => void;
}

export const SpotifyInput: React.FC<SpotifyInputProps> = ({ links, onChange }) => {
  const [newLink, setNewLink] = useState('');
  const [error, setError] = useState('');

  const validateUrl = (url: string) => {
    const pattern = /^https?:\/\/open\.spotify\.com\/(track|album|playlist)\/[a-zA-Z0-9]+.*/i;
    return pattern.test(url);
  };

  const getEmbedUrl = (url: string) => {
    return url.replace('open.spotify.com', 'open.spotify.com/embed');
  };

  const handleAdd = () => {
    if (!newLink) {
      setError('Please enter a URL');
      return;
    }

    if (!validateUrl(newLink)) {
      setError('Please enter a valid Spotify track or album URL');
      return;
    }

    if (links.length >= 5) {
      setError('Maximum 5 Spotify tracks allowed');
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
          label="Add Spotify Track"
          placeholder="Paste Spotify track or album link"
          value={newLink}
          onChange={(e) => {
            setNewLink(e.target.value);
            setError('');
          }}
          error={error}
          leftIcon={<Music size={18} />}
          helperText="Click share button on Spotify and copy link"
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
                height="152"
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