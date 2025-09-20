"use client";

import { Notification } from '@/components/header/interface';

export interface NotificationDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  notifications?: Notification[];
  onNotificationClick?: (notification: Notification) => void;
  onMarkAllAsRead?: () => void;
}

export interface NotificationItemProps {
  notification: Notification;
  onClick: (notification: Notification) => void;
}

export interface NotificationIconProps {
  type: Notification['type'];
}