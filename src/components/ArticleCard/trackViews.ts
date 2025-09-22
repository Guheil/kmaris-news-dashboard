import { Article } from './interface'; 

// Function to increment article views, runs only once per device
export const incrementArticleViews = async (articleId: string, article: Article) => {
  try {
    // Use localStorage to track viewed articles on this device
    const viewedArticlesKey = 'viewedArticles';
    const viewedArticles = JSON.parse(localStorage.getItem(viewedArticlesKey) || '[]') as string[];

    // Check if article has already been viewed on this device
    if (viewedArticles.includes(articleId)) {
      return; // Exit if already viewed
    }

    // Add article ID to viewed articles
    viewedArticles.push(articleId);
    localStorage.setItem(viewedArticlesKey, JSON.stringify(viewedArticles));

    // Make API call to increment views
    const response = await fetch(`/api/articles/${articleId}/increment-views`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ articleId }),
    });

    if (!response.ok) {
      throw new Error(`Failed to increment views: ${response.statusText}`);
    }

    // Optional: Update local article state if needed
    return await response.json(); // Return updated article data if API sends it
  } catch (error) {
    console.error('Error incrementing article views:', error);
    // Silently fail to avoid disrupting user experience
  }
};