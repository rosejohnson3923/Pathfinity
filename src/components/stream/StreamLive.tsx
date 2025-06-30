import React, { useState } from 'react';
import { 
  Video, 
  Mic, 
  MicOff, 
  VideoOff, 
  Monitor, 
  Users, 
  MessageSquare, 
  Settings, 
  Play, 
  Square, 
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Calendar,
  Clock,
  Eye,
  Heart,
  Share2,
  Download,
  Star,
  Zap
} from 'lucide-react';

interface StreamSession {
  id: string;
  title: string;
  description: string;
  host: {
    name: string;
    avatar: string;
    role: string;
  };
  category: string;
  isLive: boolean;
  viewers: number;
  duration: string;
  scheduledTime?: string;
  thumbnail: string;
  tags: string[];
  likes: number;
  isBookmarked: boolean;
}

const mockSessions: StreamSession[] = [
  {
    id: '1',
    title: 'Advanced Calculus Problem Solving',
    description: 'Join me as we tackle complex calculus problems and explore advanced mathematical concepts.',
    host: {
      name: 'Dr. Sarah Martinez',
      avatar: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      role: 'Mathematics Professor'
    },
    category: 'Mathematics',
    isLive: true,
    viewers: 234,
    duration: '1h 23m',
    thumbnail: 'https://images.pexels.com/photos/6256/mathematics-computation-mathe-algebra.jpg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
    tags: ['calculus', 'math', 'problem-solving'],
    likes: 45,
    isBookmarked: true
  },
  {
    id: '2',
    title: 'Chemistry Lab: Organic Reactions',
    description: 'Live chemistry experiment demonstrating organic reaction mechanisms and synthesis.',
    host: {
      name: 'Prof. Michael Chen',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      role: 'Chemistry Professor'
    },
    category: 'Chemistry',
    isLive: false,
    viewers: 0,
    duration: '45m',
    scheduledTime: '2024-01-20T14:00:00Z',
    thumbnail: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
    tags: ['chemistry', 'lab', 'organic'],
    likes: 28,
    isBookmarked: false
  },
  {
    id: '3',
    title: 'Python Programming Bootcamp',
    description: 'Learn Python from scratch with hands-on coding exercises and real-world projects.',
    host: {
      name: 'Alex Rodriguez',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      role: 'Software Engineer'
    },
    category: 'Computer Science',
    isLive: false,
    viewers: 0,
    duration: '2h',
    scheduledTime: '2024-01-21T16:00:00Z',
    thumbnail: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
    tags: ['python', 'programming', 'coding'],
    likes: 67,
    isBookmarked: true
  }
];

