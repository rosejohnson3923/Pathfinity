export interface User {
  id: string;
  name: string;
  role: 'student' | 'educator' | 'admin';
  avatar?: string;
  tenant: string;
}

export interface LearningProgress {
  subject: string;
  progress: number;
  mastery: 'masters' | 'meets' | 'approaches' | 'does-not-meet';
  streak: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedDate?: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface Activity {
  id: string;
  type: 'lesson' | 'project' | 'assessment' | 'collaboration';
  title: string;
  description: string;
  timestamp: string;
  completed: boolean;
}

export interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  href: string;
  mode: 'learn' | 'experience' | 'discover';
}