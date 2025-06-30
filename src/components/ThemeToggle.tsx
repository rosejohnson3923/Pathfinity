import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

export function ThemeToggle() {
  const { darkMode, setDarkMode } = useTheme();

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="relative inline-flex items-center justify-center w-12 h-6 rounded-full bg-gray-200 dark:bg-gray-700 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
      aria-label="Toggle theme"
    >
      <span
        className={`absolute left-0.5 inline-flex items-center justify-center w-5 h-5 rounded-full bg-white dark:bg-gray-900 shadow transform transition-transform duration-200 ease-in-out ${
          darkMode ? 'translate-x-6' : 'translate-x-0'
        }`}
      >
        {darkMode ? (
          <Moon className="w-3 h-3 text-gray-600" />
        ) : (
          <Sun className="w-3 h-3 text-yellow-500" />
        )}
      </span>
    </button>
  );
}