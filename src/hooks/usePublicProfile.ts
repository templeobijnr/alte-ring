import { useState, useEffect } from 'react';
import { profileApi } from '../lib/api';
import type { Database } from '../lib/database.types';

type Profile = Database['public']['Tables']['profiles']['Row'] & {
  links?: Database['public']['Tables']['links']['Row'][];
};

export function usePublicProfile(username: string) {
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
        const data = await profileApi.getPublicProfile(username.trim().toLowerCase());
        
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

  return {
    profile,
    loading,
    error
  };
}