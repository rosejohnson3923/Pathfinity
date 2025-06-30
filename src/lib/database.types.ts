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
      tenants: {
        Row: {
          id: string
          name: string
          slug: string
          domain: string | null
          settings: Json
          subscription_tier: string
          max_users: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          domain?: string | null
          settings?: Json
          subscription_tier?: string
          max_users?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          domain?: string | null
          settings?: Json
          subscription_tier?: string
          max_users?: number
          created_at?: string
          updated_at?: string
        }
      }
      user_profiles: {
        Row: {
          id: string
          tenant_id: string
          email: string
          full_name: string
          avatar_url: string | null
          role: string
          grade_level: string | null
          subjects: string[] | null
          preferences: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          tenant_id: string
          email: string
          full_name: string
          avatar_url?: string | null
          role?: string
          grade_level?: string | null
          subjects?: string[] | null
          preferences?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          tenant_id?: string
          email?: string
          full_name?: string
          avatar_url?: string | null
          role?: string
          grade_level?: string | null
          subjects?: string[] | null
          preferences?: Json
          created_at?: string
          updated_at?: string
        }
      }
      subjects: {
        Row: {
          id: string
          tenant_id: string
          name: string
          code: string
          grade_levels: string[]
          description: string | null
          color: string
          icon: string
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          tenant_id: string
          name: string
          code: string
          grade_levels: string[]
          description?: string | null
          color?: string
          icon?: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          tenant_id?: string
          name?: string
          code?: string
          grade_levels?: string[]
          description?: string | null
          color?: string
          icon?: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      student_progress: {
        Row: {
          id: string
          tenant_id: string
          student_id: string
          subject_id: string
          mastery_group_id: string | null
          skills_topic_id: string | null
          mastery_level: string
          progress_percentage: number
          streak_days: number
          last_activity_date: string | null
          total_time_spent_minutes: number
          lessons_completed: number
          assessments_passed: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          tenant_id: string
          student_id: string
          subject_id: string
          mastery_group_id?: string | null
          skills_topic_id?: string | null
          mastery_level?: string
          progress_percentage?: number
          streak_days?: number
          last_activity_date?: string | null
          total_time_spent_minutes?: number
          lessons_completed?: number
          assessments_passed?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          tenant_id?: string
          student_id?: string
          subject_id?: string
          mastery_group_id?: string | null
          skills_topic_id?: string | null
          mastery_level?: string
          progress_percentage?: number
          streak_days?: number
          last_activity_date?: string | null
          total_time_spent_minutes?: number
          lessons_completed?: number
          assessments_passed?: number
          created_at?: string
          updated_at?: string
        }
      }
      achievements: {
        Row: {
          id: string
          tenant_id: string
          title: string
          description: string
          icon: string
          category: string
          rarity: string
          points_value: number
          criteria: Json
          is_active: boolean
          is_repeatable: boolean
          max_times_earnable: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          tenant_id: string
          title: string
          description: string
          icon: string
          category: string
          rarity?: string
          points_value?: number
          criteria: Json
          is_active?: boolean
          is_repeatable?: boolean
          max_times_earnable?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          tenant_id?: string
          title?: string
          description?: string
          icon?: string
          category?: string
          rarity?: string
          points_value?: number
          criteria?: Json
          is_active?: boolean
          is_repeatable?: boolean
          max_times_earnable?: number
          created_at?: string
          updated_at?: string
        }
      }
      user_achievements: {
        Row: {
          id: string
          tenant_id: string
          user_id: string
          achievement_id: string
          earned_at: string
          progress_data: Json
          times_earned: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          tenant_id: string
          user_id: string
          achievement_id: string
          earned_at?: string
          progress_data?: Json
          times_earned?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          tenant_id?: string
          user_id?: string
          achievement_id?: string
          earned_at?: string
          progress_data?: Json
          times_earned?: number
          created_at?: string
          updated_at?: string
        }
      }
      projects: {
        Row: {
          id: string
          tenant_id: string
          creator_id: string
          title: string
          description: string | null
          project_type: string
          subject_areas: string[] | null
          difficulty_level: number
          estimated_duration_days: number
          max_team_size: number
          skills_required: string[] | null
          skills_gained: string[] | null
          resources: Json
          rubric: Json | null
          status: string
          start_date: string | null
          due_date: string | null
          is_template: boolean
          template_category: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          tenant_id: string
          creator_id: string
          title: string
          description?: string | null
          project_type?: string
          subject_areas?: string[] | null
          difficulty_level?: number
          estimated_duration_days?: number
          max_team_size?: number
          skills_required?: string[] | null
          skills_gained?: string[] | null
          resources?: Json
          rubric?: Json | null
          status?: string
          start_date?: string | null
          due_date?: string | null
          is_template?: boolean
          template_category?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          tenant_id?: string
          creator_id?: string
          title?: string
          description?: string | null
          project_type?: string
          subject_areas?: string[] | null
          difficulty_level?: number
          estimated_duration_days?: number
          max_team_size?: number
          skills_required?: string[] | null
          skills_gained?: string[] | null
          resources?: Json
          rubric?: Json | null
          status?: string
          start_date?: string | null
          due_date?: string | null
          is_template?: boolean
          template_category?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      user_points_balance: {
        Row: {
          user_id: string
          tenant_id: string
          total_points: number
          points_earned: number
          points_spent: number
        }
      }
      leaderboard_rankings: {
        Row: {
          user_id: string
          tenant_id: string
          full_name: string
          avatar_url: string | null
          grade_level: string | null
          total_points: number
          total_achievements: number
          longest_streak: number | null
          points_rank: number
          achievements_rank: number
          streak_rank: number
        }
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}