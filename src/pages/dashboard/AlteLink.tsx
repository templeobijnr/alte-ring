import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Plus, Eye, Copy, QrCode, ExternalLink } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useOwnProfile } from '../../hooks/useOwnProfile';
import Card, { CardHeader, CardContent } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { SortableLink } from '../../components/alte/SortableLink';
import QRCodeModal from '../../components/profile/QRCodeModal';

const AlteLink: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { 
    profile, 
    loading, 
    error,
    updateProfile,
    addLink,
    updateLink,
    deleteLink,
    reorderLinks
  } = useOwnProfile(user?.id || '');
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Only redirect once we're sure:
  // - user.id exists
  // - loading is false
  // - no profile was found
  useEffect(() => {
    if (user?.id && !loading && !profile && error === 'Profile not found') {
      navigate('/dashboard/profile');
    }
  }, [user?.id, loading, profile, error, navigate]);

  const handleDragEnd = async (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id && profile?.links) {
      const oldIndex = profile.links.findIndex(link => link.id === active.id);
      const newIndex = profile.links.findIndex(link => link.id === over.id);
      const newLinks = arrayMove(profile.links, oldIndex, newIndex);
      try {
        await reorderLinks(newLinks);
      } catch (err) {
        console.error('Error reordering links:', err);
      }
    }
  };

  const handleAddLink = async () => {
    if (!profile) return;
    try {
      await addLink({
        profile_id: profile.id,
        platform: 'custom',
        label: 'New Link',
        url: '',
        sort_order: profile.links?.length || 0,
        is_active: true
      });
    } catch (err) {
      console.error('Error adding link:', err);
    }
  };

  const handleUpdateLink = async (id: string, field: 'platform' | 'label' | 'url', value: string) => {
    try {
      await updateLink(id, { [field]: value });
    } catch (err) {
      console.error('Error updating link:', err);
    }
  };

  const handleRemoveLink = async (id: string) => {
    try {
      await deleteLink(id);
    } catch (err) {
      console.error('Error removing link:', err);
    }
  };

  const handleSaveChanges = async () => {
    if (!profile) return;
    setIsSaving(true);
    try {
      await updateProfile({
        theme: { ...profile.theme }
      });
    } catch (err) {
      console.error('Error saving changes:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const copyProfileUrl = () => {
    const url = `${window.location.origin}/u/${profile?.username}`;
    navigator.clipboard.writeText(url);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600" />
      </div>
    );
  }

  if (error && error !== 'Profile not found') {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">{error}</p>
        <Button variant="secondary" onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </div>
    );
  }

  if (!profile) {
    return null;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Alté Link</h1>
        <p className="text-gray-600">Customize your public profile and manage your links</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Info */}
          <Card>
            <CardHeader 
              title="Profile Information" 
              subtitle="Your public profile details"
            />
            <CardContent className="space-y-6">
              <Input
                label="Display Name"
                value={profile.full_name || ''}
                onChange={(e) => updateProfile({ full_name: e.target.value })}
                placeholder="Your name"
              />
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bio
                </label>
                <textarea
                  value={profile.bio || ''}
                  onChange={(e) => updateProfile({ bio: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
                  rows={3}
                  placeholder="Tell others about yourself..."
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={copyProfileUrl}
                    leftIcon={<Copy size={16} />}
                  >
                    Copy Profile URL
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setIsQRModalOpen(true)}
                    leftIcon={<QrCode size={16} />}
                  >
                    Show QR Code
                  </Button>
                </div>
                
                <Button
                  variant="secondary"
                  size="sm"
                  as="a"
                  href={`/u/${profile.username}`}
                  target="_blank"
                  leftIcon={<ExternalLink size={16} />}
                >
                  Preview Profile
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Links */}
          <Card>
            <CardHeader 
              title="Your Links" 
              subtitle="Add and arrange your social links"
              action={
                <Button
                  onClick={handleAddLink}
                  leftIcon={<Plus size={16} />}
                >
                  Add Link
                </Button>
              }
            />
            <CardContent>
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={profile.links || []}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="space-y-4">
                    {profile.links?.map((link) => (
                      <SortableLink
                        key={link.id}
                        link={link}
                        onUpdate={handleUpdateLink}
                        onRemove={handleRemoveLink}
                      />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>

              {(!profile.links || profile.links.length === 0) && (
                <div className="text-center py-8 text-gray-500">
                  <p>No links added yet. Click "Add Link" to get started.</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button
              onClick={handleSaveChanges}
              isLoading={isSaving}
            >
              Save Changes
            </Button>
          </div>
        </div>

        {/* Preview */}
        <div className="lg:col-span-1">
          <div className="sticky top-6">
            <Card>
              <CardHeader 
                title="Live Preview"
                subtitle="See how your profile looks"
                action={
                  <Button 
                    variant="secondary" 
                    size="sm"
                    as="a"
                    href={`/u/${profile.username}`}
                    target="_blank"
                    leftIcon={<Eye size={16} />}
                  >
                    Full Preview
                  </Button>
                }
              />
              <CardContent>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="aspect-[9/16] bg-dark-900 p-6">
                    <div className="flex flex-col items-center">
                      {profile.avatar_url ? (
                        <img 
                          src={profile.avatar_url}
                          alt={profile.full_name || profile.username}
                          className="w-24 h-24 rounded-full object-cover mb-4"
                        />
                      ) : (
                        <div className="w-24 h-24 bg-dark-800 rounded-full mb-4 flex items-center justify-center">
                          <span className="text-3xl font-bold text-gray-400">
                            {(profile.full_name || profile.username || '?').charAt(0)}
                          </span>
                        </div>
                      )}
                      <h3 className="text-xl font-bold text-white mb-1">
                        {profile.full_name || profile.username}
                      </h3>
                      <p className="text-sm text-gray-400 text-center mb-6">
                        {profile.bio || 'Your bio will appear here'}
                      </p>
                      
                      <div className="w-full space-y-3">
                        {profile.links?.map(link => (
                          <div
                            key={link.id}
                            className="w-full bg-dark-800 text-white rounded-lg p-3 flex items-center"
                          >
                            <span className="flex-1">{link.label}</span>
                            <ExternalLink size={16} className="text-gray-400" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* QR Code Modal */}
      <QRCodeModal
        url={`${window.location.origin}/u/${profile.username}`}
        isOpen={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
      />
    </div>
  );
};

export default AlteLink;