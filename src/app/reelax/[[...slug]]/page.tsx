'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function ReelaxProxy() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  useEffect(() => {
    // Get the path after /reelax
    const proxyPath = pathname.replace('/reelax', '');
    const queryString = searchParams.toString();
    
    // Build the target URL
    let targetUrl = 'https://reelax-tau.vercel.app' + proxyPath;
    if (queryString) {
      targetUrl += '?' + queryString;
    }
    
    // Redirect to the external site
    window.location.href = targetUrl;
  }, [pathname, searchParams]);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      fontSize: '18px',
      color: '#666'
    }}>
      Redirecting to Reelax...
    </div>
  );
}
