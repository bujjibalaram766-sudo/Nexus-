import { BlogPost, Service, SiteConfig } from './types';

export const DEFAULT_CONFIG: SiteConfig = {
  siteName: 'AmGoChat',
  primaryColor: '#2563eb', // Blue-600
  heroHeadline: 'Elevate Your Business Communication',
  heroSubheadline: 'Connecting enterprises with seamless, secure, and scalable messaging solutions tailored for modern growth.',
  contactEmail: 'contact@amgochat.com'
};

export const INITIAL_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'The Future of Enterprise Messaging',
    excerpt: 'How AI and automation are reshaping the way businesses communicate internally.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    image: 'https://picsum.photos/800/600?random=1',
    category: 'Technology',
    date: 'Oct 12, 2023',
    readTime: '5 min read'
  },
  {
    id: '2',
    title: 'Security First: Protecting Client Data',
    excerpt: 'Why end-to-end encryption is non-negotiable in today\'s digital landscape.',
    content: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    image: 'https://picsum.photos/800/600?random=2',
    category: 'Security',
    date: 'Nov 05, 2023',
    readTime: '3 min read'
  },
  {
    id: '3',
    title: 'Scaling Your Support Team Globally',
    excerpt: 'Strategies for managing a 24/7 support team across multiple time zones.',
    content: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
    image: 'https://picsum.photos/800/600?random=3',
    category: 'Management',
    date: 'Dec 15, 2023',
    readTime: '7 min read'
  }
];

export const SERVICES: Service[] = [
  {
    id: 's1',
    title: 'Global Connectivity',
    description: 'Reach customers anywhere in the world with our low-latency global network infrastructure.',
    iconName: 'Globe'
  },
  {
    id: 's2',
    title: 'Enterprise Security',
    description: 'Bank-grade encryption and compliance features to keep your business communications secure.',
    iconName: 'Shield'
  },
  {
    id: 's3',
    title: 'Instant Scalability',
    description: 'Infrastructure that grows with you. Handle millions of messages without missing a beat.',
    iconName: 'TrendingUp'
  },
  {
    id: 's4',
    title: 'Lightning Fast',
    description: 'Optimized protocols ensure real-time delivery for critical business alerts and chat.',
    iconName: 'Zap'
  }
];