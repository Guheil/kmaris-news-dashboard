'use client';

import { FC, useState } from 'react';
import { Home, FileText, BarChart3, Settings, Plus, Eye, Edit, Trash2, TrendingUp, Users, Calendar, Clock } from 'lucide-react';
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
  StatusBadge,
  QuickActionGrid,
  QuickActionButton,
  ActivityItem,
  ActivityIcon,
  ActivityContent,
  ActivityText,
  ActivityTime,
} from './elements';
import { styled } from '@mui/material/styles';
import { palette } from '@/theme/pallete';
import { NewsArticle } from './interface';

// Sample data
const sampleNews: NewsArticle[] = [
  {
    id: '1',
    title: 'Revolutionary AI Technology Transforms Healthcare Industry',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop',
    summary: 'Latest breakthrough in artificial intelligence promises to revolutionize patient care and medical diagnostics.',
    content: 'Full article content about AI in healthcare...',
    author: 'Dr. Sarah Johnson',
    publishDate: '2024-01-15',
    category: 'Technology',
    views: 15420,
    status: 'published'
  },
  {
    id: '2',
    title: 'Global Climate Summit Reaches Historic Agreement',
    imageUrl: 'https://images.unsplash.com/photo-1569163139394-de44aa2b7c85?w=400&h=300&fit=crop',
    summary: 'World leaders commit to ambitious carbon reduction targets in landmark climate deal.',
    content: 'Full article content about climate summit...',
    author: 'Michael Chen',
    publishDate: '2024-01-14',
    category: 'Environment',
    views: 23150,
    status: 'published'
  },
  {
    id: '3',
    title: 'Stock Market Surges to Record High Following Fed Announcement',
    imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop',
    summary: 'Markets rally after Federal Reserve signals potential interest rate cuts.',
    content: 'Full article content about stock market...',
    author: 'Jennifer Williams',
    publishDate: '2024-01-13',
    category: 'Finance',
    views: 18750,
    status: 'published'
  },
  {
    id: '4',
    title: 'New Space Mission to Mars Launches Successfully',
    imageUrl: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=300&fit=crop',
    summary: 'NASA\'s latest Mars rover begins its journey to search for signs of ancient life.',
    content: 'Full article content about Mars mission...',
    author: 'Dr. Robert Martinez',
    publishDate: '2024-01-12',
    category: 'Science',
    views: 12340,
    status: 'draft'
  },
  {
    id: '5',
    title: 'Breakthrough in Renewable Energy Storage Technology',
    imageUrl: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=400&h=300&fit=crop',
    summary: 'Scientists develop new battery technology that could store renewable energy for weeks.',
    content: 'Full article content about energy storage...',
    author: 'Dr. Lisa Thompson',
    publishDate: '2024-01-11',
    category: 'Technology',
    views: 9876,
    status: 'published'
  }
];

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

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Implement search functionality
  };

  const handleOverlayClick = () => {
    if (isMobile) {
      onSidebarToggle();
    }
  };

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
              { icon: <FileText size={20} />, text: "All Articles", href: "/news" },
              { icon: <Plus size={20} />, text: "Create Article", href: "/news/create" },
              { icon: <Settings size={20} />, text: "Categories", href: "/categories" },
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
        userName="John Doe"
        userRole="Editor"
        userInitials="JD"
        notifications={3}
        isSidebarOpen={sidebarOpen}
        isMobile={isMobile}
      />
      
      <MainContent sidebarOpen={sidebarOpen} isMobile={isMobile}>
        {/* Statistics Cards */}
        <StatsGrid>
          <StatCard>
            <StatIcon color={palette.primary.main}>
              <FileText size={20} />
            </StatIcon>
            <StatNumber>147</StatNumber>
            <StatLabel>Total Articles</StatLabel>
          </StatCard>
          <StatCard>
            <StatIcon color="#10b981">
              <TrendingUp size={20} />
            </StatIcon>
            <StatNumber>89.2K</StatNumber>
            <StatLabel>Total Views</StatLabel>
          </StatCard>
          <StatCard>
            <StatIcon color="#f59e0b">
              <Users size={20} />
            </StatIcon>
            <StatNumber>12.4K</StatNumber>
            <StatLabel>Active Readers</StatLabel>
          </StatCard>
          <StatCard>
            <StatIcon color="#8b5cf6">
              <Calendar size={20} />
            </StatIcon>
            <StatNumber>23</StatNumber>
            <StatLabel>Published Today</StatLabel>
          </StatCard>
        </StatsGrid>

        <DashboardGrid>
          <DashboardCard title="Recent Articles" gridColumn="span 8">
            <NewsTable>
              <NewsTableHeader>
                <div>Article</div>
                <div>Author</div>
                <div>Date</div>
                <div>Views</div>
                <div>Actions</div>
              </NewsTableHeader>
              {sampleNews.map((article) => (
                <NewsTableRow key={article.id}>
                  <NewsTitle>
                    <NewsImage src={article.imageUrl} alt={article.title} />
                    <div>
                      <NewsTitleText>{article.title}</NewsTitleText>
                      <StatusBadge status={article.status}>{article.status}</StatusBadge>
                    </div>
                  </NewsTitle>
                  <NewsAuthor>{article.author}</NewsAuthor>
                  <NewsDate>{new Date(article.publishDate).toLocaleDateString()}</NewsDate>
                  <NewsViews>
                    <Eye size={14} />
                    {article.views.toLocaleString()}
                  </NewsViews>
                  <ActionButtons>
                    <ActionButton variant="view">
                      <Eye size={14} />
                    </ActionButton>
                    <ActionButton variant="edit">
                      <Edit size={14} />
                    </ActionButton>
                    <ActionButton variant="delete">
                      <Trash2 size={14} />
                    </ActionButton>
                  </ActionButtons>
                </NewsTableRow>
              ))}
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
          
          <DashboardCard title="Recent Activity" gridColumn="span 12">
            <div>
              <ActivityItem>
                <ActivityIcon color={palette.primary.main}>
                  <Plus size={16} />
                </ActivityIcon>
                <ActivityContent>
                  <ActivityText>New article "AI in Healthcare" was published</ActivityText>
                  <ActivityTime>2 minutes ago</ActivityTime>
                </ActivityContent>
              </ActivityItem>
              <ActivityItem>
                <ActivityIcon color="#10b981">
                  <Edit size={16} />
                </ActivityIcon>
                <ActivityContent>
                  <ActivityText>Article "Climate Summit" was updated</ActivityText>
                  <ActivityTime>15 minutes ago</ActivityTime>
                </ActivityContent>
              </ActivityItem>
              <ActivityItem>
                <ActivityIcon color="#f59e0b">
                  <FileText size={16} />
                </ActivityIcon>
                <ActivityContent>
                  <ActivityText>Draft "Mars Mission" saved</ActivityText>
                  <ActivityTime>1 hour ago</ActivityTime>
                </ActivityContent>
              </ActivityItem>
              <ActivityItem>
                <ActivityIcon color="#8b5cf6">
                  <Trash2 size={16} />
                </ActivityIcon>
                <ActivityContent>
                  <ActivityText>Article "Old News" was archived</ActivityText>
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