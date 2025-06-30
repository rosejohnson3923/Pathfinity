import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { WelcomeCard } from './components/WelcomeCard';
import { LearningModes } from './components/LearningModes';
import { LearningProgress } from './components/LearningProgress';
import { RecentActivity } from './components/RecentActivity';
import { AIAssistant } from './components/AIAssistant';
import { LearningService } from './services/learningService';
import { mockUser } from './data/mockData';

function App() {
  const [todaysLessons, setTodaysLessons] = useState([]);
  const [lessonsLoading, setLessonsLoading] = useState(true);
  const [totalRemainingTime, setTotalRemainingTime] = useState(0);
  const [isFinnAssistantOpen, setIsFinnAssistantOpen] = useState(false);
  const [showFullDashboard, setShowFullDashboard] = useState(false); // Default to collapsed

  useEffect(() => {
    loadTodaysLessons();
  }, []);

  const loadTodaysLessons = async () => {
    try {
      setLessonsLoading(true);
      
      // Validate mock user data
      if (!mockUser?.id) {
        throw new Error('Invalid user data');
      }

      const lessons = await LearningService.getTodaysLessons(mockUser.id);
      setTodaysLessons(lessons || []);
      
      // Calculate total remaining time from incomplete lessons
      if (Array.isArray(lessons) && lessons.length > 0) {
        const incompleteLessons = lessons.filter(lesson => 
          lesson.status !== 'completed' && 
          lesson.completion_percentage < 100
        );
        
        const totalTime = incompleteLessons.reduce((sum, lesson) => 
          sum + (lesson.estimated_duration_minutes || 0), 0
        );
        
        setTotalRemainingTime(totalTime);
      } else {
        setTotalRemainingTime(0);
      }
    } catch (error) {
      console.error('Error loading today\'s lessons:', error);
      setTodaysLessons([]);
      setTotalRemainingTime(0);
    } finally {
      setLessonsLoading(false);
    }
  };

  const handleLessonComplete = async (lessonId: string) => {
    try {
      await LearningService.completeLesson(lessonId, {
        completion_percentage: 100,
        time_spent_minutes: 30, // Example time spent
        status: 'completed'
      });
      
      // Reload lessons to update the remaining time
      await loadTodaysLessons();
    } catch (error) {
      console.error('Error completing lesson:', error);
    }
  };

  const toggleDashboardMode = () => {
    setShowFullDashboard(!showFullDashboard);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <WelcomeCard 
            onOpenFinnAssistant={() => setIsFinnAssistantOpen(true)}
            showFullDashboard={showFullDashboard}
            onToggleDashboard={toggleDashboardMode}
          />
          
          {/* Integrated Learning Section */}
          <div className="w-full">
            <LearningModes 
              todaysLessons={todaysLessons} 
              lessonsLoading={lessonsLoading} 
              onLessonComplete={handleLessonComplete}
              totalRemainingTime={totalRemainingTime}
            />
          </div>
          
          {/* Collapsed State Placeholder */}
          {!showFullDashboard && (
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-blue-100 dark:border-blue-800 text-center">
              <div className="flex items-center justify-center space-x-3 mb-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm5-18v4h3V3h-3z"/>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Additional Dashboard Sections Available
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Learning Progress and Recent Activity sections are collapsed for a focused view. 
                Click "Enhanced Dashboard View" in the welcome section above to expand all sections.
              </p>
              <div className="flex items-center justify-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span>Learning Progress</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>Recent Activity</span>
                </div>
              </div>
            </div>
          )}
          
          {/* Conditionally render expanded sections */}
          {showFullDashboard && (
            <>
              <div className="transform transition-all duration-500 ease-in-out animate-in slide-in-from-top-4">
                <LearningProgress />
              </div>
              <div className="transform transition-all duration-500 ease-in-out animate-in slide-in-from-top-4" style={{ animationDelay: '100ms' }}>
                <RecentActivity />
              </div>
            </>
          )}
        </div>
      </main>

      <AIAssistant 
        todaysLessons={todaysLessons} 
        lessonsLoading={lessonsLoading}
        isOpen={isFinnAssistantOpen}
        setIsOpen={setIsFinnAssistantOpen}
        totalRemainingTime={totalRemainingTime}
      />
    </div>
  );
}

export default App;