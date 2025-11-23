import React from 'react';
import { useApp } from '../../context/AppContext';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

export const Footer: React.FC = () => {
  const { state } = useApp();

  return (
    <footer className="bg-slate-900" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <div className="flex items-center gap-2">
               <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <span className="text-xl font-bold text-white">{state.config.siteName}</span>
            </div>
            <p className="text-sm leading-6 text-slate-300">
              Making the world a better place through constructing elegant hierarchies.
            </p>
            <div className="flex space-x-6">
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="text-slate-400 hover:text-white">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">Solutions</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li><a href="#" className="text-sm leading-6 text-slate-300 hover:text-white">Marketing</a></li>
                  <li><a href="#" className="text-sm leading-6 text-slate-300 hover:text-white">Analytics</a></li>
                  <li><a href="#" className="text-sm leading-6 text-slate-300 hover:text-white">Commerce</a></li>
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white">Support</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li><a href="#" className="text-sm leading-6 text-slate-300 hover:text-white">Pricing</a></li>
                  <li><a href="#" className="text-sm leading-6 text-slate-300 hover:text-white">Documentation</a></li>
                  <li><a href="#" className="text-sm leading-6 text-slate-300 hover:text-white">Guides</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24">
          <p className="text-xs leading-5 text-slate-400">&copy; 2023 {state.config.siteName}, Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};