import React, { useState, useEffect } from 'react';
import { TrendingUp, Target, Flame, Star, ChevronRight, Award, Clock, BookOpen } from 'lucide-react';
import { LearningService } from '../services/learningService';
import { mockUser } from '../data/mockData';

interface SubjectProgress {
  id: string;
  subject: string;
  code: string;
  color: string;
  icon: string;
  progress: number;
  mastery: 'masters' | 'meets' | 'approaches' | 'does-not-meet';
  streak: number;
  recentActivity: string;
  nextLesson: string;
  timeSpent: number;
  lessonsCompleted: number;
  totalLessons: number;
  achievements: number;
}

const masteryColors = {
  'masters': 'bg-green-500',
  'meets': 'bg-blue-500',
  'approaches': 'bg-yellow-500',
  'does-not-meet': 'bg-red-500'
};

const masteryLabels = {
  'masters': 'Masters',
  'meets': 'Meets',
  'approaches': 'Approaches',
  'does-not-meet': 'Does Not Meet'
};

const masteryDescriptions = {
  'masters': 'Exceeds grade-level expectations',
  'meets': 'Meets grade-level expectations',
  'approaches': 'Approaching grade-level expectations',
  'does-not-meet': 'Below grade-level expectations'
};

export function LearningProgress() {
  const [subjects, setSubjects] = useState<SubjectProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Validate mock user data
      if (!mockUser?.id || !mockUser?.tenant) {
        throw new Error('Invalid user data');
      }

      const studentId = mockUser.id;
      const tenantId = mockUser.tenant;

      const progress = await LearningService.getStudentProgress(studentId, tenantId);
      
      // Enhanced mock data with safe fallbacks
      const enhancedSubjects: SubjectProgress[] = [
        {
          id: '1',
          subject: 'Mathematics',
          code: 'MATH',
          color: 'from-blue-500 to-blue-600',
          icon: '📊',
          progress: 87,
          mastery: 'masters',
          streak: 12,
          recentActivity: 'Linear Equations',
          nextLesson: 'Quadratic Functions',
          timeSpent: 145,
          lessonsCompleted: 28,
          totalLessons: 32,
          achievements: 5
        },
        {
          id: '2',
          subject: 'English Language Arts',
          code: 'ELA',
          color: 'from-purple-500 to-purple-600',
          icon: '📚',
          progress: 76,
          mastery: 'meets',
          streak: 8,
          recentActivity: 'Poetry Analysis',
          nextLesson: 'Creative Writing',
          timeSpent: 120,
          lessonsCompleted: 22,
          totalLessons: 30,
          achievements: 3
        },
        {
          id: '3',
          subject: 'Science',
          code: 'SCI',
          color: 'from-green-500 to-green-600',
          icon: '🔬',
          progress: 92,
          mastery: 'masters',
          streak: 15,
          recentActivity: 'Chemical Reactions',
          nextLesson: 'Periodic Table',
          timeSpent: 180,
          lessonsCompleted: 31,
          totalLessons: 34,
          achievements: 7
        },
        {
          id: '4',
          subject: 'Social Studies',
          code: 'SS',
          color: 'from-orange-500 to-orange-600',
          icon: '🌍',
          progress: 68,
          mastery: 'approaches',
          streak: 5,
          recentActivity: 'World War II',
          nextLesson: 'Cold War Era',
          timeSpent: 95,
          lessonsCompleted: 18,
          totalLessons: 28,
          achievements: 2
        },
        {
          id: '5',
          subject: 'Spanish',
          code: 'ESP',
          color: 'from-red-500 to-red-600',
          icon: '🗣️',
          progress: 94,
          mastery: 'masters',
          streak: 18,
          recentActivity: 'Subjunctive Mood',
          nextLesson: 'Advanced Conversation',
          timeSpent: 160,
          lessonsCompleted: 35,
          totalLessons: 37,
          achievements: 6
        }
      ];

      // Validate and sanitize data
      const validatedSubjects = enhancedSubjects.map(subject => ({
        ...subject,
        progress: Math.max(0, Math.min(100, subject.progress || 0)),
        streak: Math.max(0, subject.streak || 0),
        timeSpent: Math.max(0, subject.timeSpent || 0),
        lessonsCompleted: Math.max(0, subject.lessonsCompleted || 0),
        totalLessons: Math.max(1, subject.totalLessons || 1),
        achievements: Math.max(0, subject.achievements || 0),
        recentActivity: subject.recentActivity || 'No recent activity',
        nextLesson: subject.nextLesson || 'Next lesson pending'
      }));

      setSubjects(validatedSubjects);
    } catch (error) {
      console.error('Error loading progress:', error);
      setError('Failed to load learning progress');
      
      // Fallback to safe default data
      const fallbackSubjects: SubjectProgress[] = [
        {
          id: '1',
          subject: 'Mathematics',
          code: 'MATH',
          color: 'from-blue-500 to-blue-600',
          icon: '📊',
          progress: 75,
          mastery: 'meets',
          streak: 5,
          recentActivity: 'Basic Algebra',
          nextLesson: 'Linear Equations',
          timeSpent: 120,
          lessonsCompleted: 20,
          totalLessons: 30,
          achievements: 3
        }
      ];
      
      setSubjects(fallbackSubjects);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (minutes: number) => {
    if (!minutes || minutes < 0) return '0m';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const getMasteryIcon = (mastery: string) => {
    switch (mastery) {
      case 'masters': return <Award className="w-4 h-4 text-green-500" />;
      case 'meets': return <Target className="w-4 h-4 text-blue-500" />;
      case 'approaches': return <TrendingUp className="w-4 h-4 text-yellow-500" />;
      default: return <BookOpen className="w-4 h-4 text-red-500" />;
    }
  };

  const calculateAverageProgress = () => {
    if (!subjects || subjects.length === 0) return 0;
    const total = subjects.reduce((sum, s) => sum + (s.progress || 0), 0);
    return Math.round(total / subjects.length);
  };

  const calculateTotalAchievements = () => {
    if (!subjects || subjects.length === 0) return 0;
    return subjects.reduce((sum, s) => sum + (s.achievements || 0), 0);
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Learning Progress</h2>
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 animate-pulse">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/3 mb-2"></div>
                  <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error && subjects.length === 0) {
    return (
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Learning Progress</h2>
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
          <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
          <button 
            onClick={loadProgress}
            className="mt-2 text-sm text-red-700 dark:text-red-300 hover:text-red-800 dark:hover:text-red-200 font-medium"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Learning Progress</h2>
        <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">
          View Detailed Report
        </button>
      </div>
      
      <div className="space-y-3">
        {subjects.map((subject) => (
          <div 
            key={subject.id} 
            className={`group bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200 cursor-pointer ${
              selectedSubject === subject.id ? 'ring-2 ring-blue-500 dark:ring-blue-400' : ''
            }`}
            onMouseEnter={() => setSelectedSubject(subject.id)}
            onMouseLeave={() => setSelectedSubject(null)}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 bg-gradient-to-br ${subject.color} rounded-lg flex items-center justify-center text-white text-lg font-bold shadow-lg group-hover:scale-105 transition-transform duration-200`}>
                  {subject.icon}
                </div>
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white">{subject.subject}</h3>
                    <span className={`px-2 py-1 text-xs font-medium text-white rounded-full ${masteryColors[subject.mastery]} flex items-center space-x-1`}>
                      {getMasteryIcon(subject.mastery)}
                      <span>{masteryLabels[subject.mastery]}</span>
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {masteryDescriptions[subject.mastery]}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-1">
                    <Flame className="w-4 h-4 text-orange-500" />
                    <span>{subject.streak} day streak</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-gray-400">
                    <Clock className="w-3 h-3" />
                    <span>{formatTime(subject.timeSpent)} total</span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-all duration-200" />
              </div>
            </div>
            
            {/* Progress Section */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Progress</span>
                    <span className="text-sm font-bold text-gray-900 dark:text-white">{subject.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                    <div 
                      className={`h-2 rounded-full bg-gradient-to-r ${subject.color} transition-all duration-500 relative`}
                      style={{ width: `${Math.max(0, Math.min(100, subject.progress))}%` }}
                    >
                      <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Expanded Details */}
              {selectedSubject === subject.id && (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 pt-3 border-t border-gray-100 dark:border-gray-700 animate-in slide-in-from-top-2 duration-200">
                  <div className="text-center p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <p className="text-sm font-bold text-gray-900 dark:text-white">
                      {subject.lessonsCompleted}/{subject.totalLessons}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Lessons</p>
                  </div>
                  <div className="text-center p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <p className="text-sm font-bold text-gray-900 dark:text-white">
                      {subject.achievements}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Achievements</p>
                  </div>
                  <div className="text-center p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <p className="text-sm font-bold text-gray-900 dark:text-white truncate" title={subject.recentActivity}>
                      {subject.recentActivity}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Last Activity</p>
                  </div>
                  <div className="text-center p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <p className="text-sm font-bold text-gray-900 dark:text-white truncate" title={subject.nextLesson}>
                      {subject.nextLesson}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Next Lesson</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Overall Summary */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-4 border border-blue-100 dark:border-blue-800">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Overall Performance</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {subjects.length > 0 ? 'Excellent progress across all subjects! Keep up the great work.' : 'Start your learning journey today!'}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                {calculateAverageProgress()}%
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Avg Progress</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                {calculateTotalAchievements()}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Total Achievements</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}