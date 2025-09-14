'use client';

import { FC, useState, useMemo } from 'react';
import { Home, FileText, BarChart3, Settings, Plus, Eye, Edit, Trash2, TrendingUp, Users, Calendar, Play, Search } from 'lucide-react';
import { Sidebar } from '@/components/sidebar/Sidebar';
import { Header } from '@/components/header/Header';
import { DashboardProps, CardProps } from './interface';
import {
  DashboardRoot,
  MainContent,
  DashboardGrid,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  SidebarOverlay,
  StatsGrid,
  StatCard,
  StatIcon,
  StatNumber,
  StatLabel,
  NewsTable,
  NewsTableHeader,
  NewsTableRow,
  NewsTitle,
  NewsImage,
  NewsTitleText,
  NewsAuthor,
  NewsDate,
  NewsViews,
  ActionButtons,
  ActionButton,
  CategoryBadge,
  QuickActionGrid,
  QuickActionButton,
  ActivityItem,
  ActivityIcon,
  ActivityContent,
  ActivityText,
  ActivityTime,
  NoResults,
  NoResultsIcon,
  NoResultsTitle,
  NoResultsText,
  SearchResultsHeader,
  SearchResultsCount,
  SearchQuery,
  ClearSearchButton,
  VideoPlaceholder
} from './elements';
import { styled } from '@mui/material/styles';
import { palette } from '@/theme/pallete';
import { NewsArticle } from './interface';

import { sampleNews } from './sampleData';


// Updated NewsTitle component to handle both images and videos
const MediaPreview: FC<{ article: NewsArticle }> = ({ article }) => {
  if (article.newsImage) {
    return <NewsImage src={article.newsImage} alt={article.title} />;
  } else if (article.newsVideo) {
    return (
      <VideoPlaceholder>
        <Play size={20} />
      </VideoPlaceholder>
    );
  } else {
    return (
      <VideoPlaceholder>
        <FileText size={20} />
      </VideoPlaceholder>
    );
  }
};

const DashboardCard: FC<CardProps> = ({ title, gridColumn = 'span 4', children }) => (
  <Card style={{ gridColumn }}>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>{children}</CardContent>
  </Card>
);

