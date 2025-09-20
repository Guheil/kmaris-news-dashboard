'use client';

import { FC, useRef, useEffect } from 'react';
import { Bell, Info, CheckCircle, AlertTriangle, AlertCircle } from 'lucide-react';
import Swal from "sweetalert2";
import { Notification } from '@/components/header/interface';
import { 
  NotificationDropdownProps, 
  NotificationItemProps, 
  NotificationIconProps 
} from './interface';
import {
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

const NotificationIconComponent: FC<NotificationIconProps> = ({ type }) => {
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

const NotificationItemComponent: FC<NotificationItemProps> = ({ notification, onClick }) => {
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

  return (
    <NotificationItem 
      read={notification.read}
      onClick={() => onClick(notification)}
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
  );
};

export const NotificationDropdown: FC<NotificationDropdownProps> = ({
  isOpen,
  onClose,
  notifications = [],
  onNotificationClick,
  onMarkAllAsRead,
}) => {
  const notificationsRef = useRef<HTMLDivElement>(null);

  // Sample notifications if none provided
  const sampleNotifications: Notification[] = notifications.length > 0 ? notifications : [
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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen, onClose]);

  const handleNotificationClick = (notification: Notification) => {
    if (onNotificationClick) {
      onNotificationClick(notification);
    }
    onClose();
  };

  const handleMarkAllAsRead = () => {
    if (onMarkAllAsRead) {
      onMarkAllAsRead();
    }
    // For demo purposes, show a success message
    Swal.fire({
      title: "Success!",
      text: "All notifications marked as read",
      icon: "success",
      timer: 2000,
      showConfirmButton: false,
    });
  };

  return (
    <NotificationsContainer ref={notificationsRef}>
      <NotificationsDropdown isOpen={isOpen}>
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
              <NotificationItemComponent 
                key={notification.id} 
                notification={notification}
                onClick={handleNotificationClick}
              />
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
  );
};