import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { PostgrestFilterBuilder } from '@supabase/postgrest-js';

interface UseSupabaseQueryOptions {
  enabled?: boolean;
  refetchOnMount?: boolean;
}

export function useSupabaseQuery<T>(
  queryFn: () => PostgrestFilterBuilder<any, any, T[]>,
  dependencies: any[] = [],
  options: UseSupabaseQueryOptions = {}
) {
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const { enabled = true, refetchOnMount = true } = options;

  const fetchData = async () => {
    if (!enabled) return;

    try {
      setLoading(true);
      setError(null);
      
      const { data: result, error: queryError } = await queryFn();
      
      if (queryError) throw queryError;
      
      setData(result);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (refetchOnMount) {
      fetchData();
    }
  }, [enabled, ...dependencies]);

  const refetch = () => {
    fetchData();
  };

  return {
    data,
    loading,
    error,
    refetch,
  };
}

export function useSupabaseSubscription<T>(
  tableName: string,
  filter?: string,
  callback?: (payload: any) => void
) {
  useEffect(() => {
    const channel = supabase
      .channel(`${tableName}_changes`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: tableName,
          filter: filter,
        },
        (payload) => {
          if (callback) {
            callback(payload);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [tableName, filter]);
}