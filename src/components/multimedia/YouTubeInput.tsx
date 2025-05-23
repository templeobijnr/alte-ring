import React, { useState } from 'react';
import { Youtube, X } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';

interface YouTubeInputProps {
  links: string[];
  onChange: (links: string[]) => void;
}

export const YouTubeInput: React.FC<YouTubeInputProps> = ({ links, onChange }) => {
  const [newLink, setNewLink] = useState('');
  const [error, setError] = useState('');

  const validateUrl = (url: string) => {
    const pattern = /^https?:\/\/(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11}).*/i;
    return pattern.test(url);
  };

  const getVideoId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : null;
  };

  const handleAdd = () => {
    if (!newLink) {
      setError('Please enter a URL');
      return;
    }

    if (!validateUrl(newLink)) {
      setError('Please enter a valid YouTube video URL');
      return;
    }

    if (links.length >= 5) {
      setError('Maximum 5 YouTube videos allowed');
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
          label="Add YouTube Video"
          placeholder="Paste YouTube video URL"
          value={newLink}
          onChange={(e) => {
            setNewLink(e.target.value);
            setError('');
          }}
          error={error}
          leftIcon={<Youtube size={18} />}
          helperText="Copy URL from YouTube video share button or browser address bar"
        />
        <Button
          onClick={handleAdd}
          variant="secondary"
          className="mt-2"
        >
          Add Video
        </Button>
      </div>

      {links.length > 0 && (
        <div className="space-y-4">
          {links.map((link, index) => {
            const videoId = getVideoId(link);
            return (
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
                {videoId && (
                  <div className="relative pb-[56.25%] h-0">
                    <iframe
                      src={`https://www.youtube.com/embed/${videoId}`}
                      title="YouTube video player"
                      className="absolute top-0 left-0 w-full h-full rounded-lg"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};