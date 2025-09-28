// components/header/Header.tsx
"use client";

import { FC, useState, useRef, useEffect } from "react";
import {
  Menu,
  Search,
  Bell,
  Settings,
  User,
  LogOut,
  ChevronDown,
} from "lucide-react";
import Swal from "sweetalert2";
import { HeaderProps, IconButtonProps } from "./interface";
import { NotificationDropdown } from "@/components/NotificationDropdown/NotificationDropdown";
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
} from "./elements";
import Link from "next/link";

const HeaderIconButton: FC<IconButtonProps> = ({
  icon,
  onClick,
  hasNotification,
  notificationCount,
}) => (
  <IconButton onClick={onClick}>
    {icon}
    {hasNotification &&
      (notificationCount && notificationCount > 0 ? (
        <NotificationCount>
          {notificationCount > 99 ? "99+" : notificationCount}
        </NotificationCount>
      ) : (
        <NotificationBadge />
      ))}
  </IconButton>
);

export const Header: FC<HeaderProps> = ({
  title,
  onMenuToggle,
  userName = "User",
  userRole = "Admin",
  userInitials = "U",
  onSearch,
  notificationsList = [],
  onNotificationClick,
  onMarkAllAsRead,
  isSidebarOpen = true,
  isMobile = false,
  onLogout,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Calculate unread notifications count
  const unreadCount = notificationsList.filter((n) => !n.read).length;

  // Close user dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Update search query and call onSearch on every input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (onSearch) {
      onSearch(query); // Call onSearch for real-time updates
    }
  };

  // Optional: Keep form submission for accessibility (e.g., Enter key)
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

  const handleProfileClick = () => {
    setIsDropdownOpen(false);
    console.log("Profile clicked");
  };

  const handleSettingsClick = () => {
    setIsDropdownOpen(false);
    console.log("Settings clicked from dropdown");
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
              onChange={handleSearchChange} // Update to use handleSearchChange
            />
            <SearchIcon>
              <Search size={20} />
            </SearchIcon>
          </form>
        </SearchBar>
      </CenterSection>

      <RightSection>
        <ActionButtons>
          <div style={{ position: "relative" }}>
            <HeaderIconButton
              icon={<Bell size={20} />}
              hasNotification={unreadCount > 0}
              notificationCount={unreadCount}
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            />

            <NotificationDropdown
              isOpen={isNotificationsOpen}
              onClose={() => setIsNotificationsOpen(false)}
              notifications={notificationsList}
              onNotificationClick={onNotificationClick}
              onMarkAllAsRead={onMarkAllAsRead}
            />
          </div>
        </ActionButtons>

        <UserDropdownContainer ref={dropdownRef}>
          <UserButton onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            <UserAvatar>{userInitials}</UserAvatar>
            <UserInfo>
              <UserName>{userName}</UserName>
              <UserRole>{userRole}</UserRole>
            </UserInfo>
            <ChevronDown
              size={16}
              style={{
                color: "#64748b",
                transform: isDropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.2s ease",
              }}
            />
          </UserButton>

          <DropdownMenu isOpen={isDropdownOpen}>
            <DropdownHeader>
              <DropdownUserName>{userName}</DropdownUserName>
              <DropdownUserRole>{userRole}</DropdownUserRole>
            </DropdownHeader>
            <Link href={"/news-dashboard/settings"} passHref>
              <DropdownItem onClick={handleSettingsClick}>
                <Settings size={16} />
                Settings
              </DropdownItem>
            </Link>

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

export default Header;