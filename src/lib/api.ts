import { supabase } from './supabase';
import type { Database } from './database.types';

type Profile = Database['public']['Tables']['profiles']['Row'] & {
  links?: Database['public']['Tables']['links']['Row'][];
};

export const profileApi = {
  async getOwnProfile(userId: string) {
    if (!userId) {
      console.error('User ID is required for getOwnProfile');
      return null;
    }

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select(`
          *,
          links (*)
        `)
        .eq('user_id', userId)
        .maybeSingle();

      if (error) {
        console.error('Error fetching own profile:', error);
        throw error;
      }

      return data;
    } catch (err) {
      console.error('Failed to fetch own profile:', err);
      throw err;
    }
  },

  async getPublicProfile(username: string) {
    if (!username) {
      console.error('Username is required for getPublicProfile');
      return null;
    }

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select(`
          *,
          links (*)
        `)
        .eq('username', username.toLowerCase())
        .eq('is_public', true)
        .maybeSingle();

      if (error) {
        console.error('Error fetching public profile:', error);
        throw error;
      }

      return data;
    } catch (err) {
      console.error('Failed to fetch public profile:', err);
      throw err;
    }
  },

  async updateProfile(profile: Partial<Profile>) {
    const { data, error } = await supabase
      .from('profiles')
      .update(profile)
      .eq('user_id', supabase.auth.getUser())
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getProfileViews(profileId: string) {
    const { data, error } = await supabase
      .from('profile_views')
      .select('*')
      .eq('profile_id', profileId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }
};

export const linkApi = {
  async getLinks(profileId: string) {
    const { data, error } = await supabase
      .from('links')
      .select('*')
      .eq('profile_id', profileId)
      .order('sort_order', { ascending: true });

    if (error) throw error;
    return data;
  },

  async createLink(link: Omit<Database['public']['Tables']['links']['Insert'], 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('links')
      .insert(link)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateLink(id: string, link: Partial<Database['public']['Tables']['links']['Update']>) {
    const { data, error } = await supabase
      .from('links')
      .update(link)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteLink(id: string) {
    const { error } = await supabase
      .from('links')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  async reorderLinks(links: { id: string; sort_order: number }[]) {
    const { error } = await supabase
      .from('links')
      .upsert(links);

    if (error) throw error;
  },

  async recordClick(linkId: string) {
    const { error } = await supabase
      .from('link_clicks')
      .insert({
        link_id: linkId,
        ip_address: '127.0.0.1', // This should be handled by an edge function
        user_agent: navigator.userAgent
      });

    if (error) throw error;
  }
};