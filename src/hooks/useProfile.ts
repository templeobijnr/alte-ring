import { useState, useEffect } from 'react';
import { profileApi, linkApi } from '../lib/api';
import type { Profile, Link } from '../lib/database.types';

export function useProfile(username: string) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProfile() {
      if (!username?.trim()) {
        setError('Username is required');
        setProfile(null);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const data = await profileApi.getProfile(username.trim().toLowerCase());
        
        if (!data) {
          setError('Profile not found');
          setProfile(null);
        } else {
          setProfile(data);
          setError(null);
        }
      } catch (err) {
        console.error('Error loading profile:', err);
        setError('Failed to load profile');
        setProfile(null);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [username]);

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!profile) return;
    try {
      const updated = await profileApi.updateProfile(updates);
      setProfile(updated);
      return updated;
    } catch (err) {
      console.error('Error updating profile:', err);
      throw err;
    }
  };

  const addLink = async (link: Omit<Link, 'id' | 'created_at' | 'updated_at'>) => {
    if (!profile) return;
    try {
      const newLink = await linkApi.createLink(link);
      setProfile(prev => prev ? {
        ...prev,
        links: [...(prev.links || []), newLink]
      } : null);
      return newLink;
    } catch (err) {
      console.error('Error adding link:', err);
      throw err;
    }
  };

  const updateLink = async (id: string, updates: Partial<Link>) => {
    if (!profile) return;
    try {
      const updated = await linkApi.updateLink(id, updates);
      setProfile(prev => prev ? {
        ...prev,
        links: prev.links?.map(link => 
          link.id === id ? updated : link
        )
      } : null);
      return updated;
    } catch (err) {
      console.error('Error updating link:', err);
      throw err;
    }
  };

  const deleteLink = async (id: string) => {
    if (!profile) return;
    try {
      await linkApi.deleteLink(id);
      setProfile(prev => prev ? {
        ...prev,
        links: prev.links?.filter(link => link.id !== id)
      } : null);
    } catch (err) {
      console.error('Error deleting link:', err);
      throw err;
    }
  };

  const reorderLinks = async (orderedLinks: Link[]) => {
    if (!profile) return;
    try {
      const updates = orderedLinks.map((link, index) => ({
        id: link.id,
        link_order: index
      }));
      await linkApi.reorderLinks(updates);
      setProfile(prev => prev ? {
        ...prev,
        links: orderedLinks
      } : null);
    } catch (err) {
      console.error('Error reordering links:', err);
      throw err;
    }
  };

  return {
    profile,
    loading,
    error,
    updateProfile,
    addLink,
    updateLink,
    deleteLink,
    reorderLinks
  };
}