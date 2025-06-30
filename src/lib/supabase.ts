import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Helper function to get current user's tenant
export const getCurrentUserTenant = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from('user_profiles')
    .select('tenant_id, tenants(*)')
    .eq('id', user.id)
    .single();

  return profile;
};

// Helper function to check user role
export const checkUserRole = async (requiredRoles: string[]) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;

  const { data: profile } = await supabase
    .from('user_profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  return profile && requiredRoles.includes(profile.role);
};

// Helper function for tenant-aware queries
export const createTenantQuery = <T>(
  tableName: string,
  tenantId?: string
) => {
  const query = supabase.from(tableName);
  
  if (tenantId) {
    return query.eq('tenant_id', tenantId);
  }
  
  return query;
};