import { supabase } from '../lib/supabase';
import { Database } from '../lib/database.types';

type Achievement = Database['public']['Tables']['achievements']['Row'];
type UserAchievement = Database['public']['Tables']['user_achievements']['Row'];

export class GamificationService {
  static async getUserAchievements(userId: string, tenantId: string) {
    try {
      // Validate input parameters
      if (!userId || !tenantId) {
        throw new Error('Missing required parameters: userId or tenantId');
      }

      // Validate UUID format
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      if (!uuidRegex.test(userId) || !uuidRegex.test(tenantId)) {
        throw new Error('Invalid UUID format for userId or tenantId');
      }

      const { data, error } = await supabase
        .from('user_achievements')
        .select(`
          *,
          achievements (
            title,
            description,
            icon,
            category,
            rarity,
            points_value
          )
        `)
        .eq('user_id', userId)
        .eq('tenant_id', tenantId)
        .order('earned_at', { ascending: false });

      if (error) {
        console.error('Supabase error in getUserAchievements:', error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error fetching user achievements:', error);
      return null;
    }
  }

  static async getAvailableAchievements(tenantId: string) {
    try {
      // Validate input parameters
      if (!tenantId) {
        throw new Error('Missing required parameter: tenantId');
      }

      // Validate UUID format
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      if (!uuidRegex.test(tenantId)) {
        throw new Error('Invalid UUID format for tenantId');
      }

      const { data, error } = await supabase
        .from('achievements')
        .select('*')
        .eq('tenant_id', tenantId)
        .eq('is_active', true)
        .order('category', { ascending: true });

      if (error) {
        console.error('Supabase error in getAvailableAchievements:', error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error fetching available achievements:', error);
      return null;
    }
  }

  static async awardAchievement(
    userId: string,
    achievementId: string,
    tenantId: string,
    progressData?: any
  ) {
    try {
      // Validate input parameters
      if (!userId || !achievementId || !tenantId) {
        throw new Error('Missing required parameters');
      }

      // Validate UUID format
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      if (!uuidRegex.test(userId) || !uuidRegex.test(achievementId) || !uuidRegex.test(tenantId)) {
        throw new Error('Invalid UUID format');
      }

      const { data, error } = await supabase
        .from('user_achievements')
        .insert({
          user_id: userId,
          achievement_id: achievementId,
          tenant_id: tenantId,
          progress_data: progressData || {},
        })
        .select()
        .single();

      if (error) {
        console.error('Supabase error in awardAchievement:', error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error awarding achievement:', error);
      throw error;
    }
  }

  static async getUserPointsBalance(userId: string, tenantId: string) {
    try {
      // Validate input parameters
      if (!userId || !tenantId) {
        throw new Error('Missing required parameters: userId or tenantId');
      }

      // Validate UUID format
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      if (!uuidRegex.test(userId) || !uuidRegex.test(tenantId)) {
        throw new Error('Invalid UUID format for userId or tenantId');
      }

      const { data, error } = await supabase
        .from('user_points_balance')
        .select('*')
        .eq('user_id', userId)
        .eq('tenant_id', tenantId)
        .maybeSingle();

      if (error) {
        console.error('Supabase error in getUserPointsBalance:', error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error fetching user points balance:', error);
      return null;
    }
  }

  static async addPointsTransaction(
    userId: string,
    tenantId: string,
    transaction: {
      transaction_type: string;
      points_amount: number;
      source_type: string;
      source_id?: string;
      description: string;
      metadata?: any;
    }
  ) {
    try {
      // Validate input parameters
      if (!userId || !tenantId || !transaction) {
        throw new Error('Missing required parameters');
      }

      // Validate UUID format
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      if (!uuidRegex.test(userId) || !uuidRegex.test(tenantId)) {
        throw new Error('Invalid UUID format');
      }

      // Validate transaction data
      const validatedTransaction = {
        ...transaction,
        points_amount: Math.max(0, transaction.points_amount || 0),
        description: transaction.description || 'Points transaction'
      };

      const { data, error } = await supabase
        .from('points_transactions')
        .insert({
          user_id: userId,
          tenant_id: tenantId,
          ...validatedTransaction,
        })
        .select()
        .single();

      if (error) {
        console.error('Supabase error in addPointsTransaction:', error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error adding points transaction:', error);
      throw error;
    }
  }

  static async getLeaderboard(
    tenantId: string,
    type: 'points' | 'achievements' | 'streaks' = 'points',
    limit: number = 10
  ) {
    try {
      // Validate input parameters
      if (!tenantId) {
        throw new Error('Missing required parameter: tenantId');
      }

      // Validate UUID format
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      if (!uuidRegex.test(tenantId)) {
        throw new Error('Invalid UUID format for tenantId');
      }

      // Validate limit
      const validLimit = Math.max(1, Math.min(100, limit));

      const { data, error } = await supabase
        .from('leaderboard_rankings')
        .select('*')
        .eq('tenant_id', tenantId)
        .order(`${type}_rank`, { ascending: true })
        .limit(validLimit);

      if (error) {
        console.error('Supabase error in getLeaderboard:', error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      return null;
    }
  }

  static async updateStreak(
    userId: string,
    tenantId: string,
    streakType: string,
    subjectId?: string
  ) {
    try {
      // Validate input parameters
      if (!userId || !tenantId || !streakType) {
        throw new Error('Missing required parameters');
      }

      // Validate UUID format
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      if (!uuidRegex.test(userId) || !uuidRegex.test(tenantId)) {
        throw new Error('Invalid UUID format');
      }

      if (subjectId && !uuidRegex.test(subjectId)) {
        throw new Error('Invalid UUID format for subjectId');
      }

      const today = new Date().toISOString().split('T')[0];
      
      // Get current streak
      let query = supabase
        .from('streaks')
        .select('*')
        .eq('user_id', userId)
        .eq('tenant_id', tenantId)
        .eq('streak_type', streakType);

      if (subjectId) {
        query = query.eq('subject_id', subjectId);
      }

      const { data: currentStreak } = await query.maybeSingle();

      if (currentStreak) {
        // Update existing streak
        const lastActivity = currentStreak.last_activity_date ? new Date(currentStreak.last_activity_date) : new Date();
        const todayDate = new Date(today);
        const daysDiff = Math.floor((todayDate.getTime() - lastActivity.getTime()) / (1000 * 60 * 60 * 24));

        let newCount = Math.max(0, currentStreak.current_count || 0);
        let isActive = true;

        if (daysDiff === 1) {
          // Consecutive day
          newCount += 1;
        } else if (daysDiff > 1) {
          // Streak broken
          newCount = 1;
        }
        // If daysDiff === 0, same day, no change needed

        const { data, error } = await supabase
          .from('streaks')
          .update({
            current_count: newCount,
            longest_count: Math.max(newCount, currentStreak.longest_count || 0),
            last_activity_date: today,
            is_active: isActive,
          })
          .eq('id', currentStreak.id)
          .select()
          .single();

        if (error) {
          console.error('Supabase error in updateStreak (update):', error);
          throw error;
        }

        return data;
      } else {
        // Create new streak
        const { data, error } = await supabase
          .from('streaks')
          .insert({
            user_id: userId,
            tenant_id: tenantId,
            streak_type: streakType,
            subject_id: subjectId,
            current_count: 1,
            longest_count: 1,
            last_activity_date: today,
            streak_start_date: today,
            is_active: true,
          })
          .select()
          .single();

        if (error) {
          console.error('Supabase error in updateStreak (insert):', error);
          throw error;
        }

        return data;
      }
    } catch (error) {
      console.error('Error updating streak:', error);
      throw error;
    }
  }
}