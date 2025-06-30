import React from 'react';
import { Bell, Search, MessageSquare, Settings } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { mockUser } from '../data/mockData';

export function Header() {
  const getUserName = () => {
    return mockUser?.name || 'Student';
  };

  const getUserRole = () => {
    return mockUser?.role || 'student';
  };

  const getUserAvatar = () => {
    return mockUser?.avatar || 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2';
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search functionality
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Handle search input changes
    const value = e.target.value;
    // Implement search logic here
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <img 
                src="/pathfinity-logo-enhanced.jpeg" 
                alt="Pathfinity Logo" 
                className="w-8 h-8 rounded-lg object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  // Fallback to original gradient logo
                  const fallback = document.createElement('div');
                  fallback.className = 'w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center';
                  fallback.innerHTML = '<span class="text-white font-bold text-sm">P</span>';
                  target.parentNode?.insertBefore(fallback, target);
                }}
              />
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">Pathfinity</h1>
            </div>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-lg mx-8">
            <form onSubmit={handleSearchSubmit} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search lessons, projects, or ask Finn..."
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                maxLength={100}
              />
            </form>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <button 
              className="relative p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Messages"
            >
              <MessageSquare className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"></span>
            </button>
            <button 
              className="relative p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button 
              className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Settings"
            >
              <Settings className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-2 pl-4 border-l border-gray-200 dark:border-gray-700">
              <img
                src={getUserAvatar()}
                alt={getUserName()}
                className="w-8 h-8 rounded-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2';
                }}
              />
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate max-w-24" title={getUserName()}>
                  {getUserName()}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                  {getUserRole()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}