export const NewsDashboard: FC<DashboardProps> = ({ 
  sidebarOpen, 
  onSidebarToggle, 
  isMobile = false 
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Enhanced search functionality
  const filteredNews = useMemo(() => {
    if (!searchQuery.trim()) {
      return sampleNews;
    }

    const query = searchQuery.toLowerCase().trim();
    return sampleNews.filter(article => 
      article.title.toLowerCase().includes(query) ||
      article.author.toLowerCase().includes(query) ||
      article.category.toLowerCase().includes(query) ||
      article.description.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  const handleOverlayClick = () => {
    if (isMobile) {
      onSidebarToggle();
    }
  };

  // Calculate statistics based on filtered results
  const displayedNews = filteredNews;
  const totalArticles = displayedNews.length;
  const uniqueCategories = new Set(displayedNews.map(article => article.category)).size;
  const totalViews = displayedNews.reduce((sum, article) => sum + (article.views || 0), 0);
  const averageViews = totalArticles > 0 ? totalViews / totalArticles : 0;
  
  const categoryCounts = displayedNews.reduce((acc, article) => {
    acc[article.category] = (acc[article.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const mostPopularCategory = Object.keys(categoryCounts).length > 0 
    ? Object.keys(categoryCounts).reduce((a, b) => 
        categoryCounts[a] > categoryCounts[b] ? a : b
      )
    : 'N/A';

  return (
    <DashboardRoot>
      {/* Mobile overlay */}
      <SidebarOverlay 
        show={isMobile && sidebarOpen} 
        onClick={handleOverlayClick}
      />
      
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={onSidebarToggle}
        navSections={[
          {
            title: "Overview",
            items: [
              { icon: <Home size={20} />, text: "Dashboard", href: "/dashboard", active: true },
              { icon: <BarChart3 size={20} />, text: "Analytics", href: "/analytics" },
            ],
          },
          {
            title: "News Management",
            items: [
              { icon: <FileText size={20} />, text: "All Articles", href: "/news-dashboard/articles" },
              { icon: <Plus size={20} />, text: "Create Article", href: "/news-dashboard/create-article" },
            ],
          }
        ]}
        userName="John Doe"
        userRole="Editor"
        userInitials="JD"
        collapsible={!isMobile}
        navItems={[]}
      />
      
      <Header
        title="News Dashboard"
        onMenuToggle={onSidebarToggle}
        onSearch={handleSearch}
        searchValue={searchQuery}
        userName="John Doe"
        userRole="Editor"
        userInitials="JD"
        notifications={3}
        isSidebarOpen={sidebarOpen}
        isMobile={isMobile}
      />
      
      <MainContent sidebarOpen={sidebarOpen} isMobile={isMobile}>
        {/* Updated Statistics Cards - now reflect search results */}
        <StatsGrid>
          <StatCard>
            <StatIcon color={palette.primary.main}>
              <FileText size={20} />
            </StatIcon>
            <StatNumber>{totalArticles}</StatNumber>
            <StatLabel>{searchQuery ? 'Found Articles' : 'Total Articles'}</StatLabel>
          </StatCard>
          <StatCard>
            <StatIcon color="#10b981">
              <Settings size={20} />
            </StatIcon>
            <StatNumber>{uniqueCategories}</StatNumber>
            <StatLabel>{searchQuery ? 'Categories Found' : 'Total Categories'}</StatLabel>
          </StatCard>
          <StatCard>
            <StatIcon color="#f59e0b">
              <TrendingUp size={20} />
            </StatIcon>
            <StatNumber>{totalArticles > 0 ? (averageViews / 1000).toFixed(1) + 'K' : '0'}</StatNumber>
            <StatLabel>Avg. Views per Article</StatLabel>
          </StatCard>
          <StatCard>
            <StatIcon color="#8b5cf6">
              <Users size={20} />
            </StatIcon>
            <StatNumber style={{ fontSize: mostPopularCategory.length > 10 ? '20px' : '28px' }}>
              {mostPopularCategory}
            </StatNumber>
            <StatLabel>Top Category</StatLabel>
          </StatCard>
        </StatsGrid>

        <DashboardGrid>
          <DashboardCard 
            title={searchQuery ? "Search Results" : "Recent Articles"} 
            gridColumn="span 8"
          >
            <NewsTable>
              {/* Search results header */}
              {searchQuery && (
                <SearchResultsHeader>
                  <SearchResultsCount>
                    {totalArticles} result{totalArticles !== 1 ? 's' : ''} for{' '}
                    <SearchQuery>"{searchQuery}"</SearchQuery>
                  </SearchResultsCount>
                  <ClearSearchButton onClick={clearSearch}>
                    Clear Search
                  </ClearSearchButton>
                </SearchResultsHeader>
              )}

              {totalArticles > 0 ? (
                <>
                  <NewsTableHeader>
                    <div>Article</div>
                    <div>Author</div>
                    <div>Date</div>
                    <div>Views</div>
                    <div>Actions</div>
                  </NewsTableHeader>
                  {displayedNews.map((article) => (
                    <NewsTableRow key={article.id}>
                      <NewsTitle>
                        <MediaPreview article={article} />
                        <div>
                          <NewsTitleText>{article.title}</NewsTitleText>
                          <CategoryBadge category={article.category}>
                            {article.category}
                          </CategoryBadge>
                        </div>
                      </NewsTitle>
                      <NewsAuthor>{article.author}</NewsAuthor>
                      <NewsDate>{new Date(article.date).toLocaleDateString()}</NewsDate>
                      <NewsViews>
                        <Eye size={14} />
                        {(article.views || 0).toLocaleString()}
                      </NewsViews>
                      <ActionButtons>
                        <ActionButton variant="view" title="View Article">
                          <Eye size={14} />
                        </ActionButton>
                        <ActionButton variant="edit" title="Edit Article">
                          <Edit size={14} />
                        </ActionButton>
                        <ActionButton variant="delete" title="Delete Article">
                          <Trash2 size={14} />
                        </ActionButton>
                      </ActionButtons>
                    </NewsTableRow>
                  ))}
                </>
              ) : (
                // No results state
                <NoResults>
                  <NoResultsIcon>
                    <Search size={28} />
                  </NoResultsIcon>
                  <NoResultsTitle>No articles found</NoResultsTitle>
                  <NoResultsText>
                    We couldn't find any articles matching "{searchQuery}".
                    <br />
                    Try adjusting your search terms or browse all articles.
                  </NoResultsText>
                </NoResults>
              )}
            </NewsTable>
          </DashboardCard>
          
          <DashboardCard title="Quick Actions" gridColumn="span 4">
            <QuickActionGrid>
              <QuickActionButton>
                <Plus size={16} />
                Create New Article
              </QuickActionButton>
              <QuickActionButton>
                <FileText size={16} />
                Manage Categories
              </QuickActionButton>
              <QuickActionButton>
                <BarChart3 size={16} />
                View Analytics
              </QuickActionButton>
              <QuickActionButton>
                <Settings size={16} />
                Dashboard Settings
              </QuickActionButton>
            </QuickActionGrid>
          </DashboardCard>
          
          <DashboardCard 
            title={searchQuery ? "Recent Activity (All)" : "Recent Activity"} 
            gridColumn="span 12"
          >
            <div>
              <ActivityItem>
                <ActivityIcon color={palette.primary.main}>
                  <Plus size={16} />
                </ActivityIcon>
                <ActivityContent>
                  <ActivityText>New article "{sampleNews[0]?.title}" was published</ActivityText>
                  <ActivityTime>2 minutes ago</ActivityTime>
                </ActivityContent>
              </ActivityItem>
              <ActivityItem>
                <ActivityIcon color="#10b981">
                  <Edit size={16} />
                </ActivityIcon>
                <ActivityContent>
                  <ActivityText>Article "{sampleNews[1]?.title}" was updated</ActivityText>
                  <ActivityTime>15 minutes ago</ActivityTime>
                </ActivityContent>
              </ActivityItem>
              <ActivityItem>
                <ActivityIcon color="#f59e0b">
                  <FileText size={16} />
                </ActivityIcon>
                <ActivityContent>
                  <ActivityText>Draft "{sampleNews[3]?.title}" saved</ActivityText>
                  <ActivityTime>1 hour ago</ActivityTime>
                </ActivityContent>
              </ActivityItem>
              <ActivityItem>
                <ActivityIcon color="#8b5cf6">
                  <Trash2 size={16} />
                </ActivityIcon>
                <ActivityContent>
                  <ActivityText>Article "{sampleNews[4]?.title}" was archived</ActivityText>
                  <ActivityTime>3 hours ago</ActivityTime>
                </ActivityContent>
              </ActivityItem>
            </div>
          </DashboardCard>
        </DashboardGrid>
      </MainContent>
    </DashboardRoot>
  );
};