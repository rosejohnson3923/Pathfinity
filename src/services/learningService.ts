import { supabase } from '../lib/supabase';
import { Database } from '../lib/database.types';

type StudentProgress = Database['public']['Tables']['student_progress']['Row'];
type Subject = Database['public']['Tables']['subjects']['Row'];

export class LearningService {
  static async getStudentProgress(studentId: string, tenantId: string) {
    try {
      // Validate input parameters
      if (!studentId || !tenantId) {
        throw new Error('Missing required parameters: studentId or tenantId');
      }

      // Validate UUID format
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      if (!uuidRegex.test(studentId) || !uuidRegex.test(tenantId)) {
        throw new Error('Invalid UUID format for studentId or tenantId');
      }

      const { data, error } = await supabase
        .from('student_progress')
        .select(`
          *,
          subjects (
            name,
            code,
            color,
            icon
          )
        `)
        .eq('student_id', studentId)
        .eq('tenant_id', tenantId)
        .order('last_activity_date', { ascending: false });

      if (error) {
        console.error('Supabase error in getStudentProgress:', error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error fetching student progress:', error);
      return null;
    }
  }

  static async updateProgress(
    studentId: string,
    subjectId: string,
    tenantId: string,
    updates: {
      progress_percentage?: number;
      mastery_level?: string;
      streak_days?: number;
      total_time_spent_minutes?: number;
      lessons_completed?: number;
    }
  ) {
    try {
      // Validate input parameters
      if (!studentId || !subjectId || !tenantId) {
        throw new Error('Missing required parameters');
      }

      // Validate UUID format
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      if (!uuidRegex.test(studentId) || !uuidRegex.test(subjectId) || !uuidRegex.test(tenantId)) {
        throw new Error('Invalid UUID format');
      }

      // Validate numeric values
      const validatedUpdates = {
        ...updates,
        progress_percentage: updates.progress_percentage !== undefined 
          ? Math.max(0, Math.min(100, updates.progress_percentage)) 
          : undefined,
        streak_days: updates.streak_days !== undefined 
          ? Math.max(0, updates.streak_days) 
          : undefined,
        total_time_spent_minutes: updates.total_time_spent_minutes !== undefined 
          ? Math.max(0, updates.total_time_spent_minutes) 
          : undefined,
        lessons_completed: updates.lessons_completed !== undefined 
          ? Math.max(0, updates.lessons_completed) 
          : undefined,
      };

      const { data, error } = await supabase
        .from('student_progress')
        .upsert({
          student_id: studentId,
          subject_id: subjectId,
          tenant_id: tenantId,
          last_activity_date: new Date().toISOString().split('T')[0],
          ...validatedUpdates,
        })
        .select()
        .single();

      if (error) {
        console.error('Supabase error in updateProgress:', error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error updating progress:', error);
      throw error;
    }
  }

  static async getSubjects(tenantId: string, gradeLevel?: string) {
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

      let query = supabase
        .from('subjects')
        .select('*')
        .eq('tenant_id', tenantId)
        .eq('is_active', true);

      if (gradeLevel && gradeLevel.trim()) {
        query = query.contains('grade_levels', [gradeLevel]);
      }

      const { data, error } = await query.order('name');

      if (error) {
        console.error('Supabase error in getSubjects:', error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error fetching subjects:', error);
      return null;
    }
  }

  static async getLearningPath(studentId: string, subjectId: string) {
    try {
      // Validate input parameters
      if (!studentId || !subjectId) {
        throw new Error('Missing required parameters: studentId or subjectId');
      }

      // Validate UUID format
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      if (!uuidRegex.test(studentId) || !uuidRegex.test(subjectId)) {
        throw new Error('Invalid UUID format');
      }

      const { data, error } = await supabase
        .from('learning_paths')
        .select('*')
        .eq('student_id', studentId)
        .eq('subject_id', subjectId)
        .eq('is_active', true)
        .maybeSingle();

      if (error) {
        console.error('Supabase error in getLearningPath:', error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error fetching learning path:', error);
      return null;
    }
  }

  static async getTodaysLessons(studentId: string, date?: string) {
    try {
      // Validate input parameters
      if (!studentId) {
        throw new Error('Missing required parameter: studentId');
      }

      // Validate UUID format
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      if (!uuidRegex.test(studentId)) {
        throw new Error('Invalid UUID format for studentId');
      }

      // Return mock daily lesson plan with all three modes (2 assignments each)
      const mockLessons = [
        // Learn Mode Lessons (2 assignments)
        {
          id: 'lesson-1',
          tenant_id: '550e8400-e29b-41d4-a716-446655440000',
          student_id: studentId,
          skills_topic_id: 'topic-1',
          lesson_type: 'reinforcement', // Learn Mode
          content: {
            title: 'Algebra Fundamentals Review',
            description: 'Master the basics of algebraic expressions and equations through interactive exercises and visual demonstrations',
            activities: [
              'Solve linear equations step by step',
              'Practice with algebraic expressions',
              'Complete interactive problem sets',
              'Review key concepts with visual aids'
            ]
          },
          difficulty_adjustment: 0,
          estimated_duration_minutes: 35,
          scheduled_date: date ? new Date(date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
          status: 'scheduled',
          completion_percentage: 0,
          time_spent_minutes: 0,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          skills_topics: {
            id: 'topic-1',
            name: 'Algebra Fundamentals Review',
            description: 'Strengthen your understanding of algebraic concepts through comprehensive review and practice exercises designed to build confidence and mastery.',
            learning_objectives: [
              'Solve linear equations with confidence',
              'Simplify algebraic expressions',
              'Apply algebraic thinking to real-world problems',
              'Build foundation for advanced mathematics'
            ],
            difficulty_level: 2,
            estimated_duration_minutes: 35,
            mastery_groups: {
              id: 'group-1',
              name: 'Algebra Foundations',
              subjects: {
                id: 'subject-1',
                name: 'Mathematics',
                color: '#3B82F6',
                icon: '📊'
              }
            }
          }
        },
        {
          id: 'lesson-2',
          tenant_id: '550e8400-e29b-41d4-a716-446655440000',
          student_id: studentId,
          skills_topic_id: 'topic-2',
          lesson_type: 'reinforcement', // Learn Mode
          content: {
            title: 'Reading Comprehension Strategies',
            description: 'Develop advanced reading comprehension skills through guided practice with various text types and analytical techniques',
            activities: [
              'Analyze main ideas and supporting details',
              'Practice inference and critical thinking',
              'Explore different text structures',
              'Build vocabulary through context clues'
            ]
          },
          difficulty_adjustment: 1,
          estimated_duration_minutes: 40,
          scheduled_date: date ? new Date(date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
          status: 'scheduled',
          completion_percentage: 0,
          time_spent_minutes: 0,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          skills_topics: {
            id: 'topic-2',
            name: 'Reading Comprehension Strategies',
            description: 'Enhance your reading comprehension abilities through systematic practice with diverse texts and proven analytical strategies.',
            learning_objectives: [
              'Identify main ideas and supporting evidence',
              'Make logical inferences from text',
              'Analyze author\'s purpose and tone',
              'Expand vocabulary through contextual learning'
            ],
            difficulty_level: 3,
            estimated_duration_minutes: 40,
            mastery_groups: {
              id: 'group-2',
              name: 'Language Arts Skills',
              subjects: {
                id: 'subject-2',
                name: 'English Language Arts',
                color: '#10B981',
                icon: '📚'
              }
            }
          }
        },
        
        // Experience Mode Lessons (2 assignments)
        {
          id: 'lesson-3',
          tenant_id: '550e8400-e29b-41d4-a716-446655440000',
          student_id: studentId,
          skills_topic_id: 'topic-3',
          lesson_type: 'pathway', // Experience Mode
          content: {
            title: 'Collaborative Science Investigation',
            description: 'Work with your team to investigate renewable energy sources and create a group project proposal',
            activities: [
              'Research different renewable energy types',
              'Collaborate with team members on findings',
              'Develop a joint project proposal',
              'Present group recommendations'
            ]
          },
          difficulty_adjustment: 1,
          estimated_duration_minutes: 60,
          scheduled_date: date ? new Date(date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
          status: 'scheduled',
          completion_percentage: 0,
          time_spent_minutes: 0,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          skills_topics: {
            id: 'topic-3',
            name: 'Renewable Energy Team Project',
            description: 'Collaborate with peers to investigate renewable energy solutions and develop a comprehensive group project that explores sustainable technology options.',
            learning_objectives: [
              'Research renewable energy technologies',
              'Develop effective collaboration skills',
              'Create comprehensive project proposals',
              'Work together as a productive team'
            ],
            difficulty_level: 4,
            estimated_duration_minutes: 60,
            mastery_groups: {
              id: 'group-3',
              name: 'Environmental Science',
              subjects: {
                id: 'subject-3',
                name: 'Science',
                color: '#10B981',
                icon: '🔬'
              }
            }
          }
        },
        {
          id: 'lesson-4',
          tenant_id: '550e8400-e29b-41d4-a716-446655440000',
          student_id: studentId,
          skills_topic_id: 'topic-4',
          lesson_type: 'pathway', // Experience Mode
          content: {
            title: 'Historical Perspectives Project',
            description: 'Create a multimedia presentation exploring multiple perspectives on a significant historical event',
            activities: [
              'Research primary and secondary sources',
              'Analyze different historical viewpoints',
              'Create a balanced presentation of perspectives',
              'Develop critical thinking about historical narratives'
            ]
          },
          difficulty_adjustment: 0,
          estimated_duration_minutes: 55,
          scheduled_date: date ? new Date(date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
          status: 'scheduled',
          completion_percentage: 0,
          time_spent_minutes: 0,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          skills_topics: {
            id: 'topic-4',
            name: 'Multiple Perspectives in History',
            description: 'Explore how historical events are interpreted differently based on perspective, culture, and time period through collaborative research and presentation.',
            learning_objectives: [
              'Analyze primary and secondary historical sources',
              'Compare contrasting historical narratives',
              'Develop balanced historical presentations',
              'Apply critical thinking to historical accounts'
            ],
            difficulty_level: 3,
            estimated_duration_minutes: 55,
            mastery_groups: {
              id: 'group-4',
              name: 'Historical Analysis',
              subjects: {
                id: 'subject-4',
                name: 'Social Studies',
                color: '#F59E0B',
                icon: '🌍'
              }
            }
          }
        },
        
        // Discover Mode Lessons (2 assignments)
        {
          id: 'lesson-5',
          tenant_id: '550e8400-e29b-41d4-a716-446655440000',
          student_id: studentId,
          skills_topic_id: 'topic-5',
          lesson_type: 'future_pathway', // Discover Mode
          content: {
            title: 'Career Exploration Workshop',
            description: 'Discover potential career paths that align with your interests, strengths, and values through interactive assessments and research',
            activities: [
              'Complete interest and aptitude assessments',
              'Research career fields that match your profile',
              'Interview professionals in fields of interest',
              'Create a personal career exploration plan'
            ]
          },
          difficulty_adjustment: -1,
          estimated_duration_minutes: 50,
          scheduled_date: date ? new Date(date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
          status: 'scheduled',
          completion_percentage: 0,
          time_spent_minutes: 0,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          skills_topics: {
            id: 'topic-5',
            name: 'Career Exploration Workshop',
            description: 'Identify potential career paths that align with your personal interests, strengths, and values through guided exploration and professional connections.',
            learning_objectives: [
              'Identify personal strengths and interests',
              'Research career options systematically',
              'Connect interests to potential career paths',
              'Develop a personalized career exploration plan'
            ],
            difficulty_level: 2,
            estimated_duration_minutes: 50,
            mastery_groups: {
              id: 'group-5',
              name: 'Career Development',
              subjects: {
                id: 'subject-5',
                name: 'Life Skills',
                color: '#8B5CF6',
                icon: '🎯'
              }
            }
          }
        },
        {
          id: 'lesson-6',
          tenant_id: '550e8400-e29b-41d4-a716-446655440000',
          student_id: studentId,
          skills_topic_id: 'topic-6',
          lesson_type: 'future_pathway', // Discover Mode
          content: {
            title: 'Creative Thinking Challenge',
            description: 'Develop innovative thinking skills through a series of creative challenges and design thinking exercises',
            activities: [
              'Participate in divergent thinking exercises',
              'Apply design thinking methodology to problems',
              'Create solutions for real-world challenges',
              'Reflect on your creative process and growth'
            ]
          },
          difficulty_adjustment: 0,
          estimated_duration_minutes: 45,
          scheduled_date: date ? new Date(date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
          status: 'scheduled',
          completion_percentage: 0,
          time_spent_minutes: 0,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          skills_topics: {
            id: 'topic-6',
            name: 'Creative Thinking Challenge',
            description: 'Enhance your creative problem-solving abilities through structured challenges that develop innovative thinking and design skills.',
            learning_objectives: [
              'Apply divergent thinking techniques',
              'Develop design thinking methodology',
              'Create innovative solutions to problems',
              'Build creative confidence and resilience'
            ],
            difficulty_level: 3,
            estimated_duration_minutes: 45,
            mastery_groups: {
              id: 'group-6',
              name: 'Creative Development',
              subjects: {
                id: 'subject-6',
                name: 'Art & Design',
                color: '#EC4899',
                icon: '🎨'
              }
            }
          }
        }
      ];

      return mockLessons;
    } catch (error) {
      console.error('Error fetching today\'s lessons:', error);
      return null;
    }
  }

  static async completeLesson(lessonId: string, completionData: {
    completion_percentage: number;
    time_spent_minutes: number;
    status: string;
  }) {
    try {
      // Validate input parameters
      if (!lessonId) {
        throw new Error('Missing required parameter: lessonId');
      }

      // Validate UUID format
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      if (!uuidRegex.test(lessonId)) {
        throw new Error('Invalid UUID format for lessonId');
      }

      // Validate completion data
      const validatedData = {
        completion_percentage: Math.max(0, Math.min(100, completionData.completion_percentage || 0)),
        time_spent_minutes: Math.max(0, completionData.time_spent_minutes || 0),
        status: completionData.status || 'completed'
      };

      const { data, error } = await supabase
        .from('lesson_plans')
        .update(validatedData)
        .eq('id', lessonId)
        .select()
        .single();

      if (error) {
        console.error('Supabase error in completeLesson:', error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error completing lesson:', error);
      throw error;
    }
  }
}