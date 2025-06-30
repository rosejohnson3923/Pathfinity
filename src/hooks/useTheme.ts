import { useState, useEffect } from 'react';

export function useTheme() {
  const [darkMode, setDarkMode] = useState(() => {
    // Safe check for window object
    if (typeof window === 'undefined') {
      return false;
    }

    try {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        return savedTheme === 'dark';
      }

      // Check system preference
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch (error) {
      console.error('Error accessing localStorage or matchMedia:', error);
      return false;
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

  // Listen for system theme changes
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      const handleChange = (e: MediaQueryListEvent) => {
        // Only update if user hasn't manually set a preference
        const savedTheme = localStorage.getItem('theme');
        if (!savedTheme) {
          setDarkMode(e.matches);
        }
      };

      // Check if addEventListener is available (newer browsers)
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
      } else if (mediaQuery.addListener) {
        // Fallback for older browsers
        mediaQuery.addListener(handleChange);
        return () => mediaQuery.removeListener(handleChange);
      }
    } catch (error) {
      console.error('Error setting up theme change listener:', error);
    }
  }, []);

  const toggleTheme = () => {
    setDarkMode(prev => !prev);
  };

  return { 
    darkMode, 
    setDarkMode, 
    toggleTheme 
  };
}