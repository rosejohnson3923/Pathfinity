import React, { useState } from 'react';
import { 
  Palette, 
  Plus, 
  Search, 
  Filter, 
  Grid, 
  List, 
  Star, 
  Download, 
  Share2, 
  Edit3, 
  Copy, 
  Trash2,
  Image,
  FileText,
  Presentation,
  Layout,
  Sparkles,
  Clock,
  Eye,
  Heart
} from 'lucide-react';

interface Template {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  type: 'presentation' | 'poster' | 'infographic' | 'document';
  tags: string[];
  likes: number;
  views: number;
  lastModified: string;
  isPublic: boolean;
  isFavorite: boolean;
}

const mockTemplates: Template[] = [
  {
    id: '1',
    title: 'Solar System Presentation',
    category: 'Science',
    thumbnail: 'https://images.pexels.com/photos/87651/earth-blue-planet-globe-planet-87651.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=2',
    type: 'presentation',
    tags: ['space', 'planets', 'astronomy'],
    likes: 24,
    views: 156,
    lastModified: '2 hours ago',
    isPublic: true,
    isFavorite: true
  },
  {
    id: '2',
    title: 'Climate Change Infographic',
    category: 'Environmental',
    thumbnail: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=2',
    type: 'infographic',
    tags: ['climate', 'environment', 'data'],
    likes: 18,
    views: 89,
    lastModified: '1 day ago',
    isPublic: false,
    isFavorite: false
  },
  {
    id: '3',
    title: 'Math Formula Poster',
    category: 'Mathematics',
    thumbnail: 'https://images.pexels.com/photos/6256/mathematics-computation-mathe-algebra.jpg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=2',
    type: 'poster',
    tags: ['math', 'formulas', 'algebra'],
    likes: 31,
    views: 203,
    lastModified: '3 days ago',
    isPublic: true,
    isFavorite: true
  },
  {
    id: '4',
    title: 'History Timeline',
    category: 'History',
    thumbnail: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=2',
    type: 'document',
    tags: ['history', 'timeline', 'events'],
    likes: 12,
    views: 67,
    lastModified: '1 week ago',
    isPublic: false,
    isFavorite: false
  }
];

const categories = ['All', 'Science', 'Mathematics', 'History', 'Environmental', 'Literature', 'Art'];
const templateTypes = ['All', 'Presentation', 'Poster', 'Infographic', 'Document'];

