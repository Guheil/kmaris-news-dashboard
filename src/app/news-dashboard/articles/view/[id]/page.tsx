// app/news-dashboard/articles/view/[id]/page.tsx
"use client";

import { FC, useState, useEffect } from "react";
import { useParams } from "next/navigation";
import ViewArticlePage from "./ViewArticlesPage";

const Page: FC = () => {
  const params = useParams();
  const articleId = params?.id as string | undefined;

  // State for sidebar
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Initialize isMobile with a default value for SSR
  const [isMobile, setIsMobile] = useState(false);

  // Update isMobile only on the client
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Handle sidebar toggle
  const handleSidebarToggle = () => {
    setSidebarOpen((prev) => !prev);
  };

  // Validate articleId
  if (!articleId) {
    return <div>Error: Invalid article ID</div>;
  }

  return (
    <ViewArticlePage
      sidebarOpen={sidebarOpen}
      onSidebarToggle={handleSidebarToggle}
      isMobile={isMobile}
      articleId={articleId}
    />
  );
};
export default Page;