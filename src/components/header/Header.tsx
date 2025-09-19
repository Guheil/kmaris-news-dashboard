'use client';

import { FC, useState, useRef, useEffect } from 'react';
import { Menu, Search, Bell, Settings, User, LogOut, ChevronDown, Info, CheckCircle, AlertTriangle, AlertCircle } from 'lucide-react';
import Swal from "sweetalert2";
import { HeaderProps, IconButtonProps, Notification } from './interface';
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
  // Add notification elements
  NotificationsContainer,
  NotificationsDropdown,
  NotificationsHeader,
  NotificationsTitle,
  MarkAllReadButton,
  NotificationsList,
  NotificationItem,
  NotificationContent,
  NotificationIcon,
  NotificationText,
  NotificationTitle,
  NotificationMessage,
  NotificationTime,
  NotificationAction,
  EmptyNotifications,
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

const NotificationIconComponent: FC<{ type: Notification['type'] }> = ({ type }) => {
  const iconProps = { size: 16 };
  
  switch (type) {
    case 'success':
      return <CheckCircle {...iconProps} />;
    case 'warning':
      return <AlertTriangle {...iconProps} />;
    case 'error':
      return <AlertCircle {...iconProps} />;
    default:
      return <Info {...iconProps} />;
  }
};

export const Header: FC<HeaderProps> = ({
  title,
  onMenuToggle,
  userName = 'User',
  userRole = 'Admin',
  userInitials = 'U',
  onSearch,
  notificationsList = [],
  onNotificationClick,
  onMarkAllAsRead,
  isSidebarOpen = true,
  isMobile = false,
  onLogout,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  // Sample notifications if none provided
  const sampleNotifications: Notification[] = notificationsList.length > 0 ? notificationsList : [
    {
      id: '1',
      title: 'New Article Published',
      message: 'Breaking: Major tech announcement rocks the industry',
      type: 'info',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      read: false,
    },
    {
      id: '2',
      title: 'System Update',
      message: 'Dashboard has been updated with new features',
      type: 'success',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      read: false,
    },
    {
      id: '3',
      title: 'Warning',
      message: 'Your session will expire in 10 minutes',
      type: 'warning',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      read: true,
    },
  ];

  const unreadCount = sampleNotifications.filter(n => !n.read).length;

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
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

      if (onLogout) {
        await onLogout();
      }

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

  const handleNotificationClick = (notification: Notification) => {
    if (onNotificationClick) {
      onNotificationClick(notification);
    }
    setIsNotificationsOpen(false);
  };

  const handleMarkAllAsRead = () => {
    if (onMarkAllAsRead) {
      onMarkAllAsRead();
    }
    // For demo purposes, you can update the local state or show a success message
    Swal.fire({
      title: "Success!",
      text: "All notifications marked as read",
      icon: "success",
      timer: 2000,
      showConfirmButton: false,
    });
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  const handleProfileClick = () => {
    setIsDropdownOpen(false);
    console.log('Profile clicked');
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
          <NotificationsContainer ref={notificationsRef}>
            <HeaderIconButton
              icon={<Bell size={20} />}
              hasNotification={unreadCount > 0}
              notificationCount={unreadCount}
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            />
            
            <NotificationsDropdown isOpen={isNotificationsOpen}>
              <NotificationsHeader>
                <NotificationsTitle>Notifications</NotificationsTitle>
                {unreadCount > 0 && (
                  <MarkAllReadButton onClick={handleMarkAllAsRead}>
                    Mark all as read
                  </MarkAllReadButton>
                )}
              </NotificationsHeader>
              
              <NotificationsList>
                {sampleNotifications.length > 0 ? (
                  sampleNotifications.map((notification) => (
                    <NotificationItem 
                      key={notification.id} 
                      read={notification.read}
                      onClick={() => handleNotificationClick(notification)}
                    >
                      <NotificationContent>
                        <NotificationIcon type={notification.type}>
                          <NotificationIconComponent type={notification.type} />
                        </NotificationIcon>
                        <NotificationText>
                          <NotificationTitle>{notification.title}</NotificationTitle>
                          <NotificationMessage>{notification.message}</NotificationMessage>
                          <NotificationTime>{formatTimeAgo(notification.timestamp)}</NotificationTime>
                          {notification.action && (
                            <NotificationAction onClick={notification.action.onClick}>
                              {notification.action.label}
                            </NotificationAction>
                          )}
                        </NotificationText>
                      </NotificationContent>
                    </NotificationItem>
                  ))
                ) : (
                  <EmptyNotifications>
                    <Bell size={32} style={{ color: '#cbd5e1', marginBottom: '8px' }} />
                    <div>No notifications</div>
                  </EmptyNotifications>
                )}
              </NotificationsList>
            </NotificationsDropdown>
          </NotificationsContainer>
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