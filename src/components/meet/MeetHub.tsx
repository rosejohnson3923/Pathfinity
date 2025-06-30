import React, { useState } from 'react';
import { 
  MessageSquare, 
  Plus, 
  Search, 
  Filter, 
  Users, 
  Clock, 
  Star, 
  MessageCircle, 
  ThumbsUp, 
  Eye,
  Pin,
  BookOpen,
  HelpCircle,
  Lightbulb,
  Award,
  TrendingUp,
  Calendar,
  User,
  Hash,
  Send,
  Smile,
  Paperclip,
  MoreHorizontal
} from 'lucide-react';

interface Discussion {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    role: string;
    reputation: number;
  };
  category: string;
  type: 'question' | 'discussion' | 'announcement' | 'study-group';
  tags: string[];
  replies: number;
  likes: number;
  views: number;
  isPinned: boolean;
  isAnswered: boolean;
  lastActivity: string;
  participants: Array<{
    name: string;
    avatar: string;
  }>;
}

const mockDiscussions: Discussion[] = [
  {
    id: '1',
    title: 'Help with Calculus Integration by Parts',
    content: 'I\'m struggling with integration by parts, especially when dealing with logarithmic functions. Can someone explain the strategy?',
    author: {
      name: 'Emma Wilson',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      role: 'Student',
      reputation: 245
    },
    category: 'Mathematics',
    type: 'question',
    tags: ['calculus', 'integration', 'help'],
    replies: 12,
    likes: 8,
    views: 156,
    isPinned: false,
    isAnswered: true,
    lastActivity: '2 hours ago',
    participants: [
      { name: 'Dr. Smith', avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2' },
      { name: 'Alex Chen', avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2' }
    ]
  },
  {
    id: '2',
    title: 'Study Group: Organic Chemistry Exam Prep',
    content: 'Looking for 3-4 people to form a study group for the upcoming organic chemistry exam. We can meet virtually twice a week.',
    author: {
      name: 'Michael Rodriguez',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      role: 'Student',
      reputation: 189
    },
    category: 'Chemistry',
    type: 'study-group',
    tags: ['organic-chemistry', 'study-group', 'exam-prep'],
    replies: 7,
    likes: 15,
    views: 89,
    isPinned: false,
    isAnswered: false,
    lastActivity: '4 hours ago',
    participants: [
      { name: 'Sarah Kim', avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2' },
      { name: 'David Lee', avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2' }
    ]
  },
  {
    id: '3',
    title: 'Weekly Physics Problem Challenge #15',
    content: 'This week\'s challenge involves quantum mechanics and wave-particle duality. Submit your solutions by Friday!',
    author: {
      name: 'Prof. Johnson',
      avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      role: 'Professor',
      reputation: 1250
    },
    category: 'Physics',
    type: 'announcement',
    tags: ['physics', 'challenge', 'quantum-mechanics'],
    replies: 23,
    likes: 34,
    views: 267,
    isPinned: true,
    isAnswered: false,
    lastActivity: '1 day ago',
    participants: [
      { name: 'Lisa Wang', avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2' },
      { name: 'Tom Brown', avatar: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2' }
    ]
  }
];

const categories = ['All', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science', 'History', 'Literature'];
const types = ['All', 'Question', 'Discussion', 'Study Group', 'Announcement'];

export function MeetHub() {
  const [discussions, setDiscussions] = useState<Discussion[]>(mockDiscussions);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedDiscussion, setSelectedDiscussion] = useState<Discussion | null>(null);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'question': return HelpCircle;
      case 'discussion': return MessageSquare;
      case 'study-group': return Users;
      case 'announcement': return Pin;
      default: return MessageSquare;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'question': return 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400';
      case 'discussion': return 'bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400';
      case 'study-group': return 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400';
      case 'announcement': return 'bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400';
      default: return 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  const filteredDiscussions = discussions.filter(discussion => {
    const matchesSearch = discussion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         discussion.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         discussion.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || discussion.category === selectedCategory;
    const matchesType = selectedType === 'All' || discussion.type === selectedType.toLowerCase().replace(' ', '-');
    
    return matchesSearch && matchesCategory && matchesType;
  });

  const handleCreatePost = () => {
    console.log('Creating new post...');
  };

  const handleLikeDiscussion = (discussionId: string) => {
    setDiscussions(prev => prev.map(d => 
      d.id === discussionId ? { ...d, likes: d.likes + 1 } : d
    ));
  };

  const handleJoinDiscussion = (discussion: Discussion) => {
    setSelectedDiscussion(discussion);
  };

  // Sort discussions: pinned first, then by last activity
  const sortedDiscussions = [...filteredDiscussions].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime();
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <span>MEET Hub</span>
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Connect with peers, ask questions, and participate in study groups
              </p>
            </div>
            <button 
              onClick={handleCreatePost}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200 hover:scale-105"
            >
              <Plus className="w-5 h-5" />
              <span>New Post</span>
            </button>
          </div>

          {/* Search and Filters */}
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search discussions, questions, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 dark:text-white"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center space-x-2 px-4 py-3 rounded-xl border transition-colors ${
                showFilters 
                  ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-600 dark:text-green-400'
                  : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400'
              }`}
            >
              <Filter className="w-5 h-5" />
              <span>Filters</span>
            </button>
          </div>

          {/* Filter Options */}
          {showFilters && (
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 animate-in slide-in-from-top-2 duration-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map(category => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                          selectedCategory === category
                            ? 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Type</label>
                  <div className="flex flex-wrap gap-2">
                    {types.map(type => (
                      <button
                        key={type}
                        onClick={() => setSelectedType(type)}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                          selectedType === type
                            ? 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Discussions List */}
        <div className="space-y-4">
          {sortedDiscussions.map(discussion => {
            const TypeIcon = getTypeIcon(discussion.type);
            const typeColor = getTypeColor(discussion.type);
            
            return (
              <div 
                key={discussion.id} 
                className={`bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-200 cursor-pointer ${
                  discussion.isPinned ? 'ring-2 ring-orange-200 dark:ring-orange-800' : ''
                }`}
                onClick={() => handleJoinDiscussion(discussion)}
              >
                <div className="flex items-start space-x-4">
                  {/* Avatar */}
                  <img
                    src={discussion.author.avatar}
                    alt={discussion.author.name}
                    className="w-12 h-12 rounded-full flex-shrink-0"
                  />

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        {discussion.isPinned && (
                          <Pin className="w-4 h-4 text-orange-500" />
                        )}
                        <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${typeColor}`}>
                          <TypeIcon className="w-3 h-3" />
                          <span className="capitalize">{discussion.type.replace('-', ' ')}</span>
                        </span>
                        {discussion.isAnswered && discussion.type === 'question' && (
                          <span className="inline-flex items-center space-x-1 px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-full text-xs font-medium">
                            <Award className="w-3 h-3" />
                            <span>Answered</span>
                          </span>
                        )}
                      </div>
                      <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                      {discussion.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
                      {discussion.content}
                    </p>

                    {/* Author Info */}
                    <div className="flex items-center space-x-4 mb-3">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {discussion.author.name}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {discussion.author.role}
                        </span>
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 text-yellow-500" />
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {discussion.author.reputation}
                          </span>
                        </div>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {discussion.category}
                      </span>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {discussion.tags.map(tag => (
                        <span key={tag} className="inline-flex items-center space-x-1 px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs text-gray-600 dark:text-gray-400 rounded-full">
                          <Hash className="w-2 h-2" />
                          <span>{tag}</span>
                        </span>
                      ))}
                    </div>

                    {/* Stats and Actions */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                          <span className="flex items-center space-x-1">
                            <MessageCircle className="w-4 h-4" />
                            <span>{discussion.replies}</span>
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleLikeDiscussion(discussion.id);
                            }}
                            className="flex items-center space-x-1 hover:text-green-500 transition-colors"
                          >
                            <ThumbsUp className="w-4 h-4" />
                            <span>{discussion.likes}</span>
                          </button>
                          <span className="flex items-center space-x-1">
                            <Eye className="w-4 h-4" />
                            <span>{discussion.views}</span>
                          </span>
                        </div>
                        
                        {/* Participants */}
                        {discussion.participants.length > 0 && (
                          <div className="flex -space-x-2">
                            {discussion.participants.slice(0, 3).map((participant, index) => (
                              <img
                                key={index}
                                src={participant.avatar}
                                alt={participant.name}
                                className="w-6 h-6 rounded-full border-2 border-white dark:border-gray-800"
                                title={participant.name}
                              />
                            ))}
                            {discussion.participants.length > 3 && (
                              <div className="w-6 h-6 rounded-full border-2 border-white dark:border-gray-800 bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                                <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                                  +{discussion.participants.length - 3}
                                </span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                        <Clock className="w-3 h-3" />
                        <span>{discussion.lastActivity}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {sortedDiscussions.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No discussions found</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Try adjusting your search or filters, or start a new discussion.
            </p>
            <button 
              onClick={handleCreatePost}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200"
            >
              <Plus className="w-5 h-5" />
              <span>Start Discussion</span>
            </button>
          </div>
        )}

        {/* Community Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 text-center">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mx-auto mb-2">
              <MessageSquare className="w-4 h-4 text-white" />
            </div>
            <p className="text-lg font-bold text-gray-900 dark:text-white">1,247</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Total Discussions</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 text-center">
            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Users className="w-4 h-4 text-white" />
            </div>
            <p className="text-lg font-bold text-gray-900 dark:text-white">342</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Active Members</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 text-center">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mx-auto mb-2">
              <HelpCircle className="w-4 h-4 text-white" />
            </div>
            <p className="text-lg font-bold text-gray-900 dark:text-white">89%</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Questions Answered</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 text-center">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center mx-auto mb-2">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <p className="text-lg font-bold text-gray-900 dark:text-white">156</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Study Groups</p>
          </div>
        </div>
      </div>
    </div>
  );
}