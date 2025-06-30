import React, { useState, useEffect } from 'react';
import { BookOpen, Users, FileText, GraduationCap, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { mockUser, mockActivities } from '../data/mockData';

interface Activity {
  id: string;
  type: 'lesson' | 'project' | 'assessment' | 'collaboration';
  title: string;
  description: string;
  timestamp: string;
  completed: boolean;
}

const iconMap = {
  lesson: BookOpen,
  project: Users,
  assessment: FileText,
  collaboration: GraduationCap
};

const typeColors = {
  lesson: 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
  project: 'bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400',
  assessment: 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400',
  collaboration: 'bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400'
};

export function RecentActivity() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadActivities();
  }, []);

  const loadActivities = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Validate mock user data
      if (!mockUser?.id) {
        throw new Error('Invalid user data');
      }

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Validate and sanitize mock activities
      const validatedActivities = Array.isArray(mockActivities) 
        ? mockActivities.filter(activity => 
            activity && 
            activity.id && 
            activity.title && 
            activity.type && 
            ['lesson', 'project', 'assessment', 'collaboration'].includes(activity.type)
          ).map(activity => ({
            ...activity,
            title: activity.title || 'Untitled Activity',
            description: activity.description || 'No description available',
            timestamp: activity.timestamp || new Date().toISOString(),
            completed: Boolean(activity.completed)
          }))
        : [];

      setActivities(validatedActivities);
    } catch (error) {
      console.error('Error loading activities:', error);
      setError('Failed to load recent activities');
      
      // Fallback to safe default activities
      const fallbackActivities: Activity[] = [
        {
          id: '1',
          type: 'lesson',
          title: 'Welcome Lesson',
          description: 'Getting started with your learning journey',
          timestamp: new Date().toISOString(),
          completed: true
        }
      ];
      
      setActivities(fallbackActivities);
    } finally {
      setLoading(false);
    }
  };

  const formatTimestamp = (timestamp: string) => {
    if (!timestamp) return 'Recently';
    
    try {
      const date = new Date(timestamp);
      
      // Check if date is valid
      if (isNaN(date.getTime())) {
        return 'Recently';
      }
      
      const now = new Date();
      const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
      
      if (diffInHours < 0) return 'Recently'; // Future date
      if (diffInHours < 1) return 'Just now';
      if (diffInHours < 24) return `${diffInHours}h ago`;
      
      const diffInDays = Math.floor(diffInHours / 24);
      if (diffInDays < 7) return `${diffInDays}d ago`;
      
      return date.toLocaleDateString();
    } catch (error) {
      return 'Recently';
    }
  };

  const getIconComponent = (type: string) => {
    return iconMap[type as keyof typeof iconMap] || BookOpen;
  };

  const getTypeColor = (type: string) => {
    return typeColors[type as keyof typeof typeColors] || typeColors.lesson;
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
            <Clock className="w-5 h-5 text-gray-500" />
            <span>Recent Activity</span>
          </h2>
          <div className="h-4 w-16 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
        </div>
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 animate-pulse">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error && activities.length === 0) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
            <Clock className="w-5 h-5 text-gray-500" />
            <span>Recent Activity</span>
          </h2>
        </div>
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
          <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
          <button 
            onClick={loadActivities}
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
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
          <Clock className="w-5 h-5 text-gray-500" />
          <span>Recent Activity</span>
        </h2>
        <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">
          View All
        </button>
      </div>

      {activities.length > 0 ? (
        <div className="space-y-3">
          {activities.map((activity) => {
            const Icon = getIconComponent(activity.type);
            const typeColor = getTypeColor(activity.type);
            
            return (
              <div
                key={activity.id}
                className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
              >
                <div className="flex items-start space-x-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${typeColor}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900 dark:text-white truncate" title={activity.title}>
                        {activity.title}
                      </h3>
                      <span className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0 ml-2">
                        {formatTimestamp(activity.timestamp)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2" title={activity.description}>
                      {activity.description}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium capitalize ${typeColor}`}>
                        {activity.type}
                      </span>
                      {activity.completed ? (
                        <span className="flex items-center text-xs text-green-600 dark:text-green-400 font-medium">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Completed
                        </span>
                      ) : (
                        <span className="flex items-center text-xs text-yellow-600 dark:text-yellow-400 font-medium">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          In Progress
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-8">
          <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No Recent Activity</h3>
          <p className="text-gray-500 dark:text-gray-400">Start learning to see your activity here!</p>
        </div>
      )}
    </div>
  );
}