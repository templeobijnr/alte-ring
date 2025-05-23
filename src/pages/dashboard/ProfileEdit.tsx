import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Image as ImageIcon, Trash2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useOwnProfile } from '../../hooks/useOwnProfile';
import Card, { CardHeader, CardContent } from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { MultimediaSection } from '../../components/multimedia/MultimediaSection';
import { SocialLinks } from '../../components/profile/SocialLinks';

const ProfileEdit: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { profile, loading, error, updateProfile } = useOwnProfile(user?.id || '');
  
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [links, setLinks] = useState<any[]>([]);
  const [cloudStorage, setCloudStorage] = useState<string[]>([]);
  const [youtubeVideos, setYoutubeVideos] = useState<string[]>([]);
  const [spotifyTracks, setSpotifyTracks] = useState<string[]>([]);
  const [appleMusicTracks, setAppleMusicTracks] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [saveError, setSaveError] = useState('');

  // Load profile data
  useEffect(() => {
    if (profile) {
      setName(profile.full_name || '');
      setBio(profile.bio || '');
      setAvatarUrl(profile.avatar_url || '');
      setLinks(profile.links || []);
      setCloudStorage(profile.cloud_storage || []);
      setYoutubeVideos(profile.youtube_videos || []);
      setSpotifyTracks(profile.spotify_tracks || []);
      setAppleMusicTracks(profile.apple_music_tracks || []);
    }
  }, [profile]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSaveError('');

    try {
      await updateProfile({
        full_name: name,
        bio,
        avatar_url: avatarUrl,
        links,
        cloud_storage: cloudStorage,
        youtube_videos: youtubeVideos,
        spotify_tracks: spotifyTracks,
        apple_music_tracks: appleMusicTracks,
      });

      // Show success message (could use a toast here)
    } catch (err) {
      console.error('Error updating profile:', err);
      setSaveError('Failed to save changes. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">{error}</p>
        <Button variant="secondary" onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Edit Profile</h1>
        <p className="text-gray-600">Update your personal information and media content</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Info Card */}
        <Card>
          <CardHeader 
            title="Personal Information" 
            subtitle="Your public profile details"
          />
          <CardContent className="space-y-6">
            {/* Profile Photo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Profile Photo
              </label>
              <div className="flex items-center">
                <div className="mr-4">
                  {avatarUrl ? (
                    <img 
                      src={avatarUrl} 
                      alt="Profile" 
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                      <User className="h-8 w-8 text-gray-500" />
                    </div>
                  )}
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    leftIcon={<ImageIcon size={16} />}
                  >
                    Change Photo
                  </Button>
                  {avatarUrl && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      leftIcon={<Trash2 size={16} />}
                      onClick={() => setAvatarUrl('')}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Name and Bio */}
            <Input
              id="name"
              label="Display Name"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                Bio
              </label>
              <textarea
                id="bio"
                rows={3}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                placeholder="Tell others about yourself..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
              <p className="mt-1 text-sm text-gray-500">
                {bio.length}/150 characters
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Social Links Card */}
        <Card>
          <CardHeader 
            title="Social Links" 
            subtitle="Add your social media and professional links"
          />
          <CardContent>
            <SocialLinks 
              links={links}
              onLinksChange={setLinks}
            />
          </CardContent>
        </Card>

        {/* Multimedia Section */}
        <MultimediaSection
          cloudStorage={cloudStorage}
          youtubeVideos={youtubeVideos}
          spotifyTracks={spotifyTracks}
          appleMusicTracks={appleMusicTracks}
          onCloudStorageChange={setCloudStorage}
          onYouTubeChange={setYoutubeVideos}
          onSpotifyChange={setSpotifyTracks}
          onAppleMusicChange={setAppleMusicTracks}
        />

        {/* Error Message */}
        {saveError && (
          <div className="bg-red-50 text-red-700 p-4 rounded-lg">
            {saveError}
          </div>
        )}

        {/* Save Button */}
        <div className="flex justify-end">
          <Button
            type="submit"
            isLoading={isLoading}
          >
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProfileEdit;