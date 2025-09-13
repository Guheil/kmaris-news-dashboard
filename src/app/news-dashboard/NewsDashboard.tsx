'use client';

import { FC, useState } from 'react';
import { Home, Bookmark, BarChart3, Settings, Plus } from 'lucide-react';
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
} from './elements';

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
        navItems={[
          { 
            icon: <Home size={20} />, 
            text: 'News Feed', 
            href: '/news-feed', 
            active: true 
          },
          { 
            icon: <Bookmark size={20} />, 
            text: 'Saved Articles', 
            href: '/saved' 
          },
          { 
            icon: <BarChart3 size={20} />, 
            text: 'Analytics', 
            href: '/analytics' 
          },
          { 
            icon: <Settings size={20} />, 
            text: 'Settings', 
            href: '/settings' 
          },
        ]}
        userName="John Doe"
        userRole="Editor"
        userInitials="JD"
        collapsible={!isMobile} // Hide collapse button on mobile
      />
      
      <Header
        title="News Dashboard"
        breadcrumb={['Home', 'Dashboard', 'News']}
        onMenuToggle={onSidebarToggle}
        onSearch={handleSearch}
        userName="John Doe"
        userRole="Editor"
        userInitials="JD"
        notifications={5}
        isSidebarOpen={sidebarOpen}
        isMobile={isMobile}
        quickActions={[
          {
            label: 'New Article',
            icon: <Plus size={16} />,
            onClick: () => console.log('New article clicked'),
          },
        ]}
      />
      
      <MainContent sidebarOpen={sidebarOpen} isMobile={isMobile}>
        <DashboardGrid>
          <DashboardCard title="Latest News" gridColumn="span 8">
            <p>Latest news content will go here</p>
          </DashboardCard>
          
          <DashboardCard title="Quick Actions" gridColumn="span 4">
            <p>Quick actions will go here</p>
          </DashboardCard>
          
          <DashboardCard title="Analytics Overview" gridColumn="span 6">
            <p>Analytics content will go here</p>
          </DashboardCard>
          
          <DashboardCard title="Recent Activity" gridColumn="span 6">
            <p>Recent activity will go here</p>
          </DashboardCard>
        </DashboardGrid>
      </MainContent>
    </DashboardRoot>
  );
};