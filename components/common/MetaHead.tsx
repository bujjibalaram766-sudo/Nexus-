import React, { useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { ViewState } from '../../types';

export const MetaHead: React.FC = () => {
  const { state, currentView, activePostId } = useApp();
  const { siteName, heroSubheadline } = state.config;

  useEffect(() => {
    let title = siteName;
    let description = heroSubheadline;

    switch (currentView) {
      case ViewState.PUBLIC_HOME:
        title = `${siteName} - Home`;
        description = heroSubheadline;
        break;
      case ViewState.PUBLIC_BLOG:
        title = `Blog - ${siteName}`;
        description = `Read the latest news and updates from ${siteName}.`;
        break;
      case ViewState.PUBLIC_POST_DETAIL:
        const post = state.posts.find(p => p.id === activePostId);
        if (post) {
            title = `${post.title} - ${siteName}`;
            description = post.excerpt;
        } else {
            title = `Post Not Found - ${siteName}`;
        }
        break;
      case ViewState.LOGIN:
        title = `Login - ${siteName}`;
        description = `Login to the ${siteName} admin dashboard.`;
        break;
      case ViewState.ADMIN_DASHBOARD:
        title = `Dashboard - ${siteName}`;
        description = `Manage your website content and settings.`;
        break;
      default:
        title = siteName;
    }

    // Update Title
    document.title = title;

    // Update Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);

  }, [currentView, siteName, heroSubheadline, activePostId, state.posts]);

  return null;
};