export function StreamLive() {
  const [sessions, setSessions] = useState<StreamSession[]>(mockSessions);
  const [isStreaming, setIsStreaming] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [selectedSession, setSelectedSession] = useState<StreamSession | null>(null);

  const handleStartStream = () => {
    setIsStreaming(true);
    console.log('Starting stream...');
  };

  const handleStopStream = () => {
    setIsStreaming(false);
    console.log('Stopping stream...');
  };

  const handleJoinSession = (sessionId: string) => {
    const session = sessions.find(s => s.id === sessionId);
    setSelectedSession(session || null);
    console.log('Joining session:', sessionId);
  };

  const handleBookmarkSession = (sessionId: string) => {
    setSessions(prev => prev.map(s => 
      s.id === sessionId ? { ...s, isBookmarked: !s.isBookmarked } : s
    ));
  };

  const formatScheduledTime = (timeString: string) => {
    const date = new Date(timeString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const liveSessions = sessions.filter(s => s.isLive);
  const upcomingSessions = sessions.filter(s => !s.isLive && s.scheduledTime);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center">
                  <Video className="w-6 h-6 text-white" />
                </div>
                <span>STREAM Live</span>
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Host live sessions, join interactive streams, and learn together in real-time
              </p>
            </div>
            <button 
              onClick={isStreaming ? handleStopStream : handleStartStream}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-105 ${
                isStreaming 
                  ? 'bg-red-500 hover:bg-red-600 text-white'
                  : 'bg-gradient-to-r from-purple-500 to-indigo-500 hover:shadow-lg text-white'
              }`}
            >
              {isStreaming ? <Square className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              <span>{isStreaming ? 'Stop Stream' : 'Go Live'}</span>
            </button>
          </div>

          {/* Stream Controls */}
          {isStreaming && (
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">LIVE</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">•</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">156 viewers</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className={`p-3 rounded-lg transition-colors ${
                      isMuted 
                        ? 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                  </button>
                  <button
                    onClick={() => setIsVideoOff(!isVideoOff)}
                    className={`p-3 rounded-lg transition-colors ${
                      isVideoOff 
                        ? 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {isVideoOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
                  </button>
                  <button
                    onClick={() => setIsScreenSharing(!isScreenSharing)}
                    className={`p-3 rounded-lg transition-colors ${
                      isScreenSharing 
                        ? 'bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    <Monitor className="w-5 h-5" />
                  </button>
                  <button className="p-3 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors">
                    <Settings className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Live Sessions */}
        {liveSessions.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Live Now</h2>
              <span className="text-sm text-gray-600 dark:text-gray-400">({liveSessions.length})</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {liveSessions.map(session => (
                <div key={session.id} className="group bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <div className="relative">
                    <img
                      src={session.thumbnail}
                      alt={session.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200"></div>
                    <div className="absolute top-3 left-3 flex items-center space-x-2">
                      <span className="inline-flex items-center space-x-1 px-2 py-1 bg-red-500 text-white rounded-full text-xs font-medium">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        <span>LIVE</span>
                      </span>
                      <span className="px-2 py-1 bg-black/50 text-white rounded-full text-xs font-medium">
                        {session.viewers} viewers
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <button
                        onClick={() => handleBookmarkSession(session.id)}
                        className="p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                      >
                        <Star className={`w-4 h-4 ${session.isBookmarked ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                    <div className="absolute bottom-3 right-3">
                      <span className="px-2 py-1 bg-black/50 text-white rounded-full text-xs font-medium">
                        {session.duration}
                      </span>
                    </div>
                    
                    {/* Hover Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <button
                        onClick={() => handleJoinSession(session.id)}
                        className="p-4 bg-white/90 dark:bg-gray-800/90 rounded-full text-gray-700 dark:text-gray-300 hover:bg-purple-500 hover:text-white transition-colors"
                      >
                        <Play className="w-8 h-8" />
                      </button>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">{session.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">{session.description}</p>
                    
                    <div className="flex items-center space-x-2 mb-3">
                      <img
                        src={session.host.avatar}
                        alt={session.host.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{session.host.name}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{session.host.role}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {session.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs text-gray-600 dark:text-gray-400 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 text-xs text-gray-500 dark:text-gray-400">
                        <span className="flex items-center space-x-1">
                          <Eye className="w-3 h-3" />
                          <span>{session.viewers}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Heart className="w-3 h-3" />
                          <span>{session.likes}</span>
                        </span>
                      </div>
                      <button
                        onClick={() => handleJoinSession(session.id)}
                        className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200 text-sm"
                      >
                        Join Live
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Upcoming Sessions */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <Calendar className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Upcoming Sessions</h2>
            <span className="text-sm text-gray-600 dark:text-gray-400">({upcomingSessions.length})</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {upcomingSessions.map(session => (
              <div key={session.id} className="group bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="relative">
                  <img
                    src={session.thumbnail}
                    alt={session.title}
                    className="w-full h-48 object-cover opacity-75"
                  />
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center space-x-1 px-2 py-1 bg-blue-500 text-white rounded-full text-xs font-medium">
                      <Clock className="w-3 h-3" />
                      <span>Scheduled</span>
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <button
                      onClick={() => handleBookmarkSession(session.id)}
                      className="p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                    >
                      <Star className={`w-4 h-4 ${session.isBookmarked ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <span className="px-2 py-1 bg-black/50 text-white rounded-full text-xs font-medium">
                      {session.scheduledTime && formatScheduledTime(session.scheduledTime)}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3">
                    <span className="px-2 py-1 bg-black/50 text-white rounded-full text-xs font-medium">
                      {session.duration}
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">{session.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">{session.description}</p>
                  
                  <div className="flex items-center space-x-2 mb-3">
                    <img
                      src={session.host.avatar}
                      alt={session.host.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{session.host.name}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{session.host.role}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {session.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs text-gray-600 dark:text-gray-400 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 text-xs text-gray-500 dark:text-gray-400">
                      <span className="flex items-center space-x-1">
                        <Heart className="w-3 h-3" />
                        <span>{session.likes}</span>
                      </span>
                    </div>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors text-sm">
                      Set Reminder
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 text-center">
            <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Video className="w-4 h-4 text-white" />
            </div>
            <p className="text-lg font-bold text-gray-900 dark:text-white">12</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Sessions Hosted</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 text-center">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Users className="w-4 h-4 text-white" />
            </div>
            <p className="text-lg font-bold text-gray-900 dark:text-white">1,247</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Total Viewers</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 text-center">
            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Clock className="w-4 h-4 text-white" />
            </div>
            <p className="text-lg font-bold text-gray-900 dark:text-white">24h</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Watch Time</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 text-center">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Heart className="w-4 h-4 text-white" />
            </div>
            <p className="text-lg font-bold text-gray-900 dark:text-white">342</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Total Likes</p>
          </div>
        </div>
      </div>
    </div>
  );
}