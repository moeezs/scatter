'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ReelaxPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [useIframe, setUseIframe] = useState(true);

  useEffect(() => {
    // Set loading to false after a short delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const handleIframeError = () => {
    setError('Failed to load Reelax application');
    setIsLoading(false);
  };

  const openInNewTab = () => {
    window.open('https://reelax-tau.vercel.app', '_blank', 'noopener,noreferrer');
  };

  const toggleEmbedMode = () => {
    setUseIframe(!useIframe);
    setError(null);
    setIsLoading(true);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-black/90 backdrop-blur-sm border-b border-white/10 p-4 sticky top-0 z-50">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <Link 
              href="/" 
              className="text-white/70 hover:text-white transition-colors flex items-center space-x-2"
            >
              <span>←</span>
              <span>Back to Scatter</span>
            </Link>
            <div className="h-4 w-px bg-white/20" />
            <h1 className="text-xl font-medium">Reelax</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleEmbedMode}
              className="text-sm text-white/70 hover:text-white transition-colors px-3 py-1 rounded border border-white/20 hover:border-white/40"
            >
              {useIframe ? 'Direct Access' : 'Embed Mode'}
            </button>
            <button 
              onClick={openInNewTab}
              className="text-sm text-white/70 hover:text-white transition-colors flex items-center space-x-1"
            >
              <span>Open in new tab</span>
              <span>↗</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative">
        {useIframe ? (
          <>
            {/* Loading state */}
            {isLoading && (
              <div className="flex items-center justify-center h-96">
                <div className="text-center">
                  <div className="animate-spin w-8 h-8 border-2 border-white/20 border-t-white rounded-full mx-auto mb-4"></div>
                  <p className="text-white/70">Loading Reelax...</p>
                  <p className="text-white/50 text-sm mt-2">This may take a moment</p>
                </div>
              </div>
            )}

            {/* Error state */}
            {error && (
              <div className="flex items-center justify-center h-96">
                <div className="text-center space-y-4">
                  <p className="text-red-400">{error}</p>
                  <div className="space-y-2">
                    <button 
                      onClick={openInNewTab}
                      className="block mx-auto px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                    >
                      Open Reelax directly
                    </button>
                    <button 
                      onClick={toggleEmbedMode}
                      className="block mx-auto px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 rounded-lg transition-colors text-sm"
                    >
                      Try direct access mode
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Iframe container */}
            <div className="relative" style={{ height: 'calc(100vh - 80px)' }}>
              <iframe
                src="https://reelax-tau.vercel.app"
                className={`w-full h-full border-0 ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}
                onLoad={handleIframeLoad}
                onError={handleIframeError}
                title="Reelax Application"
                allow="fullscreen; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-top-navigation allow-downloads allow-presentation"
                referrerPolicy="origin"
              />
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center space-y-6 p-8">
              <h2 className="text-2xl font-bold">Access Reelax Directly</h2>
              <p className="text-white/70 max-w-md">
                If the embedded version isn't working properly, you can access Reelax directly in a new tab.
              </p>
              <div className="space-y-4">
                <button 
                  onClick={openInNewTab}
                  className="block mx-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors font-medium"
                >
                  Open Reelax →
                </button>
                <button 
                  onClick={toggleEmbedMode}
                  className="block mx-auto px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-sm"
                >
                  ← Back to embed mode
                </button>
              </div>
              <div className="text-xs text-white/50 mt-8">
                <p>URL: https://reelax-tau.vercel.app</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
