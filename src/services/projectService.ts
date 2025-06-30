import { supabase } from '../lib/supabase';
import { Database } from '../lib/database.types';

type Project = Database['public']['Tables']['projects']['Row'];

export class ProjectService {
  static async getProjects(tenantId: string, filters?: {
    status?: string;
    project_type?: string;
    creator_id?: string;
  }) {
    let query = supabase
      .from('projects')
      .select(`
        *,
        user_profiles!projects_creator_id_fkey (
          full_name,
          avatar_url
        ),
        project_members (
          user_id,
          role,
          user_profiles (
            full_name,
            avatar_url
          )
        )
      `)
      .eq('tenant_id', tenantId);

    if (filters?.status) {
      query = query.eq('status', filters.status);
    }
    if (filters?.project_type) {
      query = query.eq('project_type', filters.project_type);
    }
    if (filters?.creator_id) {
      query = query.eq('creator_id', filters.creator_id);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  static async createProject(projectData: {
    tenant_id: string;
    creator_id: string;
    title: string;
    description?: string;
    project_type?: string;
    subject_areas?: string[];
    difficulty_level?: number;
    estimated_duration_days?: number;
    max_team_size?: number;
    skills_required?: string[];
    skills_gained?: string[];
    resources?: any;
    due_date?: string;
  }) {
    const { data, error } = await supabase
      .from('projects')
      .insert(projectData)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async joinProject(projectId: string, userId: string, tenantId: string, role: string = 'member') {
    const { data, error } = await supabase
      .from('project_members')
      .insert({
        project_id: projectId,
        user_id: userId,
        tenant_id: tenantId,
        role: role,
        status: 'active',
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async getProjectMembers(projectId: string) {
    const { data, error } = await supabase
      .from('project_members')
      .select(`
        *,
        user_profiles (
          full_name,
          avatar_url,
          role as user_role,
          grade_level
        )
      `)
      .eq('project_id', projectId)
      .eq('status', 'active')
      .order('joined_at');

    if (error) throw error;
    return data;
  }

  static async updateProject(projectId: string, updates: Partial<Project>) {
    const { data, error } = await supabase
      .from('projects')
      .update(updates)
      .eq('id', projectId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async getProjectTemplates(tenantId: string, category?: string) {
    let query = supabase
      .from('projects')
      .select('*')
      .eq('tenant_id', tenantId)
      .eq('is_template', true)
      .eq('status', 'published');

    if (category) {
      query = query.eq('template_category', category);
    }

    const { data, error } = await query.order('title');

    if (error) throw error;
    return data;
  }

  static async searchProjects(tenantId: string, searchTerm: string, filters?: {
    subject_areas?: string[];
    difficulty_level?: number;
    project_type?: string;
  }) {
    let query = supabase
      .from('projects')
      .select(`
        *,
        user_profiles!projects_creator_id_fkey (
          full_name,
          avatar_url
        )
      `)
      .eq('tenant_id', tenantId)
      .eq('status', 'published')
      .or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`);

    if (filters?.subject_areas && filters.subject_areas.length > 0) {
      query = query.overlaps('subject_areas', filters.subject_areas);
    }
    if (filters?.difficulty_level) {
      query = query.eq('difficulty_level', filters.difficulty_level);
    }
    if (filters?.project_type) {
      query = query.eq('project_type', filters.project_type);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }
}