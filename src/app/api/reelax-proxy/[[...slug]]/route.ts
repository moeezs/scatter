import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Get the path after /api/reelax-proxy/
    const pathname = request.nextUrl.pathname;
    const searchParams = request.nextUrl.searchParams;
    
    // Extract the path after /api/reelax-proxy
    const proxyPath = pathname.replace('/api/reelax-proxy', '');
    
    // Build the target URL
    let targetUrl = 'https://reelax-tau.vercel.app' + proxyPath;
    if (searchParams.toString()) {
      targetUrl += '?' + searchParams.toString();
    }
    
    console.log('Proxying to:', targetUrl);
    
    // Fetch from the external site
    const response = await fetch(targetUrl, {
      method: 'GET',
      headers: {
        'User-Agent': request.headers.get('user-agent') || '',
        'Accept': request.headers.get('accept') || '*/*',
        'Accept-Language': request.headers.get('accept-language') || 'en-US,en;q=0.9',
        'Cache-Control': 'no-cache',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const contentType = response.headers.get('content-type') || 'text/html';
    
    if (contentType.includes('text/html')) {
      // For HTML content, we need to modify it to work with the proxy
      let html = await response.text();
      
      // Replace absolute URLs with relative ones
      html = html.replace(/https:\/\/reelax-tau\.vercel\.app/g, '/reelax');
      html = html.replace(/href="\/_next/g, 'href="https://reelax-tau.vercel.app/_next');
      html = html.replace(/src="\/_next/g, 'src="https://reelax-tau.vercel.app/_next');
      html = html.replace(/src="\/favicon/g, 'src="https://reelax-tau.vercel.app/favicon');
      
      return new NextResponse(html, {
        status: response.status,
        headers: {
          'Content-Type': contentType,
          'Cache-Control': 'no-cache',
        },
      });
    } else {
      // For non-HTML content (CSS, JS, images), just proxy it
      const buffer = await response.arrayBuffer();
      return new NextResponse(buffer, {
        status: response.status,
        headers: {
          'Content-Type': contentType,
          'Cache-Control': 'public, max-age=31536000',
        },
      });
    }
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to proxy request' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  return GET(request);
}
