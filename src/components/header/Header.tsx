'use client';

import { FC, useState } from 'react';
import { Menu, Search, Bell, Settings, Plus } from 'lucide-react';
import { HeaderProps, IconButtonProps, QuickAction } from './interface';
import {
  HeaderRoot,
  LeftSection,
  MenuButton,
  PageTitle,
  Breadcrumb,
  BreadcrumbItem,
  RightSection,
  SearchBar,
  SearchInput,
  SearchIcon,
  ActionButtons,
  IconButton,
  NotificationBadge,
  NotificationCount,
  UserButton,
  UserAvatar,
  UserInfo,
  UserName,
  UserRole,
  QuickActions,
  QuickActionButton,
} from './elements';

const HeaderIconButton: FC<IconButtonProps> = ({ 
  icon, 
  onClick, 
  hasNotification, 
  notificationCount 
}) => (
  <IconButton onClick={onClick} hasNotification={hasNotification}>
    {icon}
    {hasNotification && (
      notificationCount && notificationCount > 0 ? (
        <NotificationCount>
          {notificationCount > 99 ? '99+' : notificationCount}
        </NotificationCount>
      ) : (
        <NotificationBadge />
      )
    )}
  </IconButton>
);

const QuickActionComponent: FC<{ action: QuickAction }> = ({ action }) => (
  <QuickActionButton onClick={action.onClick}>
    {action.icon}
    {action.label}
  </QuickActionButton>
);

export const Header: FC<HeaderProps> = ({
  title,
  breadcrumb,
  onMenuToggle,
  userName = 'User',
  userRole = 'Member',
  userInitials = 'U',
  onSearch,
  notifications = 0,
  isSidebarOpen = true,
  isMobile = false,
  quickActions,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  return (
    <HeaderRoot isSidebarOpen={isSidebarOpen} isMobile={isMobile}>
      <LeftSection>
        {isMobile && (
          <MenuButton onClick={onMenuToggle}>
            <Menu size={20} />
          </MenuButton>
        )}
        <div>
          <PageTitle>{title}</PageTitle>
          {breadcrumb && breadcrumb.length > 0 && (
            <Breadcrumb>
              {breadcrumb.map((item, index) => (
                <BreadcrumbItem key={index}>{item}</BreadcrumbItem>
              ))}
            </Breadcrumb>
          )}
        </div>
      </LeftSection>

      <RightSection>
        <SearchBar>
          <form onSubmit={handleSearch}>
            <SearchInput
              type="text"
              placeholder="Search anything..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <SearchIcon>
              <Search size={18} />
            </SearchIcon>
          </form>
        </SearchBar>

        {quickActions && quickActions.length > 0 && (
          <QuickActions>
            {quickActions.map((action, index) => (
              <QuickActionComponent key={index} action={action} />
            ))}
          </QuickActions>
        )}

        <ActionButtons>
          <HeaderIconButton
            icon={<Bell size={18} />}
            hasNotification={notifications > 0}
            notificationCount={notifications}
            onClick={() => console.log('Notifications clicked')}
          />
          <HeaderIconButton
            icon={<Settings size={18} />}
            onClick={() => console.log('Settings clicked')}
          />
        </ActionButtons>

        <UserButton>
          <UserAvatar>{userInitials}</UserAvatar>
          <UserInfo>
            <UserName>{userName}</UserName>
            <UserRole>{userRole}</UserRole>
          </UserInfo>
        </UserButton>
      </RightSection>
    </HeaderRoot>
  );
};