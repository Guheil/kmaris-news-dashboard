'use client';

import { FC, useState, useRef, useEffect } from 'react';
import { Menu, Search, Bell, Settings, User, LogOut, ChevronDown } from 'lucide-react';
import Swal from "sweetalert2";
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
  UserDropdownContainer,
  UserButton,
  UserAvatar,
  UserInfo,
  UserName,
  UserRole,
  DropdownMenu,
  DropdownHeader,
  DropdownUserName,
  DropdownUserRole,
  DropdownItem,
} from './elements';

const HeaderIconButton: FC<IconButtonProps> = ({ 
  icon, 
  onClick, 
  hasNotification, 
  notificationCount 
}) => (
  <IconButton onClick={onClick}>
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
  onLogout,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

 const handleLogout = async () => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "Do you want to log out? You'll be redirected to the login page!",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Yes, log out!",
    cancelButtonText: "No, stay logged in!",
  });

  if (!result.isConfirmed) return;

  try {
    setIsDropdownOpen(false);

    // Perform logout API call if provided
    if (onLogout) {
      await onLogout();
    }

    // Redirect to login page
    window.location.href = "https://kmaris-news-dashboard.vercel.app/";

    await Swal.fire({
      title: "Success!",
      text: "You have been logged out successfully!",
      icon: "success",
      confirmButtonText: "OK",
      timer: 3000,
      timerProgressBar: true,
    });
  } catch (err) {
    console.error("Error during logout:", err);
    await Swal.fire({
      title: "Error!",
      text: "Failed to log out. Please try again.",
      icon: "error",
      confirmButtonText: "OK",
    });
  }
};
  const handleProfileClick = () => {
    setIsDropdownOpen(false);
    console.log('Profile clicked');
    // Navigate to profile page
  };

  const handleSettingsClick = () => {
    setIsDropdownOpen(false);
    console.log('Settings clicked from dropdown');
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
          {/* <HeaderIconButton
            icon={<Settings size={20} />}
            onClick={() => console.log('Settings clicked')}
          /> */}
        </ActionButtons>

        <UserDropdownContainer ref={dropdownRef}>
          <UserButton onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            <UserAvatar>{userInitials}</UserAvatar>
            <UserInfo>
              <UserName>{userName}</UserName>
              <UserRole>{userRole}</UserRole>
            </UserInfo>
            <ChevronDown size={16} style={{ 
              color: '#64748b',
              transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s ease'
            }} />
          </UserButton>

          <DropdownMenu isOpen={isDropdownOpen}>
            <DropdownHeader>
              <DropdownUserName>{userName}</DropdownUserName>
              <DropdownUserRole>{userRole}</DropdownUserRole>
            </DropdownHeader>

            <DropdownItem onClick={handleProfileClick}>
              <User size={16} />
              Profile
            </DropdownItem>

            <DropdownItem onClick={handleSettingsClick}>
              <Settings size={16} />
              Settings
            </DropdownItem>

            <DropdownItem variant="danger" onClick={handleLogout}>
              <LogOut size={16} />
              Logout
            </DropdownItem>
          </DropdownMenu>
        </UserDropdownContainer>
      </RightSection>
    </HeaderRoot>
  );
};