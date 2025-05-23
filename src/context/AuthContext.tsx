import React, { createContext, useContext, useState, useEffect } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, username: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Initial session:', session);
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session);
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);

      if (session?.user) {
        // Check if profile exists
        const { data: existingProfile, error: profileError } = await supabase
          .from('profiles')
          .select('id')
          .eq('user_id', session.user.id)
          .maybeSingle();

        if (profileError) {
          console.error('Error checking profile existence:', profileError);
          return;
        }

        if (!existingProfile) {
          // Create profile if it doesn't exist
          console.log('Creating profile for user:', session.user.id);
          const username = localStorage.getItem('newUsername');
          if (username) {
            await createProfile(session.user, username);
            localStorage.removeItem('newUsername'); // Clear the stored username
          }
        }
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const createProfile = async (user: User, username: string) => {
    try {
      console.log('[createProfile] Starting profile creation for:', { userId: user.id, username });

      // First check if username is still available
      const { data: existingUsername, error: usernameError } = await supabase
        .from('profiles')
        .select('id')
        .eq('username', username.toLowerCase())
        .maybeSingle();

      if (usernameError) {
        console.error('[createProfile] Error checking username:', usernameError);
        throw new Error('Failed to check username availability');
      }

      if (existingUsername) {
        console.error('[createProfile] Username is taken:', username);
        throw new Error('Username is already taken');
      }

      // Create the profile
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .insert({
          user_id: user.id,
          username: username.toLowerCase(),
          full_name: user.user_metadata?.full_name || '',
          theme: {
            layout: 'minimal',
            primaryColor: '#3b5cff',
            buttonStyle: 'filled',
          },
          is_public: true,
          cloud_storage: [],
          youtube_videos: [],
          spotify_tracks: [],
          apple_music_tracks: [],
        })
        .select()
        .single();

      if (profileError) {
        console.error('[createProfile] Error creating profile:', profileError);
        throw new Error(`Failed to create profile: ${profileError.message}`);
      }

      console.log('[createProfile] Profile created successfully:', profile);
      return profile;

    } catch (error) {
      console.error('[createProfile] Error in createProfile function:', error);
      throw error;
    }
  };
  
  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      console.log('Attempting login for email:', email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.toLowerCase().trim(),
        password,
      });

      console.log('LOGIN RESPONSE →', { data, error });

      if (error) throw error;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  const signup = async (email: string, password: string, username: string) => {
    try {
      setLoading(true);
      console.log('[Signup Step 1] Starting signup process for:', { email, username });
      
      // First check if username is available
      const { data: existingProfile, error: usernameError } = await supabase
        .from('profiles')
        .select('username')
        .eq('username', username.toLowerCase())
        .maybeSingle();

      console.log('[Signup Step 2] Username check result:', { existingProfile, usernameError });

      if (usernameError) {
        console.error('[Signup Error] Failed to check username:', usernameError);
        throw new Error('Failed to check username availability');
      }
      
      if (existingProfile) {
        console.error('[Signup Error] Username is taken:', username);
        throw new Error('Username is already taken');
      }

      // Store username for profile creation after signup
      localStorage.setItem('newUsername', username);

      // Create auth user
      console.log('[Signup Step 3] Creating auth user for:', email);
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: email.toLowerCase().trim(),
        password,
      });

      console.log('[Signup Step 4] Auth signup response:', { 
        userId: data?.user?.id,
        error: signUpError 
      });

      if (signUpError) throw signUpError;
      if (!data.user) throw new Error('Signup failed: No user returned');

    } catch (error) {
      console.error('[Signup Error] Signup process failed:', error);
      localStorage.removeItem('newUsername'); // Clean up on error
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  const logout = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        login,
        signup,
        logout,
        isAuthenticated: !!session,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};