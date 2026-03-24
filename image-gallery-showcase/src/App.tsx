import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ImageCard from './components/ImageCard';
import ImageModal from './components/ImageModal';
import Footer from './components/Footer';
import { images, categories, popularTags } from './data/images';
import { ImageItem, FilterOptions } from './types';
import { Filter, Grid, List } from 'lucide-react';

function App() {
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    category: null,
    tags: [],
    sortBy: 'latest',
    searchQuery: ''
  });

  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // 过滤和排序图片
  const filteredImages = useMemo(() => {
    let result = [...images];

    // 搜索过滤
    if (filterOptions.searchQuery) {
      const query = filterOptions.searchQuery.toLowerCase();
      result = result.filter(img => 
        img.title.toLowerCase().includes(query) ||
        img.description.toLowerCase().includes(query) ||
        img.tags.some(tag => tag.toLowerCase().includes(query)) ||
        img.author.name.toLowerCase().includes(query)
      );
    }

    // 分类过滤
    if (filterOptions.category) {
      const category = categories.find(c => c.id === filterOptions.category);
      if (category && category.id !== 'all') {
        result = result.filter(img => img.category === category.name);
      }
    }

    // 标签过滤
    if (filterOptions.tags.length > 0) {
      result = result.filter(img => 
        filterOptions.tags.every(tag => img.tags.includes(tag))
      );
    }

    // 排序
    switch (filterOptions.sortBy) {
      case 'latest':
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'popular':
        result.sort((a, b) => b.likes - a.likes);
        break;
      case 'trending':
        result.sort((a, b) => (b.likes / b.views) - (a.likes / a.views));
        break;
    }

    return result;
  }, [filterOptions]);

  // 处理图片点击
  const handleImageClick = (image: ImageItem) => {
    setSelectedImage(image);
  };

  // 处理点赞
  const handleLike = (imageId: string) => {
    console.log('Liked image:', imageId);
    // 在实际应用中，这里会调用API更新点赞数
  };

  // 获取当前选中图片的索引
  const currentImageIndex = selectedImage 
    ? filteredImages.findIndex(img => img.id === selectedImage.id)
    : -1;

  // 导航到下一张图片
  const handleNext = () => {
    if (currentImageIndex < filteredImages.length - 1) {
      setSelectedImage(filteredImages[currentImageIndex + 1]);
    }
  };

  // 导航到上一张图片
  const handlePrev = () => {
    if (currentImageIndex > 0) {
      setSelectedImage(filteredImages[currentImageIndex - 1]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        searchQuery={filterOptions.searchQuery}
        onSearchChange={(query) => setFilterOptions(prev => ({ ...prev, searchQuery: query }))}
      />

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* 侧边栏 */}
          <div className="lg:w-64">
            <Sidebar
              categories={categories}
              selectedCategory={filterOptions.category}
              onCategorySelect={(category) => setFilterOptions(prev => ({ ...prev, category }))}
              popularTags={popularTags}
              selectedTags={filterOptions.tags}
              onTagToggle={(tag) => {
                setFilterOptions(prev => ({
                  ...prev,
                  tags: prev.tags.includes(tag)
                    ? prev.tags.filter(t => t !== tag)
                    : [...prev.tags, tag]
                }));
              }}
              sortBy={filterOptions.sortBy}
              onSortChange={(sortBy) => setFilterOptions(prev => ({ ...prev, sortBy }))}
            />
          </div>

          {/* 主内容区 */}
          <div className="flex-1">
            {/* 工具栏 */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-500" />
                <span className="font-medium text-gray-700">
                  找到 {filteredImages.length} 张图片
                </span>
                {filterOptions.tags.length > 0 && (
                  <span className="text-sm text-gray-500">
                    （已选择 {filterOptions.tags.length} 个标签）
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === 'grid' 
                        ? 'bg-white shadow-sm text-primary-600' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === 'list' 
                        ? 'bg-white shadow-sm text-primary-600' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* 图片网格 */}
            {filteredImages.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <div className="text-gray-400 mb-4">📷</div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">未找到匹配的图片</h3>
                <p className="text-gray-500">尝试调整搜索条件或筛选器</p>
              </motion.div>
            ) : (
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                {filteredImages.map((image, index) => (
                  <div 
                    key={image.id} 
                    onClick={() => handleImageClick(image)}
                    className="cursor-pointer"
                  >
                    <ImageCard 
                      image={image} 
                      index={index}
                      onLike={handleLike}
                    />
                  </div>
                ))}
              </div>
            )}

            {/* 分页占位 */}
            {filteredImages.length > 0 && (
              <div className="mt-8 flex justify-center">
                <div className="flex items-center gap-2">
                  <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                    上一页
                  </button>
                  <span className="px-4 py-2 text-gray-700">第 1 页，共 1 页</span>
                  <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                    下一页
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />

      {/* 图片模态框 */}
      <ImageModal
        image={selectedImage}
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        onNext={handleNext}
        onPrev={handlePrev}
        hasNext={currentImageIndex < filteredImages.length - 1}
        hasPrev={currentImageIndex > 0}
      />
    </div>
  );
}

export default App;