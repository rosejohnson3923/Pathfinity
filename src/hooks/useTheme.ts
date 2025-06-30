import { useState, useEffect } from 'react';

export function useTheme() {
  const [darkMode, setDarkMode] = useState(() => {
    // Safe check for window object
    if (typeof window === 'undefined') {
      return true; // Default to dark mode
    }

    try {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        return savedTheme === 'dark';
      }

      // Default to dark mode instead of system preference
      return true;
    } catch (error) {
      console.error('Error accessing localStorage:', error);
      return true; // Default to dark mode on error
    }
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const root = window.document.documentElement;
      
      if (darkMode) {
        root.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        root.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    } catch (error) {
      console.error('Error updating theme:', error);
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(prev => !prev);
  };

  return { 
    darkMode, 
    setDarkMode, 
    toggleTheme 
  };
}