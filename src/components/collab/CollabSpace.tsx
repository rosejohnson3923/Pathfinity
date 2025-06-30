import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  Search, 
  Filter, 
  Star, 
  Clock, 
  MapPin, 
  Calendar, 
  User, 
  MessageSquare, 
  Award,
  Zap,
  Target,
  BookOpen,
  Code,
  Palette,
  Microscope,
  Globe,
  TrendingUp,
  Heart,
  Eye,
  UserPlus
} from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  teamSize: {
    current: number;
    max: number;
  };
  skills: string[];
  creator: {
    name: string;
    avatar: string;
    role: string;
  };
  members: Array<{
    name: string;
    avatar: string;
    role: string;
  }>;
  status: 'Open' | 'In Progress' | 'Completed';
  deadline: string;
  likes: number;
  views: number;
  isBookmarked: boolean;
  tags: string[];
}

const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Climate Change Data Visualization',
    description: 'Create interactive charts and graphs to visualize global climate data trends over the past century.',
    category: 'Environmental Science',
    difficulty: 'Intermediate',
    duration: '3-4 weeks',
    teamSize: { current: 3, max: 5 },
    skills: ['Data Analysis', 'JavaScript', 'D3.js', 'Research'],
    creator: {
      name: 'Sarah Chen',
      avatar: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      role: 'Environmental Science Student'
    },
    members: [
      { name: 'Mike Johnson', avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2', role: 'Data Analyst' },
      { name: 'Emma Davis', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2', role: 'Designer' }
    ],
    status: 'Open',
    deadline: '2024-02-15',
    likes: 24,
    views: 156,
    isBookmarked: true,
    tags: ['climate', 'data', 'visualization', 'research']
  },
  {
    id: '2',
    title: 'AI-Powered Study Assistant',
    description: 'Build a chatbot that helps students with homework questions and provides personalized study recommendations.',
    category: 'Computer Science',
    difficulty: 'Advanced',
    duration: '6-8 weeks',
    teamSize: { current: 2, max: 4 },
    skills: ['Python', 'Machine Learning', 'NLP', 'UI/UX Design'],
    creator: {
      name: 'Alex Rodriguez',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      role: 'CS Student'
    },
    members: [
      { name: 'Lisa Wang', avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2', role: 'ML Engineer' }
    ],
    status: 'In Progress',
    deadline: '2024-03-01',
    likes: 31,
    views: 203,
    isBookmarked: false,
    tags: ['ai', 'chatbot', 'education', 'python']
  },
  {
    id: '3',
    title: 'Historical Timeline Interactive Map',
    description: 'Create an interactive world map showing major historical events and their connections across different time periods.',
    category: 'History',
    difficulty: 'Beginner',
    duration: '2-3 weeks',
    teamSize: { current: 4, max: 6 },
    skills: ['Research', 'Web Development', 'Design', 'Storytelling'],
    creator: {
      name: 'Jordan Kim',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      role: 'History Major'
    },
    members: [
      { name: 'Sam Taylor', avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2', role: 'Developer' },
      { name: 'Maya Patel', avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2', role: 'Researcher' },
      { name: 'Chris Lee', avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2', role: 'Designer' }
    ],
    status: 'Open',
    deadline: '2024-02-28',
    likes: 18,
    views: 89,
    isBookmarked: true,
    tags: ['history', 'interactive', 'map', 'timeline']
  }
];

const categories = ['All', 'Computer Science', 'Environmental Science', 'History', 'Mathematics', 'Art & Design', 'Biology'];
const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];
const statuses = ['All', 'Open', 'In Progress', 'Completed'];

export function CollabSpace() {
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [showFilters, setShowFilters] = useState(false);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Computer Science': return Code;
      case 'Environmental Science': return Globe;
      case 'History': return BookOpen;
      case 'Mathematics': return Target;
      case 'Art & Design': return Palette;
      case 'Biology': return Microscope;
      default: return BookOpen;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'Advanced': return 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400';
      case 'In Progress': return 'bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400';
      case 'Completed': return 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400';
      default: return 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'All' || project.difficulty === selectedDifficulty;
    const matchesStatus = selectedStatus === 'All' || project.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesDifficulty && matchesStatus;
  });

  const handleJoinProject = (projectId: string) => {
    console.log('Joining project:', projectId);
  };

  const handleBookmarkProject = (projectId: string) => {
    setProjects(prev => prev.map(p => 
      p.id === projectId ? { ...p, isBookmarked: !p.isBookmarked } : p
    ));
  };

  const handleCreateProject = () => {
    console.log('Creating new project...');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <span>COLLAB Space</span>
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Discover exciting projects, form teams, and collaborate with peers worldwide
              </p>
            </div>
            <button 
              onClick={handleCreateProject}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200 hover:scale-105"
            >
              <Plus className="w-5 h-5" />
              <span>Create Project</span>
            </button>
          </div>

          {/* Search and Filters */}
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search projects, skills, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center space-x-2 px-4 py-3 rounded-xl border transition-colors ${
                showFilters 
                  ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400'
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map(category => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                          selectedCategory === category
                            ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Difficulty</label>
                  <div className="flex flex-wrap gap-2">
                    {difficulties.map(difficulty => (
                      <button
                        key={difficulty}
                        onClick={() => setSelectedDifficulty(difficulty)}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                          selectedDifficulty === difficulty
                            ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                      >
                        {difficulty}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status</label>
                  <div className="flex flex-wrap gap-2">
                    {statuses.map(status => (
                      <button
                        key={status}
                        onClick={() => setSelectedStatus(status)}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                          selectedStatus === status
                            ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProjects.map(project => {
            const CategoryIcon = getCategoryIcon(project.category);
            
            return (
              <div key={project.id} className="group bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105">
                {/* Header */}
                <div className="p-6 pb-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                        <CategoryIcon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 dark:text-white text-lg leading-tight">{project.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{project.category}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleBookmarkProject(project.id)}
                      className="p-2 text-gray-400 hover:text-blue-500 transition-colors"
                    >
                      <Star className={`w-5 h-5 ${project.isBookmarked ? 'text-blue-500 fill-current' : ''}`} />
                    </button>
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">{project.description}</p>

                  {/* Status and Difficulty */}
                  <div className="flex items-center space-x-2 mb-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(project.difficulty)}`}>
                      {project.difficulty}
                    </span>
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.skills.slice(0, 4).map(skill => (
                      <span key={skill} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs text-gray-600 dark:text-gray-400 rounded-full">
                        {skill}
                      </span>
                    ))}
                    {project.skills.length > 4 && (
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs text-gray-600 dark:text-gray-400 rounded-full">
                        +{project.skills.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Team Info */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="flex -space-x-2">
                        <img
                          src={project.creator.avatar}
                          alt={project.creator.name}
                          className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800"
                        />
                        {project.members.slice(0, 3).map((member, index) => (
                          <img
                            key={index}
                            src={member.avatar}
                            alt={member.name}
                            className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800"
                          />
                        ))}
                        {project.members.length > 3 && (
                          <div className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                            <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                              +{project.members.length - 3}
                            </span>
                          </div>
                        )}
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {project.teamSize.current}/{project.teamSize.max} members
                      </span>
                    </div>
                    <div className="flex items-center space-x-3 text-xs text-gray-500 dark:text-gray-400">
                      <span className="flex items-center space-x-1">
                        <Eye className="w-3 h-3" />
                        <span>{project.views}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Heart className="w-3 h-3" />
                        <span>{project.likes}</span>
                      </span>
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-4">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{project.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>Due {new Date(project.deadline).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-100 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <img
                        src={project.creator.avatar}
                        alt={project.creator.name}
                        className="w-6 h-6 rounded-full"
                      />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        by {project.creator.name}
                      </span>
                    </div>
                    <button
                      onClick={() => handleJoinProject(project.id)}
                      disabled={project.teamSize.current >= project.teamSize.max || project.status === 'Completed'}
                      className="flex items-center space-x-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                    >
                      <UserPlus className="w-4 h-4" />
                      <span>
                        {project.status === 'Completed' ? 'Completed' : 
                         project.teamSize.current >= project.teamSize.max ? 'Full' : 'Join'}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No projects found</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Try adjusting your search or filters, or create a new project to get started.
            </p>
            <button 
              onClick={handleCreateProject}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200"
            >
              <Plus className="w-5 h-5" />
              <span>Create New Project</span>
            </button>
          </div>
        )}

        {/* Stats Footer */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 text-center">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mx-auto mb-2">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <p className="text-lg font-bold text-gray-900 dark:text-white">127</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Active Projects</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 text-center">
            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Users className="w-4 h-4 text-white" />
            </div>
            <p className="text-lg font-bold text-gray-900 dark:text-white">1,247</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Collaborators</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 text-center">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Award className="w-4 h-4 text-white" />
            </div>
            <p className="text-lg font-bold text-gray-900 dark:text-white">89</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Completed</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 text-center">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <p className="text-lg font-bold text-gray-900 dark:text-white">342</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Skills Shared</p>
          </div>
        </div>
      </div>
    </div>
  );
}