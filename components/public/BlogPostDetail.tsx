import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ViewState } from '../../types';
import { Button } from '../ui/Button';
import { ArrowLeft, Calendar, User, Clock, Twitter, Linkedin, Facebook, Link as LinkIcon, Check } from 'lucide-react';

export const BlogPostDetail: React.FC = () => {
  const { state, activePostId, setView, viewPost } = useApp();
  const [copied, setCopied] = useState(false);
  const post = state.posts.find(p => p.id === activePostId);

  if (!post) {
    return (
      <div className="py-24 text-center">
        <h2 className="text-2xl font-bold text-slate-900">Post not found</h2>
        <div className="mt-4">
          <Button onClick={() => setView(ViewState.PUBLIC_BLOG)}>Return to Blog</Button>
        </div>
      </div>
    );
  }

  // Filter related posts (same category, excluding current)
  const relatedPosts = state.posts
    .filter(p => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

  const shareUrl = `https://amgochat.com/post/${post.id}`;
  const shareTitle = post.title;

  const handleShare = (platform: 'twitter' | 'linkedin' | 'facebook') => {
    let url = '';
    switch(platform) {
        case 'twitter':
            url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`;
            break;
        case 'linkedin':
            url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
            break;
        case 'facebook':
            url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
            break;
    }
    window.open(url, '_blank', 'width=600,height=400');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <article className="py-16 sm:py-24 bg-white">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <Button variant="outline" size="sm" onClick={() => setView(ViewState.PUBLIC_BLOG)} className="mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
        </Button>
        
        <div className="mb-8">
             <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 mb-4">
                {post.category}
              </span>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl mb-6">{post.title}</h1>
            
             <div className="flex flex-wrap items-center gap-6 text-slate-500 text-sm border-b border-slate-100 pb-8">
                <div className="flex items-center">
                   <Calendar className="mr-2 h-4 w-4" />
                   {post.date}
                </div>
                <div className="flex items-center">
                   <Clock className="mr-2 h-4 w-4" />
                   {post.readTime}
                </div>
                 <div className="flex items-center">
                   <User className="mr-2 h-4 w-4" />
                   Admin
                </div>
             </div>
        </div>

        <div className="aspect-video w-full overflow-hidden rounded-2xl shadow-lg mb-10">
          <img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
          />
        </div>

        <div className="prose prose-lg prose-slate max-w-none mb-12">
            {post.content.split('\n').map((paragraph, idx) => (
                paragraph.trim() && (
                  <p key={idx} className="mb-4 text-slate-600 leading-relaxed">
                      {paragraph}
                  </p>
                )
            ))}
        </div>

        {/* Social Share Section */}
        <div className="border-t border-slate-200 pt-8 mb-16">
            <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
              Share this post
              <span className="h-px flex-1 bg-slate-100"></span>
            </h3>
            <div className="flex gap-4">
                <button 
                    onClick={() => handleShare('twitter')} 
                    title="Share on Twitter"
                    className="group flex items-center justify-center h-10 w-10 rounded-full bg-slate-100 text-slate-600 hover:bg-[#1DA1F2] hover:text-white transition-all duration-200"
                    aria-label="Share on Twitter"
                >
                    <Twitter size={18} />
                </button>
                <button 
                    onClick={() => handleShare('linkedin')} 
                    title="Share on LinkedIn"
                    className="group flex items-center justify-center h-10 w-10 rounded-full bg-slate-100 text-slate-600 hover:bg-[#0A66C2] hover:text-white transition-all duration-200"
                    aria-label="Share on LinkedIn"
                >
                    <Linkedin size={18} />
                </button>
                <button 
                    onClick={() => handleShare('facebook')} 
                    title="Share on Facebook"
                    className="group flex items-center justify-center h-10 w-10 rounded-full bg-slate-100 text-slate-600 hover:bg-[#1877F2] hover:text-white transition-all duration-200"
                    aria-label="Share on Facebook"
                >
                    <Facebook size={18} />
                </button>
                <button 
                    onClick={copyToClipboard} 
                    title="Copy Link"
                    className="group flex items-center justify-center h-10 w-10 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-800 hover:text-white transition-all duration-200 relative"
                    aria-label="Copy Link"
                >
                    {copied ? <Check size={18} className="text-green-500 group-hover:text-green-400" /> : <LinkIcon size={18} />}
                </button>
            </div>
        </div>

        {/* Related Posts Section */}
        {relatedPosts.length > 0 && (
          <div className="border-t border-slate-200 pt-16">
             <h2 className="text-2xl font-bold tracking-tight text-slate-900 mb-8">Related Articles</h2>
             <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
               {relatedPosts.map((related) => (
                 <div key={related.id} className="group cursor-pointer flex flex-col h-full" onClick={() => viewPost(related.id)}>
                   <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-slate-100 mb-4">
                     <img 
                       src={related.image} 
                       alt={related.title} 
                       className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" 
                     />
                   </div>
                   <div className="flex flex-col flex-1">
                     <span className="text-xs font-medium text-primary mb-2">{related.category}</span>
                     <h3 className="text-base font-bold text-slate-900 group-hover:text-primary transition-colors line-clamp-2 mb-2">
                       {related.title}
                     </h3>
                     <p className="text-sm text-slate-600 line-clamp-2">{related.excerpt}</p>
                   </div>
                 </div>
               ))}
             </div>
          </div>
        )}

      </div>
    </article>
  );
};