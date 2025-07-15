'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

function setFavicon(url: string) {
  let link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']");
  if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.head.appendChild(link);
  }
  link.href = url;
}

const PROJECTS = {
  reelax: {
    name: 'Reelax',
    url: 'https://reelax-tau.vercel.app',
    description: 'A relaxing video streaming experience'
  },
};

export default function ProjectPage() {
  const params = useParams();
  const projectId = params.project as string;
  const project = PROJECTS[projectId as keyof typeof PROJECTS];
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!project) {
      setError('Project not found');
      setIsLoading(false);
    } else {

      const faviconUrl = project.url.replace(/\/$/, '') + '/favicon.ico';
      setFavicon(faviconUrl);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    }

  }, [project]);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const handleIframeError = () => {
    setError('Failed to load project');
    setIsLoading(false);
  };

  if (!project) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
          <p className="text-white/70 mb-6">The project "{projectId}" doesn't exist.</p>
          <Link 
            href="/" 
            className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-screen h-screen overflow-hidden">
      {isLoading && (
        <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
          <div className="animate-spin w-8 h-8 border-2 border-white/20 border-t-white rounded-full"></div>
        </div>
      )}

      {error && (
        <div className="w-full h-full bg-black flex items-center justify-center">
          <div className="text-center text-white">
            <p className="mb-4">Unable to load content</p>
            <a 
              href={project.url}
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300"
            >
              Open directly
            </a>
          </div>
        </div>
      )}

      {!error && (
        <iframe
          src={project.url}
          className="w-full h-full border-0 block"
          onLoad={handleIframeLoad}
          onError={handleIframeError}
          title={`${project.name} Application`}
          allow="fullscreen; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-top-navigation allow-downloads allow-presentation"
          referrerPolicy="origin"
        />
      )}
    </div>
  );
}
