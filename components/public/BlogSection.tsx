import React from 'react';
import { useApp } from '../../context/AppContext';
import { Calendar, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

export const BlogSection: React.FC = () => {
  const { state, viewPost } = useApp();
  const posts = state.posts;

  return (
    <section className="py-24 bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">From the Blog</h2>
          <p className="mt-2 text-lg leading-8 text-slate-600">
            Learn how to grow your business with our expert advice.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.length === 0 ? (
            <div className="col-span-3 text-center py-10 text-slate-500">
              No posts available yet. Check back soon!
            </div>
          ) : (
            posts.map((post) => (
              <article key={post.id} className="flex flex-col items-start justify-between bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden h-full">
                <div className="w-full h-48 overflow-hidden cursor-pointer" onClick={() => viewPost(post.id)}>
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 flex flex-col flex-grow w-full">
                  <div className="flex-1">
                    <div className="flex items-center gap-x-4 text-xs">
                        <time dateTime={post.date} className="text-slate-500 flex items-center">
                            <Calendar size={12} className="mr-1" />
                            {post.date}
                        </time>
                        <span className="relative z-10 rounded-full bg-slate-100 px-3 py-1.5 font-medium text-slate-600 hover:bg-slate-200">
                        {post.category}
                        </span>
                    </div>
                    <div className="group relative mt-3">
                        <h3 className="text-lg font-semibold leading-6 text-slate-900 group-hover:text-primary transition-colors cursor-pointer" onClick={() => viewPost(post.id)}>
                            {post.title}
                        </h3>
                        <p className="mt-5 line-clamp-3 text-sm leading-6 text-slate-600">
                        {post.excerpt}
                        </p>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-slate-100 w-full">
                    <Button variant="outline" size="sm" onClick={() => viewPost(post.id)}>
                        Read More <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </section>
  );
};