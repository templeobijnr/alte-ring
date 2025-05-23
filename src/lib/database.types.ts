export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          user_id: string
          username: string
          full_name: string | null
          avatar_url: string | null
          bio: string | null
          location: string | null
          theme: Json | null
          is_public: boolean
          cloud_storage: string[]
          youtube_videos: string[]
          spotify_tracks: string[]
          apple_music_tracks: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          username: string
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          location?: string | null
          theme?: Json | null
          is_public?: boolean
          cloud_storage?: string[]
          youtube_videos?: string[]
          spotify_tracks?: string[]
          apple_music_tracks?: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          username?: string
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          location?: string | null
          theme?: Json | null
          is_public?: boolean
          cloud_storage?: string[]
          youtube_videos?: string[]
          spotify_tracks?: string[]
          apple_music_tracks?: string[]
          created_at?: string
          updated_at?: string
        }
      }
      links: {
        Row: {
          id: string
          profile_id: string
          platform: string
          label: string
          url: string
          sort_order: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          profile_id: string
          platform: string
          label: string
          url: string
          sort_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          profile_id?: string
          platform?: string
          label?: string
          url?: string
          sort_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      profile_views: {
        Row: {
          id: string
          profile_id: string
          ip_address: string
          user_agent: string | null
          location: string | null
          created_at: string
        }
        Insert: {
          id?: string
          profile_id: string
          ip_address: string
          user_agent?: string | null
          location?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          profile_id?: string
          ip_address?: string
          user_agent?: string | null
          location?: string | null
          created_at?: string
        }
      }
      link_clicks: {
        Row: {
          id: string
          link_id: string
          ip_address: string
          user_agent: string | null
          created_at: string
        }
        Insert: {
          id?: string
          link_id: string
          ip_address: string
          user_agent?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          link_id?: string
          ip_address?: string
          user_agent?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}