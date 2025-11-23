import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Button } from '../ui/Button';

export const Hero: React.FC = () => {
  const { state } = useApp();

  return (
    <section className="relative overflow-hidden bg-slate-50 py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-8 lg:gap-y-20">
          <div className="relative z-10 mx-auto max-w-2xl lg:col-span-7 lg:max-w-none lg:pt-6 xl:col-span-6">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">
              {state.config.heroHeadline}
            </h1>
            <p className="mt-6 text-lg text-slate-600">
              {state.config.heroSubheadline}
            </p>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-4">
              <Button size="lg">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>
          </div>
          <div className="relative mt-10 sm:mt-20 lg:col-span-5 lg:row-span-2 lg:mt-0 xl:col-span-6">
            <div className="absolute left-1/2 top-4 h-[1026px] w-[1026px] -translate-x-1/2 stroke-slate-300/70 [mask-image:linear-gradient(to_bottom,white_20%,transparent_75%)] sm:top-16 sm:-translate-x-1/2 lg:-top-16 lg:ml-12 lg:translate-x-0 lg:translate-y-0">
              <svg viewBox="0 0 1026 1026" aria-hidden="true" className="h-full w-full animate-spin-slow">
                <path
                  d="M1025 513c0 282.77-229.23 512-512 512S1 795.77 1 513 230.23 1 513 1s512 229.23 512 512Z"
                  stroke="currentColor"
                  strokeOpacity="0.7"
                />
                <path
                  d="M513 1025C230.23 1025 1 795.77 1 513"
                  stroke="url(#gradient-1)"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="gradient-1" x1="1" y1="513" x2="1" y2="1025" gradientUnits="userSpaceOnUse">
                    <stop stopColor="var(--primary-color)" />
                    <stop offset="1" stopColor="var(--primary-color)" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="relative rounded-xl bg-slate-900/5 p-2 ring-1 ring-inset ring-slate-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
              <img
                src="https://picsum.photos/800/600?random=10"
                alt="App screenshot"
                className="w-full rounded-md shadow-2xl ring-1 ring-slate-900/10"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};