export function BrandStudio() {
  const [templates, setTemplates] = useState<Template[]>(mockTemplates);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'presentation': return Presentation;
      case 'poster': return Image;
      case 'infographic': return Layout;
      case 'document': return FileText;
      default: return FileText;
    }
  };

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory;
    const matchesType = selectedType === 'All' || template.type === selectedType.toLowerCase();
    
    return matchesSearch && matchesCategory && matchesType;
  });

  const handleCreateNew = () => {
    console.log('Creating new design...');
  };

  const handleTemplateAction = (action: string, templateId: string) => {
    console.log(`${action} template:`, templateId);
    
    if (action === 'favorite') {
      setTemplates(prev => prev.map(t => 
        t.id === templateId ? { ...t, isFavorite: !t.isFavorite } : t
      ));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl flex items-center justify-center">
                  <Palette className="w-6 h-6 text-white" />
                </div>
                <span>BRAND Studio</span>
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Create stunning presentations, posters, and infographics with AI-powered design tools
              </p>
            </div>
            <button 
              onClick={handleCreateNew}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200 hover:scale-105"
            >
              <Plus className="w-5 h-5" />
              <span>Create New</span>
            </button>
          </div>

          {/* Search and Filters */}
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search templates, tags, or categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 dark:text-white"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center space-x-2 px-4 py-3 rounded-xl border transition-colors ${
                showFilters 
                  ? 'bg-pink-50 dark:bg-pink-900/20 border-pink-200 dark:border-pink-800 text-pink-600 dark:text-pink-400'
                  : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400'
              }`}
            >
              <Filter className="w-5 h-5" />
              <span>Filters</span>
            </button>
            <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-pink-100 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400'
                    : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-pink-100 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400'
                    : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
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
                            ? 'bg-pink-100 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400'
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
                    {templateTypes.map(type => (
                      <button
                        key={type}
                        onClick={() => setSelectedType(type)}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                          selectedType === type
                            ? 'bg-pink-100 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400'
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

        {/* Templates Grid/List */}
        <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-4'}`}>
          {filteredTemplates.map(template => {
            const TypeIcon = getTypeIcon(template.type);
            
            if (viewMode === 'list') {
              return (
                <div key={template.id} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 hover:shadow-lg transition-all duration-200">
                  <div className="flex items-center space-x-4">
                    <img
                      src={template.thumbnail}
                      alt={template.title}
                      className="w-20 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <TypeIcon className="w-4 h-4 text-gray-500" />
                        <h3 className="font-semibold text-gray-900 dark:text-white">{template.title}</h3>
                        {template.isFavorite && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{template.category}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                        <span className="flex items-center space-x-1">
                          <Eye className="w-3 h-3" />
                          <span>{template.views}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Heart className="w-3 h-3" />
                          <span>{template.likes}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{template.lastModified}</span>
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleTemplateAction('favorite', template.id)}
                        className="p-2 text-gray-400 hover:text-yellow-500 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <Star className={`w-4 h-4 ${template.isFavorite ? 'text-yellow-500 fill-current' : ''}`} />
                      </button>
                      <button
                        onClick={() => handleTemplateAction('edit', template.id)}
                        className="p-2 text-gray-400 hover:text-pink-500 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleTemplateAction('share', template.id)}
                        className="p-2 text-gray-400 hover:text-blue-500 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <div key={template.id} className="group bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="relative">
                  <img
                    src={template.thumbnail}
                    alt={template.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200"></div>
                  <div className="absolute top-3 right-3 flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      template.isPublic 
                        ? 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400'
                        : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                    }`}>
                      {template.isPublic ? 'Public' : 'Private'}
                    </span>
                    {template.isFavorite && (
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    )}
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <span className="inline-flex items-center space-x-1 px-2 py-1 bg-white/90 dark:bg-gray-800/90 rounded-full text-xs font-medium text-gray-700 dark:text-gray-300">
                      <TypeIcon className="w-3 h-3" />
                      <span className="capitalize">{template.type}</span>
                    </span>
                  </div>
                  
                  {/* Hover Actions */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleTemplateAction('edit', template.id)}
                        className="p-3 bg-white/90 dark:bg-gray-800/90 rounded-full text-gray-700 dark:text-gray-300 hover:bg-pink-500 hover:text-white transition-colors"
                      >
                        <Edit3 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleTemplateAction('copy', template.id)}
                        className="p-3 bg-white/90 dark:bg-gray-800/90 rounded-full text-gray-700 dark:text-gray-300 hover:bg-blue-500 hover:text-white transition-colors"
                      >
                        <Copy className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleTemplateAction('share', template.id)}
                        className="p-3 bg-white/90 dark:bg-gray-800/90 rounded-full text-gray-700 dark:text-gray-300 hover:bg-green-500 hover:text-white transition-colors"
                      >
                        <Share2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 dark:text-white truncate">{template.title}</h3>
                    <button
                      onClick={() => handleTemplateAction('favorite', template.id)}
                      className="p-1 text-gray-400 hover:text-yellow-500 transition-colors"
                    >
                      <Star className={`w-4 h-4 ${template.isFavorite ? 'text-yellow-500 fill-current' : ''}`} />
                    </button>
                  </div>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{template.category}</p>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {template.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs text-gray-600 dark:text-gray-400 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center space-x-3">
                      <span className="flex items-center space-x-1">
                        <Eye className="w-3 h-3" />
                        <span>{template.views}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Heart className="w-3 h-3" />
                        <span>{template.likes}</span>
                      </span>
                    </div>
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{template.lastModified}</span>
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No templates found</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Try adjusting your search or filters, or create a new design from scratch.
            </p>
            <button 
              onClick={handleCreateNew}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200"
            >
              <Plus className="w-5 h-5" />
              <span>Create New Design</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}