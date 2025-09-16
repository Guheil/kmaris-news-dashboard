// app/api/analytics/route.ts
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";

export async function GET(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db(); // Uses default database from connection string
    const collection = db.collection("articles");

    // Get all articles
    const articles = await collection.find({}).toArray();

    if (!articles || articles.length === 0) {
      return NextResponse.json({
        overview: {
          totalArticles: 0,
          publishedArticles: 0,
          archivedArticles: 0,
          totalViews: 0,
          averageViews: 0,
        },
        categoryStats: [],
        monthlyStats: [],
        topArticles: [],
        recentActivity: [],
        statusDistribution: [],
        viewsOverTime: [],
      });
    }

    // Calculate overview statistics
    const totalArticles = articles.length;
    const publishedArticles = articles.filter(
      (article) => (article.status || 'published') === 'published'
    ).length;
    const archivedArticles = articles.filter(
      (article) => article.status === 'archived'
    ).length;
    const totalViews = articles.reduce((sum, article) => sum + (article.views || 0), 0);
    const averageViews = totalArticles > 0 ? Math.round(totalViews / totalArticles) : 0;

    // Category statistics
    const categoryMap = new Map();
    articles.forEach((article) => {
      const category = article.category || 'Uncategorized';
      if (!categoryMap.has(category)) {
        categoryMap.set(category, {
          name: category,
          count: 0,
          views: 0,
          published: 0,
          archived: 0,
        });
      }
      const stats = categoryMap.get(category);
      stats.count++;
      stats.views += article.views || 0;
      if ((article.status || 'published') === 'published') {
        stats.published++;
      } else if (article.status === 'archived') {
        stats.archived++;
      }
    });
    const categoryStats = Array.from(categoryMap.values()).sort((a, b) => b.count - a.count);

    // Monthly statistics (last 12 months)
    const now = new Date();
    const monthlyMap = new Map();
    
    // Initialize last 12 months
    for (let i = 11; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      monthlyMap.set(key, {
        month: date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        articles: 0,
        views: 0,
        published: 0,
        archived: 0,
      });
    }

    // Populate with actual data
    articles.forEach((article) => {
      const articleDate = new Date(article.date || article.createdAt);
      const key = `${articleDate.getFullYear()}-${String(articleDate.getMonth() + 1).padStart(2, '0')}`;
      
      if (monthlyMap.has(key)) {
        const stats = monthlyMap.get(key);
        stats.articles++;
        stats.views += article.views || 0;
        if ((article.status || 'published') === 'published') {
          stats.published++;
        } else if (article.status === 'archived') {
          stats.archived++;
        }
      }
    });

    const monthlyStats = Array.from(monthlyMap.values());

    // Top articles by views (limited to 5)
    const topArticles = articles
      .sort((a, b) => (b.views || 0) - (a.views || 0))
      .slice(0, 5)
      .map((article) => ({
        _id: article._id,
        title: article.title,
        category: article.category,
        views: article.views || 0,
        date: article.date || article.createdAt,
        status: article.status || 'published',
        readTime: article.readTime,
      }));

    // Recent activity (last 5 articles by date)
    const recentActivity = articles
      .sort((a, b) => new Date(b.date || b.createdAt).getTime() - new Date(a.date || a.createdAt).getTime())
      .slice(0, 5)
      .map((article) => ({
        _id: article._id,
        title: article.title,
        category: article.category,
        date: article.date || article.createdAt,
        status: article.status || 'published',
        views: article.views || 0,
      }));

    // Status distribution for pie chart
    const statusDistribution = [
      { name: 'Published', value: publishedArticles, color: '#10b981' },
      { name: 'Archived', value: archivedArticles, color: '#f59e0b' },
    ].filter(item => item.value > 0);

    // Views over time (last 30 days simulation - you might want to track this differently)
    const viewsOverTime = [];
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      // Simulate daily views based on article creation dates and views
      let dailyViews = 0;
      articles.forEach((article) => {
        const articleDate = new Date(article.date || article.createdAt);
        const daysSincePublication = Math.floor((date.getTime() - articleDate.getTime()) / (1000 * 60 * 60 * 24));
        
        if (daysSincePublication >= 0 && daysSincePublication <= 30) {
          // Simulate decreasing views over time
          const baseViews = (article.views || 0) / 30;
          const decayFactor = Math.max(0.1, 1 - (daysSincePublication * 0.03));
          dailyViews += Math.floor(baseViews * decayFactor * (0.5 + Math.random() * 0.5));
        }
      });
      
      viewsOverTime.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        views: Math.max(0, dailyViews),
      });
    }

    // Performance metrics
    const performanceMetrics = {
      averageViewsPerCategory: categoryStats.map(cat => ({
        category: cat.name,
        averageViews: cat.count > 0 ? Math.round(cat.views / cat.count) : 0,
      })),
      publicationTrend: {
        thisMonth: monthlyStats[monthlyStats.length - 1]?.articles || 0,
        lastMonth: monthlyStats[monthlyStats.length - 2]?.articles || 0,
      },
      viewsTrend: {
        thisMonth: monthlyStats[monthlyStats.length - 1]?.views || 0,
        lastMonth: monthlyStats[monthlyStats.length - 2]?.views || 0,
      },
    };

    const analyticsData = {
      overview: {
        totalArticles,
        publishedArticles,
        archivedArticles,
        totalViews,
        averageViews,
      },
      categoryStats,
      monthlyStats,
      topArticles,
      recentActivity,
      statusDistribution,
      viewsOverTime,
      performanceMetrics,
    };

    return NextResponse.json(analyticsData);
  } catch (error) {
    console.error("Analytics API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics data" },
      { status: 500 }
    );
  }
}