import React, { useState, useEffect } from 'react';
import { Palette, Users, Video, MessageSquare, ArrowRight, Sparkles, Clock, Zap, Target } from 'lucide-react';

interface CreativeToolsProps {
  todaysLessons: any[];
  lessonsLoading: boolean;
}

const allTools = [
  {
    id: 'brand',
    name: 'BRAND Studio',
    description: 'Create presentations and designs',
    icon: Palette,
    color: 'from-pink-500 to-rose-500',
    href: '/brand',
    keywords: ['presentation', 'design', 'visual', 'poster', 'infographic', 'creative', 'art', 'brand'],
    stats: {
      templatesUsed: 12,
      projectsCreated: 8,
      timeSpent: 145
    },
    features: ['AI-powered design suggestions', 'Professional templates', 'Real-time collaboration']
  },
  {
    id: 'collab',
    name: 'COLLAB Space',
    description: 'Project marketplace & teams',
    icon: Users,
    color: 'from-blue-500 to-cyan-500',
    href: '/collab',
    keywords: ['project', 'collaborate', 'group', 'team', 'partnership', 'work together', 'joint'],
    stats: {
      projectsJoined: 5,
      teamsFormed: 3,
      timeSpent: 89
    },
    features: ['Find project partners', 'Skill-based matching', 'Team management tools']
  },
  {
    id: 'stream',
    name: 'STREAM Live',
    description: 'Live streaming & recordings',
    icon: Video,
    color: 'from-purple-500 to-indigo-500',
    href: '/stream',
    keywords: ['live', 'stream', 'broadcast', 'webinar', 'session', 'recording', 'video'],
    stats: {
      sessionsHosted: 4,
      viewersReached: 156,
      timeSpent: 67
    },
    features: ['HD live streaming', 'Interactive sessions', 'Recording & playback']
  },
  {
    id: 'meet',
    name: 'MEET Hub',
    description: 'Community & discussions',
    icon: MessageSquare,
    color: 'from-green-500 to-teal-500',
    href: '/meet',
    keywords: ['discussion', 'community', 'forum', 'chat', 'talk', 'communicate', 'share'],
    stats: {
      discussionsJoined: 18,
      questionsAnswered: 7,
      timeSpent: 123
    },
    features: ['Study groups', 'Q&A forums', 'Peer mentoring']
  }
];

