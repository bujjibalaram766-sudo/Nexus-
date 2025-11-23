export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: 'TrendingUp' | 'Shield' | 'Zap' | 'Globe';
}

export interface SiteConfig {
  siteName: string;
  primaryColor: string;
  heroHeadline: string;
  heroSubheadline: string;
  contactEmail: string;
}

export interface AppState {
  config: SiteConfig;
  posts: BlogPost[];
  isAuthenticated: boolean;
}

export enum ViewState {
  PUBLIC_HOME = 'PUBLIC_HOME',
  PUBLIC_BLOG = 'PUBLIC_BLOG',
  PUBLIC_POST_DETAIL = 'PUBLIC_POST_DETAIL',
  LOGIN = 'LOGIN',
  ADMIN_DASHBOARD = 'ADMIN_DASHBOARD'
}