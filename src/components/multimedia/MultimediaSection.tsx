import React from 'react';
import Card, { CardHeader, CardContent } from '../ui/Card';
import { CloudStorageInput } from './CloudStorageInput';
import { YouTubeInput } from './YouTubeInput';
import { SpotifyInput } from './SpotifyInput';
import { AppleMusicInput } from './AppleMusicInput';

interface MultimediaSectionProps {
  cloudStorage: string[];
  youtubeVideos: string[];
  spotifyTracks: string[];
  appleMusicTracks: string[];
  onCloudStorageChange: (links: string[]) => void;
  onYouTubeChange: (links: string[]) => void;
  onSpotifyChange: (links: string[]) => void;
  onAppleMusicChange: (links: string[]) => void;
}

export const MultimediaSection: React.FC<MultimediaSectionProps> = ({
  cloudStorage,
  youtubeVideos,
  spotifyTracks,
  appleMusicTracks,
  onCloudStorageChange,
  onYouTubeChange,
  onSpotifyChange,
  onAppleMusicChange,
}) => {
  return (
    <div className="space-y-6">
      {/* Cloud Storage */}
      <Card>
        <CardHeader
          title="Cloud Storage"
          subtitle="Share files from Google Drive, Dropbox, or OneDrive"
        />
        <CardContent>
          <CloudStorageInput
            links={cloudStorage}
            onChange={onCloudStorageChange}
          />
        </CardContent>
      </Card>

      {/* YouTube Videos */}
      <Card>
        <CardHeader
          title="YouTube Videos"
          subtitle="Share your favorite YouTube videos"
        />
        <CardContent>
          <YouTubeInput
            links={youtubeVideos}
            onChange={onYouTubeChange}
          />
        </CardContent>
      </Card>

      {/* Spotify */}
      <Card>
        <CardHeader
          title="Spotify"
          subtitle="Share your music from Spotify"
        />
        <CardContent>
          <SpotifyInput
            links={spotifyTracks}
            onChange={onSpotifyChange}
          />
        </CardContent>
      </Card>

      {/* Apple Music */}
      <Card>
        <CardHeader
          title="Apple Music"
          subtitle="Share your music from Apple Music"
        />
        <CardContent>
          <AppleMusicInput
            links={appleMusicTracks}
            onChange={onAppleMusicChange}
          />
        </CardContent>
      </Card>
    </div>
  );
};