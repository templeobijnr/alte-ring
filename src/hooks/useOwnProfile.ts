import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

type Profile = Database['public']['Tables']['profiles']['Row'] & {
  links?: Database['public']['Tables']['links']['Row'][];
};

export function useOwnProfile(userId: string) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      console.log('No user ID provided to useOwnProfile');
      setProfile(null);
      setError(null);
      setLoading(false);
      return;
    }

    async function fetchProfile() {
      try {
        setLoading(true);
        console.log('Fetching profile for user ID:', userId);
        
        const { data, error: fetchError } = await supabase
          .from('profiles')
          .select(`
            *,
            links (*)
          `)
          .eq('user_id', userId)
          .maybeSingle();

        console.log('FETCH OWN PROFILE →', { data, fetchError });

        if (fetchError) {
          console.error('Error fetching profile:', fetchError);
          setError(fetchError.message);
          setProfile(null);
        } else if (!data) {
          console.log('No profile found for user ID:', userId);
          setError('Profile not found');
          setProfile(null);
        } else {
          console.log('Profile found:', data);
          setProfile(data);
          setError(null);
        }
      } catch (err) {
        console.error('Error in useOwnProfile:', err);
        setError('Failed to load profile');
        setProfile(null);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [userId]);

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!profile) return null;
    
    try {
      console.log('Updating profile with:', updates);
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', profile.id)
        .select()
        .single();

      if (error) {
        console.error('Error updating profile:', error);
        throw error;
      }

      console.log('PROFILE UPDATE →', { data, error });
      
      setProfile(prev => prev ? { ...prev, ...data } : data);
      return data;
    } catch (err) {
      console.error('Error updating profile:', err);
      throw err;
    }
  };

  const addLink = async (link: Omit<Database['public']['Tables']['links']['Insert'], 'id' | 'created_at' | 'updated_at'>) => {
    if (!profile) return null;
    
    try {
      console.log('Adding link:', link);
      const { data, error } = await supabase
        .from('links')
        .insert(link)
        .select()
        .single();

      if (error) {
        console.error('Error adding link:', error);
        throw error;
      }

      console.log('LINK ADD →', { data, error });
      
      setProfile(prev => prev ? {
        ...prev,
        links: [...(prev.links || []), data]
      } : null);
      return data;
    } catch (err) {
      console.error('Error adding link:', err);
      throw err;
    }
  };

  const updateLink = async (id: string, updates: Partial<Database['public']['Tables']['links']['Update']>) => {
    if (!profile) return null;
    
    try {
      console.log('Updating link:', { id, updates });
      const { data, error } = await supabase
        .from('links')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating link:', error);
        throw error;
      }

      console.log('LINK UPDATE →', { data, error });
      
      setProfile(prev => prev ? {
        ...prev,
        links: prev.links?.map(link => 
          link.id === id ? data : link
        )
      } : null);
      return data;
    } catch (err) {
      console.error('Error updating link:', err);
      throw err;
    }
  };

  const deleteLink = async (id: string) => {
    if (!profile) return;
    
    try {
      console.log('Deleting link:', id);
      const { error } = await supabase
        .from('links')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting link:', error);
        throw error;
      }

      console.log('LINK DELETE →', { id, error });
      
      setProfile(prev => prev ? {
        ...prev,
        links: prev.links?.filter(link => link.id !== id)
      } : null);
    } catch (err) {
      console.error('Error deleting link:', err);
      throw err;
    }
  };

  const reorderLinks = async (links: Database['public']['Tables']['links']['Row'][]) => {
    if (!profile) return;
    
    try {
      console.log('Reordering links:', links);
      const updates = links.map((link, index) => ({
        id: link.id,
        sort_order: index
      }));

      const { error } = await supabase
        .from('links')
        .upsert(updates);

      if (error) {
        console.error('Error reordering links:', error);
        throw error;
      }

      console.log('LINKS REORDER →', { updates, error });
      
      setProfile(prev => prev ? {
        ...prev,
        links: links
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