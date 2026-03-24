import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Eye, Download, MoreVertical } from 'lucide-react';
import { ImageItem } from '../types';

interface ImageCardProps {
  image: ImageItem;
  index: number;
  onLike: (id: string) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ image, index, onLike }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    onLike(image.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -5 }}
      className="card overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 图片容器 */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        <img
          src={image.thumbnailUrl}
          alt={image.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* 悬停遮罩 */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white">
                  <img 
                    src={image.author.avatar} 
                    alt={image.author.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-white text-sm font-medium">{image.author.name}</span>
              </div>
              <button className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors">
                <MoreVertical className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* 操作按钮 */}
        <div className={`absolute top-4 right-4 flex flex-col gap-2 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <button 
            onClick={handleLike}
            className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors"
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-500 text-red-500' : 'text-white'}`} />
          </button>
          <button className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors">
            <Download className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      {/* 内容区域 */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-semibold text-gray-900 line-clamp-1">{image.title}</h3>
            <p className="text-sm text-gray-600 line-clamp-2 mt-1">{image.description}</p>
          </div>
        </div>

        {/* 标签 */}
        <div className="flex flex-wrap gap-1 mb-3">
          {image.tags.slice(0, 3).map((tag) => (
            <span 
              key={tag} 
              className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-md"
            >
              {tag}
            </span>
          ))}
          {image.tags.length > 3 && (
            <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-md">
              +{image.tags.length - 3}
            </span>
          )}
        </div>

        {/* 统计信息 */}
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Heart className="w-4 h-4" />
              <span>{image.likes + (isLiked ? 1 : 0)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              <span>{image.views}</span>
            </div>
          </div>
          <span className="text-xs text-gray-500">{image.createdAt}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ImageCard;