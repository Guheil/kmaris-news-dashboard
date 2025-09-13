'use client';

import { FC, useState } from 'react';
import { Menu, Search, Bell, Settings } from 'lucide-react';
import { HeaderProps, IconButtonProps } from './interface';
import {
  HeaderRoot,
  LeftSection,
  MenuButton,
  PageTitle,
  CenterSection,
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

export const Header: FC<HeaderProps> = ({
  title,
  onMenuToggle,
  userName = 'User',
  userRole = 'Admin',
  userInitials = 'U',
  onSearch,
  notifications = 0,
  isSidebarOpen = true,
  isMobile = false,
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
            <Menu size={22} />
          </MenuButton>
        )}
        <PageTitle>{title}</PageTitle>
      </LeftSection>

      <CenterSection>
        <SearchBar>
          <form onSubmit={handleSearch}>
            <SearchInput
              type="text"
              placeholder="Search news, articles, categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <SearchIcon>
              <Search size={20} />
            </SearchIcon>
          </form>
        </SearchBar>
      </CenterSection>

      <RightSection>
        <ActionButtons>
          <HeaderIconButton
            icon={<Bell size={20} />}
            hasNotification={notifications > 0}
            notificationCount={notifications}
            onClick={() => console.log('Notifications clicked')}
          />
          <HeaderIconButton
            icon={<Settings size={20} />}
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