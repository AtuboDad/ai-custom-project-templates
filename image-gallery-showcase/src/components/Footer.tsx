import React from 'react';
import { motion } from 'framer-motion';
import { Github, Twitter, Instagram, Heart, Code } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-gray-900 text-white mt-12"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* 品牌信息 */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-primary-500 rounded-lg">
                <Code className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold">图片展示模板</span>
            </div>
            <p className="text-gray-400 mb-4">
              现代化的图片展示解决方案，基于React + TypeScript + Tailwind CSS构建
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* 快速链接 */}
          <div>
            <h3 className="font-semibold text-lg mb-4">快速链接</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">首页</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">探索图片</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">热门分类</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">上传图片</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">关于我们</a></li>
            </ul>
          </div>

          {/* 分类 */}
          <div>
            <h3 className="font-semibold text-lg mb-4">图片分类</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">自然风光</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">城市建筑</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">天文摄影</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">美食生活</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">动物世界</a></li>
            </ul>
          </div>

          {/* 技术栈 */}
          <div>
            <h3 className="font-semibold text-lg mb-4">技术栈</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-gray-400">React 18</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-400">TypeScript</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                <span className="text-gray-400">Tailwind CSS</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-gray-400">Framer Motion</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-gray-400">Vite</span>
              </div>
            </div>
          </div>
        </div>

        {/* 底部版权 */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-400 mb-4 md:mb-0">
              © 2024 图片展示模板. 保留所有权利.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">隐私政策</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">服务条款</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie政策</a>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-center gap-2 text-gray-500">
            <Heart className="w-4 h-4" />
            <span>Made with love by AI Custom Project Templates</span>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;