export function CreativeTools({ todaysLessons, lessonsLoading }: CreativeToolsProps) {
  const [availableTools, setAvailableTools] = useState(allTools);
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  useEffect(() => {
    if (!lessonsLoading) {
      filterToolsByLessons();
    }
  }, [lessonsLoading, todaysLessons]);

  const filterToolsByLessons = () => {
    if (!Array.isArray(todaysLessons) || todaysLessons.length === 0) {
      setAvailableTools([]);
      return;
    }

    // Convert all lesson data to searchable text
    const lessonContent = todaysLessons.map(lesson => {
      const content = {
        title: lesson.skills_topics?.name || '',
        description: lesson.skills_topics?.description || '',
        objectives: lesson.skills_topics?.learning_objectives?.join(' ') || '',
        lessonType: lesson.lesson_type || '',
        content: JSON.stringify(lesson.content || {}),
        subject: lesson.skills_topics?.mastery_groups?.subjects?.name || ''
      };
      
      return Object.values(content).join(' ').toLowerCase();
    }).join(' ');

    // Filter tools based on keyword matches
    const requiredTools = allTools.filter(tool => {
      return tool.keywords.some(keyword => 
        lessonContent.includes(keyword.toLowerCase())
      );
    });

    // If no specific tools are required but there are lessons, show BRAND Studio as default
    if (requiredTools.length === 0 && todaysLessons.length > 0) {
      const brandTool = allTools.find(tool => tool.id === 'brand');
      if (brandTool) {
        setAvailableTools([brandTool]);
        return;
      }
    }

    setAvailableTools(requiredTools);
  };

  const handleLaunchTool = (toolId: string) => {
    // In a real app, this would navigate to the tool's dedicated page
    console.log(`Launching ${toolId} tool`);
  };

  const formatTime = (minutes: number) => {
    if (!minutes || minutes < 0) return '0m';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  if (lessonsLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-purple-500" />
            <span>Today's Creative Tools</span>
          </h2>
          <div className="h-4 w-16 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
        </div>
        
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 animate-pulse">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-xl"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
                </div>
              </div>
              <div className="flex justify-end">
                <div className="h-10 w-20 bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (availableTools.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-purple-500" />
            <span>Today's Creative Tools</span>
          </h2>
        </div>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6 text-center">
          <Sparkles className="w-12 h-12 text-blue-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No Creative Tools Required</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Today's lessons don't require any creative tools. Focus on your learning assignments!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-purple-500" />
          <span>Today's Creative Tools</span>
        </h2>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {availableTools.length} tool{availableTools.length !== 1 ? 's' : ''} needed
        </span>
      </div>
      
      {/* Tools List */}
      <div className="space-y-4">
        {availableTools.map((tool) => (
          <div
            key={tool.id}
            className={`group bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200 hover:shadow-lg overflow-hidden cursor-pointer ${
              selectedTool === tool.id ? 'ring-2 ring-purple-500 dark:ring-purple-400' : ''
            }`}
            onMouseEnter={() => setSelectedTool(tool.id)}
            onMouseLeave={() => setSelectedTool(null)}
          >
            {/* Background Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-0 group-hover:opacity-5 transition-opacity duration-200 pointer-events-none`}></div>
            
            <div className="relative p-6">
              {/* Tool Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 bg-gradient-to-br ${tool.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-lg`}>
                    <tool.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      {tool.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {tool.description}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleLaunchTool(tool.id)}
                  className={`flex items-center space-x-2 px-6 py-3 bg-gradient-to-r ${tool.color} text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200 hover:scale-105 group-hover:translate-x-1`}
                >
                  <span>Launch</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Required for today indicator */}
              <div className="mb-4">
                <span className="inline-flex items-center px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-full text-xs font-medium">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Required for today's lessons
                </span>
              </div>

              {/* Expanded Details - Slide in from top on hover */}
              {selectedTool === tool.id && (
                <div className="animate-in slide-in-from-top-2 duration-200">
                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <div className="flex items-center justify-center mb-1">
                        <Target className="w-4 h-4 text-blue-500 mr-1" />
                        <span className="text-xs text-gray-500 dark:text-gray-400">Projects</span>
                      </div>
                      <p className="text-sm font-bold text-gray-900 dark:text-white">
                        {tool.stats.projectsCreated || tool.stats.projectsJoined || tool.stats.sessionsHosted || tool.stats.discussionsJoined}
                      </p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <div className="flex items-center justify-center mb-1">
                        <Zap className="w-4 h-4 text-purple-500 mr-1" />
                        <span className="text-xs text-gray-500 dark:text-gray-400">Impact</span>
                      </div>
                      <p className="text-sm font-bold text-gray-900 dark:text-white">
                        {tool.stats.templatesUsed || tool.stats.teamsFormed || tool.stats.viewersReached || tool.stats.questionsAnswered}
                      </p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <div className="flex items-center justify-center mb-1">
                        <Clock className="w-4 h-4 text-green-500 mr-1" />
                        <span className="text-xs text-gray-500 dark:text-gray-400">Time</span>
                      </div>
                      <p className="text-sm font-bold text-gray-900 dark:text-white">
                        {formatTime(tool.stats.timeSpent)}
                      </p>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Key Features:</h4>
                    <div className="grid grid-cols-1 gap-2">
                      {tool.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${tool.color}`}></div>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Tools Summary */}
      {availableTools.length > 0 && (
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl p-4 border border-gray-200 dark:border-gray-600">
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {availableTools.length} tool{availableTools.length !== 1 ? 's' : ''} needed for today's assignments
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
              Hover over each tool to see detailed stats and features
            </p>
          </div>
        </div>
      )}
    </div>
  );
}