import React from 'react';
import { motion } from 'framer-motion';
import { 
  Mountain, 
  Building, 
  Star, 
  Utensils, 
  PawPrint, 
  Grid,
  TrendingUp,
  Flame,
  Clock
} from 'lucide-react';
import { Category } from '../types';

interface SidebarProps {
  categories: Category[];
  selectedCategory: string | null;
  onCategorySelect: (categoryId: string | null) => void;
  popularTags: string[];
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
  sortBy: 'latest' | 'popular' | 'trending';
  onSortChange: (sort: 'latest' | 'popular' | 'trending') => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  categories,
  selectedCategory,
  onCategorySelect,
  popularTags,
  selectedTags,
  onTagToggle,
  sortBy,
  onSortChange
}) => {
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Mountain': return <Mountain className="w-5 h-5" />;
      case 'Building': return <Building className="w-5 h-5" />;
      case 'Star': return <Star className="w-5 h-5" />;
      case 'Utensils': return <Utensils className="w-5 h-5" />;
      case 'PawPrint': return <PawPrint className="w-5 h-5" />;
      default: return <Grid className="w-5 h-5" />;
    }
  };

  return (
    <motion.aside 
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="w-full md:w-64 space-y-6"
    >
      {/* 排序选项 */}
      <div className="card p-4">
        <h3 className="font-semibold text-gray-900 mb-3">排序方式</h3>
        <div className="space-y-2">
          {[
            { id: 'latest', label: '最新上传', icon: <Clock className="w-4 h-4" /> },
            { id: 'popular', label: '最受欢迎', icon: <TrendingUp className="w-4 h-4" /> },
            { id: 'trending', label: '热门趋势', icon: <Flame className="w-4 h-4" /> }
          ].map((sortOption) => (
            <button
              key={sortOption.id}
              onClick={() => onSortChange(sortOption.id as 'latest' | 'popular' | 'trending')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                sortBy === sortOption.id
                  ? 'bg-primary-50 text-primary-700 border border-primary-200'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              {sortOption.icon}
              <span>{sortOption.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 分类筛选 */}
      <div className="card p-4">
        <h3 className="font-semibold text-gray-900 mb-3">分类</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategorySelect(category.id === 'all' ? null : category.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                (selectedCategory === category.id || (!selectedCategory && category.id === 'all'))
                  ? 'bg-primary-50 text-primary-700 border border-primary-200'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-3">
                {getCategoryIcon(category.icon)}
                <span>{category.name}</span>
              </div>
              <span className="text-sm bg-gray-100 px-2 py-1 rounded-full">
                {category.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 热门标签 */}
      <div className="card p-4">
        <h3 className="font-semibold text-gray-900 mb-3">热门标签</h3>
        <div className="flex flex-wrap gap-2">
          {popularTags.map((tag) => (
            <button
              key={tag}
              onClick={() => onTagToggle(tag)}
              className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                selectedTags.includes(tag)
                  ? 'bg-primary-100 text-primary-700 border border-primary-300'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* 统计信息 */}
      <div className="card p-4">
        <h3 className="font-semibold text-gray-900 mb-3">统计信息</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">总图片数</span>
            <span className="font-semibold">8</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">总浏览量</span>
            <span className="font-semibold">9,750</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">总点赞数</span>
            <span className="font-semibold">2,166</span>
          </div>
        </div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;