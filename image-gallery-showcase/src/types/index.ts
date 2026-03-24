export interface ImageItem {
  id: string;
  title: string;
  description: string;
  url: string;
  thumbnailUrl: string;
  category: string;
  tags: string[];
  width: number;
  height: number;
  createdAt: string;
  likes: number;
  views: number;
  author: {
    name: string;
    avatar: string;
  };
}

export interface Category {
  id: string;
  name: string;
  count: number;
  icon: string;
}

export interface FilterOptions {
  category: string | null;
  tags: string[];
  sortBy: 'latest' | 'popular' | 'trending';
  searchQuery: string;
}