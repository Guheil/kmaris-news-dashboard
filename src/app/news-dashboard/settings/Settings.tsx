"use client";

import { FC, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Home,
  FileText,
  BarChart3,
  Settings,
  Plus,
  Eye,
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  Database,
  Key,
  Monitor,
  Activity,
} from "lucide-react";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { Header } from "@/components/header/Header";
import {
  SettingsDashboardProps,
  SettingCardProps,
  SettingCategory,
} from "./interface";
import {
  DashboardRoot,
  MainContent,
  DashboardGrid,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  SidebarOverlay,
  UnderDevelopmentContainer,
  MainIcon,
  UnderDevTitle,
  UnderDevSubtitle,
  ComingSoonBadge,
  ComingSoonText,
  SettingsList,
  SettingItem,
  SettingIcon,
  SettingContent,
  SettingTitle,
  SettingDescription,
  SettingBadge,
} from "./elements";
import { getSession, clearSession } from "@/app/login/sessionUtils";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const SettingsCard: FC<SettingCardProps> = ({
  title,
  gridColumn = "span 4",
  children,
}) => (
  <Card style={{ gridColumn }}>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>{children}</CardContent>
  </Card>
);

export const SettingsDashboard: FC<SettingsDashboardProps> = ({
  sidebarOpen,
  onSidebarToggle,
  isMobile = false,
}) => {
  const router = useRouter();
  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down('md'));
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const session = getSession();
    if (!session) {
      router.push("/");
    }
  }, [router]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleOverlayClick = () => {
    if (isMobile) {
      onSidebarToggle();
    }
  };

  // Logout functionality
  const handleLogout = () => {
    clearSession();
    router.push("/login");
  };

  // Under development features - simplified
  const upcomingFeatures = [
    "Profile Management",
    "Theme Customization", 
    "Advanced Security",
    "Smart Notifications"
  ];

  // Settings categories for preview
  const settingsCategories: SettingCategory[] = [
    {
      title: "Account & Profile",
      items: [
        { icon: User, title: "Personal Information", description: "Update your profile details and preferences", color: "#3b82f6" },
        { icon: Key, title: "Security Settings", description: "Password, 2FA, and login preferences", color: "#ef4444" },
        { icon: Bell, title: "Notification Settings", description: "Email, push, and in-app notifications", color: "#f59e0b" },
      ]
    },
    {
      title: "Application Settings",
      items: [
        { icon: Palette, title: "Theme & Appearance", description: "Dark mode, colors, and layout options", color: "#8b5cf6" },
        { icon: Globe, title: "Language & Region", description: "Localization and regional preferences", color: "#06b6d4" },
        { icon: Monitor, title: "Display & Accessibility", description: "Screen reader, font size, and contrast", color: "#10b981" },
      ]
    },
    {
      title: "Data & Privacy",
      items: [
        { icon: Database, title: "Data Management", description: "Import, export, and backup your data", color: "#f97316" },
        { icon: Shield, title: "Privacy Controls", description: "Data sharing, cookies, and permissions", color: "#84cc16" },
        { icon: Activity, title: "Usage Analytics", description: "Performance tracking and optimization", color: "#ec4899" },
      ]
    }
  ];

  return (
    <DashboardRoot>
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
              {
                icon: <Home size={20} />,
                text: "Dashboard",
                href: "/news-dashboard",
                active: false,
              },
            ],
          },
          {
            title: "News Management",
            items: [
              {
                icon: <FileText size={20} />,
                text: "All Articles",
                href: "/news-dashboard/articles",
              },
              {
                icon: <Plus size={20} />,
                text: "Create Article",
                href: "/news-dashboard/create-article",
              },
              {
                icon: <BarChart3 size={20} />,
                text: "Analytics",
                href: "/news-dashboard/analytics",
                active: false,
              },
            ],
          },
          {
            title: "Preview",
            items: [
              {
                icon: <Eye size={20} />,
                text: "News Preview",
                href: "/news-preview",
                active: false,
              },
            ],
          },
          {
            title: "System",
            items: [
              {
                icon: <Settings size={20} />,
                text: "Settings",
                href: "/news-dashboard/settings",
                active: true,
              },
            ],
          },
        ]}
        userName="Kmaris Admin"
        userRole="Administrator"
        userInitials="KA"
        collapsible={!isMobile}
        navItems={[]}
      />
      <Header
        title="Settings"
        onMenuToggle={onSidebarToggle}
        onSearch={handleSearch}
        searchValue={searchQuery}
        userName="Kmaris Admin"
        userRole="Administrator"
        userInitials="KA"
        notifications={3}
        isSidebarOpen={sidebarOpen}
        isMobile={isMobile}
      />
      <MainContent sidebarOpen={sidebarOpen} isMobile={isMobile}>
        <DashboardGrid>
          {/* Simple Under Development Card */}
          <Card style={{ gridColumn: isMobileView ? "1fr" : "span 12" }}>
            <UnderDevelopmentContainer>
              <MainIcon>
                <Settings size={40} color="#6b7280" />
              </MainIcon>

              <UnderDevTitle>
                Settings Under Development
              </UnderDevTitle>
              
              <UnderDevSubtitle>
                We&apos;re working on bringing you comprehensive settings to customize your dashboard experience.
              </UnderDevSubtitle>

              <ComingSoonBadge>
                Coming Soon
              </ComingSoonBadge>

              <ComingSoonText>
                Stay tuned for updates on profile management, themes, and more customization options.
              </ComingSoonText>
            </UnderDevelopmentContainer>
          </Card>

          {/* Settings Categories Preview */}
          {settingsCategories.map((category, categoryIndex) => (
            <SettingsCard 
              key={category.title}
              title={category.title} 
              gridColumn={isMobileView ? "1fr" : "span 4"}
            >
              <SettingsList>
                {category.items.map((item, itemIndex) => (
                  <SettingItem key={item.title}>
                    <SettingIcon color={item.color}>
                      <item.icon size={16} />
                    </SettingIcon>
                    <SettingContent>
                      <SettingTitle>{item.title}</SettingTitle>
                      <SettingDescription>{item.description}</SettingDescription>
                    </SettingContent>
                    <SettingBadge>Soon</SettingBadge>
                  </SettingItem>
                ))}
              </SettingsList>
            </SettingsCard>
          ))}
        </DashboardGrid>
      </MainContent>
    </DashboardRoot>
  );
};