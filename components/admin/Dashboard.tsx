import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { LayoutDashboard, FileText, Settings, LogOut, Home, Plus, Trash2, Edit2, Upload } from 'lucide-react';
import { BlogPost, SiteConfig } from '../../types';
import { Button } from '../ui/Button';

type Tab = 'overview' | 'posts' | 'settings';

export const Dashboard: React.FC = () => {
  const { state, logout, deletePost, addPost, updatePost, updateConfig } = useApp();
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  
  // Post Editor State
  const [isEditing, setIsEditing] = useState(false);
  
  // Settings State
  const [settingsForm, setSettingsForm] = useState<SiteConfig>(state.config);

  const initialPostState: BlogPost = {
      id: '',
      title: '',
      excerpt: '',
      content: '',
      category: 'General',
      image: 'https://picsum.photos/800/600',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric'}),
      readTime: '5 min read'
  };

  const [postForm, setPostForm] = useState<BlogPost>(initialPostState);

  const handleEditPost = (post: BlogPost) => {
      setPostForm(post);
      setIsEditing(true);
      setActiveTab('posts'); // ensure we are on the view
  };

  const handleCreatePost = () => {
      setPostForm({
          ...initialPostState, 
          id: Date.now().toString(),
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric'})
      });
      setIsEditing(true);
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Basic size check to prevent localStorage quota exceeded errors (limit to ~500KB)
      if (file.size > 500000) {
          alert("File is too large. Please upload an image smaller than 500KB to save to browser storage.");
          e.target.value = ''; // Reset input
          return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPostForm(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const savePost = (e: React.FormEvent) => {
      e.preventDefault();
      const existing = state.posts.find(p => p.id === postForm.id);
      if (existing) {
          updatePost(postForm);
      } else {
          addPost(postForm);
      }
      setIsEditing(false);
  };

  const saveSettings = (e: React.FormEvent) => {
      e.preventDefault();
      updateConfig(settingsForm);
      alert('Settings saved!');
  };

  const renderOverview = () => (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
        <dt className="truncate text-sm font-medium text-slate-500">Total Posts</dt>
        <dd className="mt-1 text-3xl font-semibold tracking-tight text-slate-900">{state.posts.length}</dd>
      </div>
      <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
        <dt className="truncate text-sm font-medium text-slate-500">Site Visits (Simulated)</dt>
        <dd className="mt-1 text-3xl font-semibold tracking-tight text-slate-900">12,402</dd>
      </div>
      <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
        <dt className="truncate text-sm font-medium text-slate-500">Current Theme Color</dt>
        <dd className="mt-1 flex items-center gap-2 text-xl font-semibold tracking-tight text-slate-900">
           <div className="h-6 w-6 rounded-full" style={{ backgroundColor: state.config.primaryColor}}></div>
           {state.config.primaryColor}
        </dd>
      </div>
    </div>
  );

  const renderPosts = () => {
      if (isEditing) {
          return (
              <div className="bg-white p-6 shadow rounded-lg">
                  <div className="flex justify-between items-center mb-6">
                      <h3 className="text-lg font-medium text-slate-900">{postForm.id && state.posts.find(p => p.id === postForm.id) ? 'Edit Post' : 'New Post'}</h3>
                      <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>Cancel</Button>
                  </div>
                  <form onSubmit={savePost} className="space-y-6">
                      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div>
                            <label className="block text-sm font-medium text-slate-700">Title</label>
                            <input type="text" required value={postForm.title} onChange={e => setPostForm({...postForm, title: e.target.value})} className="mt-1 block w-full rounded-md border-slate-300 border p-2 shadow-sm focus:border-primary focus:ring-primary sm:text-sm" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700">Category</label>
                            <input type="text" required value={postForm.category} onChange={e => setPostForm({...postForm, category: e.target.value})} className="mt-1 block w-full rounded-md border-slate-300 border p-2 shadow-sm focus:border-primary focus:ring-primary sm:text-sm" />
                        </div>
                      </div>
                      
                      {/* Image Upload Section */}
                      <div className="space-y-3 p-4 border border-slate-200 rounded-md bg-slate-50">
                          <label className="block text-sm font-medium text-slate-700">Featured Image</label>
                          
                          {/* Image Preview */}
                          {postForm.image && (
                              <div className="relative w-full h-48 bg-gray-200 rounded-md overflow-hidden border border-gray-300">
                                  <img 
                                      src={postForm.image} 
                                      alt="Preview" 
                                      className="w-full h-full object-cover" 
                                  />
                                  <button
                                      type="button"
                                      onClick={() => setPostForm({...postForm, image: ''})}
                                      className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700 shadow-sm"
                                      title="Remove Image"
                                  >
                                      <Trash2 size={16} />
                                  </button>
                              </div>
                          )}

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                  <label className="block text-xs font-medium text-slate-500 mb-1">Option 1: Image URL</label>
                                  <input 
                                      type="text" 
                                      placeholder="https://example.com/image.jpg"
                                      value={postForm.image.startsWith('data:') ? '' : postForm.image} 
                                      onChange={e => setPostForm({...postForm, image: e.target.value})} 
                                      className="block w-full rounded-md border-slate-300 border p-2 shadow-sm focus:border-primary focus:ring-primary sm:text-sm" 
                                  />
                              </div>
                              
                              <div>
                                  <label className="block text-xs font-medium text-slate-500 mb-1">Option 2: Upload File</label>
                                  <div className="flex items-center">
                                      <label className="relative flex items-center justify-center px-4 py-2 w-full border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
                                          <Upload className="mr-2 h-4 w-4 text-gray-400" />
                                          <span>Upload Image</span>
                                          <input 
                                              type="file" 
                                              className="sr-only" 
                                              accept="image/*"
                                              onChange={handleImageFileChange}
                                          />
                                      </label>
                                  </div>
                                  <p className="mt-1 text-xs text-slate-400">Max size 500KB (Storage limit)</p>
                              </div>
                          </div>
                      </div>

                      <div>
                          <label className="block text-sm font-medium text-slate-700">Excerpt (Short Description)</label>
                          <textarea rows={2} required value={postForm.excerpt} onChange={e => setPostForm({...postForm, excerpt: e.target.value})} className="mt-1 block w-full rounded-md border-slate-300 border p-2 shadow-sm focus:border-primary focus:ring-primary sm:text-sm" />
                      </div>
                      <div>
                          <label className="block text-sm font-medium text-slate-700">Full Content</label>
                          <textarea rows={8} required value={postForm.content} onChange={e => setPostForm({...postForm, content: e.target.value})} className="mt-1 block w-full rounded-md border-slate-300 border p-2 shadow-sm focus:border-primary focus:ring-primary sm:text-sm" />
                      </div>
                      <div className="flex justify-end gap-3">
                          <Button variant="outline" type="button" onClick={() => setIsEditing(false)}>Cancel</Button>
                          <Button type="submit">Save Post</Button>
                      </div>
                  </form>
              </div>
          )
      }

      return (
        <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:px-6 flex justify-between items-center border-b border-slate-200">
                <h3 className="text-lg font-medium leading-6 text-slate-900">All Posts</h3>
                <Button size="sm" onClick={handleCreatePost}>
                    <Plus className="h-4 w-4 mr-1" /> Add New
                </Button>
            </div>
            <ul role="list" className="divide-y divide-slate-200">
                {state.posts.map((post) => (
                    <li key={post.id} className="px-4 py-4 sm:px-6 hover:bg-slate-50">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center truncate">
                                <div className="flex-shrink-0 h-10 w-10">
                                    <img className="h-10 w-10 rounded-full object-cover" src={post.image} alt="" />
                                </div>
                                <div className="ml-4 truncate">
                                    <p className="truncate text-sm font-medium text-primary">{post.title}</p>
                                    <p className="text-xs text-slate-500">{post.date} &middot; {post.category}</p>
                                </div>
                            </div>
                            <div className="flex space-x-2">
                                <button onClick={() => handleEditPost(post)} className="text-slate-400 hover:text-primary">
                                    <Edit2 size={18} />
                                </button>
                                <button onClick={() => { if(confirm('Delete this post?')) deletePost(post.id) }} className="text-slate-400 hover:text-red-600">
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
      );
  }

  const renderSettings = () => (
      <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-slate-900 mb-6">Global Site Configuration</h3>
          <form onSubmit={saveSettings} className="space-y-6 max-w-2xl">
              <div>
                  <label className="block text-sm font-medium text-slate-700">Site Name</label>
                  <input type="text" value={settingsForm.siteName} onChange={e => setSettingsForm({...settingsForm, siteName: e.target.value})} className="mt-1 block w-full rounded-md border-slate-300 border p-2 shadow-sm focus:border-primary focus:ring-primary sm:text-sm" />
              </div>
              <div>
                  <label className="block text-sm font-medium text-slate-700">Hero Headline</label>
                  <input type="text" value={settingsForm.heroHeadline} onChange={e => setSettingsForm({...settingsForm, heroHeadline: e.target.value})} className="mt-1 block w-full rounded-md border-slate-300 border p-2 shadow-sm focus:border-primary focus:ring-primary sm:text-sm" />
              </div>
              <div>
                  <label className="block text-sm font-medium text-slate-700">Hero Subheadline</label>
                  <textarea rows={3} value={settingsForm.heroSubheadline} onChange={e => setSettingsForm({...settingsForm, heroSubheadline: e.target.value})} className="mt-1 block w-full rounded-md border-slate-300 border p-2 shadow-sm focus:border-primary focus:ring-primary sm:text-sm" />
              </div>
              <div>
                  <label className="block text-sm font-medium text-slate-700">Brand Primary Color (Hex)</label>
                  <div className="mt-1 flex items-center gap-3">
                    <input type="color" value={settingsForm.primaryColor} onChange={e => setSettingsForm({...settingsForm, primaryColor: e.target.value})} className="h-10 w-20 p-1 rounded border border-slate-300" />
                    <input type="text" value={settingsForm.primaryColor} onChange={e => setSettingsForm({...settingsForm, primaryColor: e.target.value})} className="block w-full rounded-md border-slate-300 border p-2 shadow-sm focus:border-primary focus:ring-primary sm:text-sm" />
                  </div>
                  <p className="mt-1 text-xs text-slate-500">Changes reflect immediately on the live site.</p>
              </div>
              <div className="pt-4 border-t border-slate-200">
                  <Button type="submit">Save Changes</Button>
              </div>
          </form>
      </div>
  );

  return (
    <div className="min-h-screen bg-slate-100">
      <nav className="bg-slate-900 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <span className="font-bold text-xl">Admin Dashboard</span>
            </div>
            <div className="flex items-center gap-4">
              <button onClick={logout} className="p-2 text-slate-400 hover:text-white" title="Logout">
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
          <aside className="py-6 px-2 sm:px-6 lg:col-span-3 lg:py-0 lg:px-0">
            <nav className="space-y-1">
              <button
                onClick={() => setActiveTab('overview')}
                className={`${activeTab === 'overview' ? 'bg-white text-primary shadow' : 'text-slate-600 hover:bg-white/50 hover:text-slate-900'} group flex w-full items-center rounded-md px-3 py-2 text-sm font-medium`}
              >
                <LayoutDashboard className={`mr-3 h-6 w-6 flex-shrink-0 ${activeTab === 'overview' ? 'text-primary' : 'text-slate-400'}`} />
                Overview
              </button>
              <button
                onClick={() => { setActiveTab('posts'); setIsEditing(false); }}
                className={`${activeTab === 'posts' ? 'bg-white text-primary shadow' : 'text-slate-600 hover:bg-white/50 hover:text-slate-900'} group flex w-full items-center rounded-md px-3 py-2 text-sm font-medium`}
              >
                <FileText className={`mr-3 h-6 w-6 flex-shrink-0 ${activeTab === 'posts' ? 'text-primary' : 'text-slate-400'}`} />
                Posts
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`${activeTab === 'settings' ? 'bg-white text-primary shadow' : 'text-slate-600 hover:bg-white/50 hover:text-slate-900'} group flex w-full items-center rounded-md px-3 py-2 text-sm font-medium`}
              >
                <Settings className={`mr-3 h-6 w-6 flex-shrink-0 ${activeTab === 'settings' ? 'text-primary' : 'text-slate-400'}`} />
                Settings
              </button>
            </nav>
          </aside>

          <main className="lg:col-span-9">
            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'posts' && renderPosts()}
            {activeTab === 'settings' && renderSettings()}
          </main>
        </div>
      </div>
    </div>
  );
};