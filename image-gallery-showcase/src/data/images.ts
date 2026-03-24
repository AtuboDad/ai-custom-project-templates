import { ImageItem } from '../types';

// 使用 Cloudinary CDN 的示例图片
const CLOUDINARY_BASE = 'https://res.cloudinary.com/demo/image/upload';

export const images: ImageItem[] = [
  {
    id: '1',
    title: '山间日出',
    description: '壮丽的山脉日出景色，金色的阳光洒在山峰上',
    url: `${CLOUDINARY_BASE}/v1700000000/samples/landscapes/mountains-sunrise.jpg`,
    thumbnailUrl: `${CLOUDINARY_BASE}/w_400,h_300,c_fill/v1700000000/samples/landscapes/mountains-sunrise.jpg`,
    category: '自然风光',
    tags: ['山脉', '日出', '自然', '风景'],
    width: 1920,
    height: 1080,
    createdAt: '2024-01-15',
    likes: 245,
    views: 1200,
    author: {
      name: '摄影爱好者',
      avatar: `${CLOUDINARY_BASE}/w_100,h_100,c_fill/v1700000000/samples/people/boy-snow-hoodie.jpg`
    }
  },
  {
    id: '2',
    title: '城市夜景',
    description: '现代都市的璀璨夜景，高楼大厦灯火辉煌',
    url: `${CLOUDINARY_BASE}/v1700000000/samples/city-night.jpg`,
    thumbnailUrl: `${CLOUDINARY_BASE}/w_400,h_300,c_fill/v1700000000/samples/city-night.jpg`,
    category: '城市建筑',
    tags: ['城市', '夜景', '建筑', '灯光'],
    width: 1920,
    height: 1080,
    createdAt: '2024-01-14',
    likes: 189,
    views: 980,
    author: {
      name: '城市探索者',
      avatar: `${CLOUDINARY_BASE}/w_100,h_100,c_fill/v1700000000/samples/people/smiling-man.jpg`
    }
  },
  {
    id: '3',
    title: '海滩日落',
    description: '宁静的海滩日落，天空呈现橙紫色渐变',
    url: `${CLOUDINARY_BASE}/v1700000000/samples/beach-sunset.jpg`,
    thumbnailUrl: `${CLOUDINARY_BASE}/w_400,h_300,c_fill/v1700000000/samples/beach-sunset.jpg`,
    category: '自然风光',
    tags: ['海滩', '日落', '海洋', '天空'],
    width: 1920,
    height: 1080,
    createdAt: '2024-01-13',
    likes: 312,
    views: 1500,
    author: {
      name: '旅行摄影师',
      avatar: `${CLOUDINARY_BASE}/w_100,h_100,c_fill/v1700000000/samples/people/kitchen-bar.jpg`
    }
  },
  {
    id: '4',
    title: '森林小径',
    description: '幽静的森林小径，阳光透过树叶洒下斑驳光影',
    url: `${CLOUDINARY_BASE}/v1700000000/samples/forest-path.jpg`,
    thumbnailUrl: `${CLOUDINARY_BASE}/w_400,h_300,c_fill/v1700000000/samples/forest-path.jpg`,
    category: '自然风光',
    tags: ['森林', '小径', '树木', '光影'],
    width: 1920,
    height: 1080,
    createdAt: '2024-01-12',
    likes: 178,
    views: 850,
    author: {
      name: '自然观察者',
      avatar: `${CLOUDINARY_BASE}/w_100,h_100,c_fill/v1700000000/samples/people/woman-hat.jpg`
    }
  },
  {
    id: '5',
    title: '现代建筑',
    description: '极具设计感的现代建筑，几何线条与光影的完美结合',
    url: `${CLOUDINARY_BASE}/v1700000000/samples/modern-architecture.jpg`,
    thumbnailUrl: `${CLOUDINARY_BASE}/w_400,h_300,c_fill/v1700000000/samples/modern-architecture.jpg`,
    category: '城市建筑',
    tags: ['现代', '建筑', '设计', '几何'],
    width: 1920,
    height: 1080,
    createdAt: '2024-01-11',
    likes: 267,
    views: 1100,
    author: {
      name: '建筑摄影师',
      avatar: `${CLOUDINARY_BASE}/w_100,h_100,c_fill/v1700000000/samples/people/man-portrait.jpg`
    }
  },
  {
    id: '6',
    title: '星空银河',
    description: '璀璨的星空与银河，在无光污染的山顶拍摄',
    url: `${CLOUDINARY_BASE}/v1700000000/samples/night-sky.jpg`,
    thumbnailUrl: `${CLOUDINARY_BASE}/w_400,h_300,c_fill/v1700000000/samples/night-sky.jpg`,
    category: '天文摄影',
    tags: ['星空', '银河', '天文', '夜晚'],
    width: 1920,
    height: 1080,
    createdAt: '2024-01-10',
    likes: 421,
    views: 1800,
    author: {
      name: '天文爱好者',
      avatar: `${CLOUDINARY_BASE}/w_100,h_100,c_fill/v1700000000/samples/people/glasses-man.jpg`
    }
  },
  {
    id: '7',
    title: '美食摄影',
    description: '精致的美食摆盘，色彩鲜艳令人食欲大增',
    url: `${CLOUDINARY_BASE}/v1700000000/samples/food-delicious.jpg`,
    thumbnailUrl: `${CLOUDINARY_BASE}/w_400,h_300,c_fill/v1700000000/samples/food-delicious.jpg`,
    category: '美食生活',
    tags: ['美食', '摄影', '摆盘', '色彩'],
    width: 1920,
    height: 1080,
    createdAt: '2024-01-09',
    likes: 198,
    views: 920,
    author: {
      name: '美食博主',
      avatar: `${CLOUDINARY_BASE}/w_100,h_100,c_fill/v1700000000/samples/food/spices.jpg`
    }
  },
  {
    id: '8',
    title: '野生动物',
    description: '在自然栖息地拍摄的野生动物特写',
    url: `${CLOUDINARY_BASE}/v1700000000/samples/wildlife.jpg`,
    thumbnailUrl: `${CLOUDINARY_BASE}/w_400,h_300,c_fill/v1700000000/samples/wildlife.jpg`,
    category: '动物世界',
    tags: ['动物', '野生动物', '自然', '特写'],
    width: 1920,
    height: 1080,
    createdAt: '2024-01-08',
    likes: 356,
    views: 1400,
    author: {
      name: '野生动物摄影师',
      avatar: `${CLOUDINARY_BASE}/w_100,h_100,c_fill/v1700000000/samples/animals/three-dogs.jpg`
    }
  }
];

export const categories = [
  { id: 'all', name: '全部', count: images.length, icon: 'Grid' },
  { id: 'nature', name: '自然风光', count: images.filter(img => img.category === '自然风光').length, icon: 'Mountain' },
  { id: 'city', name: '城市建筑', count: images.filter(img => img.category === '城市建筑').length, icon: 'Building' },
  { id: 'astronomy', name: '天文摄影', count: images.filter(img => img.category === '天文摄影').length, icon: 'Star' },
  { id: 'food', name: '美食生活', count: images.filter(img => img.category === '美食生活').length, icon: 'Utensils' },
  { id: 'animals', name: '动物世界', count: images.filter(img => img.category === '动物世界').length, icon: 'PawPrint' }
];

export const popularTags = [
  '山脉', '日出', '城市', '夜景', '海滩', '日落', 
  '森林', '建筑', '星空', '美食', '动物', '自然'
];