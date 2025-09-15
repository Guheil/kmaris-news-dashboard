'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { EditArticlePage } from './EditArticlePage';

export default function EditArticlePageRoot() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const params = useParams();
  const router = useRouter();
  
  // Get article ID from URL parameters
  const articleId = params.id as string;

  useEffect(() => {
    // Check if mobile on mount
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 960); // md breakpoint
      // On mobile, default to closed
      if (window.innerWidth < 960) {
        setSidebarOpen(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Redirect if no article ID is provided
  useEffect(() => {
    if (!articleId) {
      router.push('/news-dashboard/articles');
    }
  }, [articleId, router]);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (!articleId) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '16px',
        color: '#64748b'
      }}>
        Loading...
      </div>
    );
  }

  return (
    <EditArticlePage 
      sidebarOpen={sidebarOpen} 
      onSidebarToggle={handleSidebarToggle}
      isMobile={isMobile}
      articleId={articleId}
    />
  );
}