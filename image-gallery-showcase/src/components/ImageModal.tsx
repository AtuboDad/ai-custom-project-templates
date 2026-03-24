import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Download, Share2, ChevronLeft, ChevronRight, User, Calendar, Tag } from 'lucide-react';
import { ImageItem } from '../types';

interface ImageModalProps {
  image: ImageItem | null;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  hasNext: boolean;
  hasPrev: boolean;
}

const ImageModal: React.FC<ImageModalProps> = ({
  image,
  isOpen,
  onClose,
  onNext,
  onPrev,
  hasNext,
  hasPrev
}) => {
  if (!image) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 遮罩层 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50"
            onClick={onClose}
          />
          
          {/* 模态框内容 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full max-w-6xl bg-white rounded-2xl overflow-hidden">
              {/* 头部操作栏 */}
              <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white">
                    <img 
                      src={image.author.avatar} 
                      alt={image.author.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">{image.author.name}</h4>
                    <p className="text-sm text-white/80">摄影师</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <button className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors">
                    <Heart className="w-5 h-5 text-white" />
                  </button>
                  <button className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors">
                    <Download className="w-5 h-5 text-white" />
                  </button>
                  <button className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors">
                    <Share2 className="w-5 h-5 text-white" />
                  </button>
                  <button 
                    onClick={onClose}
                    className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>

              {/* 图片展示 */}
              <div className="relative h-[70vh] bg-gray-900">
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-full object-contain"
                />
                
                {/* 导航按钮 */}
                {hasPrev && (
                  <button
                    onClick={onPrev}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6 text-white" />
                  </button>
                )}
                
                {hasNext && (
                  <button
                    onClick={onNext}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                  >
                    <ChevronRight className="w-6 h-6 text-white" />
                  </button>
                )}
              </div>

              {/* 底部信息 */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{image.title}</h2>
                    <p className="text-gray-600">{image.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-primary-600">{image.likes}</div>
                    <div className="text-sm text-gray-500">点赞数</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* 基本信息 */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">上传时间：</span>
                      <span className="font-medium">{image.createdAt}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">分类：</span>
                      <span className="font-medium">{image.category}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">作者：</span>
                      <span className="font-medium">{image.author.name}</span>
                    </div>
                  </div>

                  {/* 标签 */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">标签</h4>
                    <div className="flex flex-wrap gap-2">
                      {image.tags.map((tag) => (
                        <span 
                          key={tag} 
                          className="px-3 py-1.5 bg-primary-50 text-primary-700 rounded-lg text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* 统计信息 */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">统计信息</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">分辨率</span>
                        <span className="font-medium">{image.width} × {image.height}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">浏览量</span>
                        <span className="font-medium">{image.views.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">点赞率</span>
                        <span className="font-medium">
                          {((image.likes / image.views) * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ImageModal;