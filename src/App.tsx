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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <WelcomeCard onOpenFinnAssistant={() => setIsFinnAssistantOpen(true)} />
          
          {/* Integrated Learning Section */}
          <div className="w-full">
            <LearningModes 
              todaysLessons={todaysLessons} 
              lessonsLoading={lessonsLoading} 
              onLessonComplete={handleLessonComplete}
              totalRemainingTime={totalRemainingTime}
            />
          </div>
          
          <LearningProgress />
          <RecentActivity />
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