// Sidebar.tsx
"use client";

import { FC } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SidebarProps, NavItemProps, NavSection } from './interface';
import {
  SidebarRoot,
  SidebarHeader,
  SidebarHeaderContent,
  Logo,
  NavigationList,
  NavItem,
  NavIcon,
  NavText,
  SidebarFooter,
  UserProfile,
  UserAvatar,
  UserInfo,
  UserName,
  UserRole,
  NavSection as NavSectionComponent,
  NavSectionTitle,
  CollapseButton,
} from './elements';

const NavLink: FC<NavItemProps & { isOpen: boolean }> = ({ icon, text, href, active, onClick, isOpen }) => (
  <Link href={href || '#'}>  
    <NavItem icon={icon} text={text} href={href} active={active} onClick={onClick}>
      <NavIcon active={active}>{icon}</NavIcon>
      <NavText isOpen={isOpen}>{text}</NavText>  
    </NavItem>
  </Link>
);

const NavigationSection: FC<{ section: NavSection; isOpen: boolean }> = ({ section, isOpen }) => (
  <NavSectionComponent>
    {section.title && <NavSectionTitle isOpen={isOpen}>{section.title}</NavSectionTitle>}
    {section.items.map((item, index) => (
      <NavLink key={index} {...item} isOpen={isOpen} />
    ))}
  </NavSectionComponent>
);

export const Sidebar: FC<SidebarProps> = ({
  isOpen = true,
  onToggle,
  navItems,
  navSections,
  userName,
  userRole,
  userInitials,
  logoSrc = "/whitelogo.png",
  appName = "",
  collapsible = true,
}) => {
  const sectionsToRender = navSections || (navItems ? [{ items: navItems }] : []);

  return (
    <SidebarRoot isOpen={isOpen}>
      <SidebarHeader>
        <SidebarHeaderContent>
          <Logo>
            <img src={logoSrc} alt="Logo" width={160} height={90} />
            {isOpen && appName}
          </Logo>
          {collapsible && (
            <CollapseButton onClick={onToggle}>
              {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
            </CollapseButton>
          )}
        </SidebarHeaderContent>
      </SidebarHeader>

      <NavigationList>
        {sectionsToRender.map((section, index) => (
          <NavigationSection key={index} section={section} isOpen={isOpen} />
        ))}
      </NavigationList>

      <SidebarFooter>
        <UserProfile>
          <UserAvatar>{userInitials}</UserAvatar>
          <UserInfo isOpen={isOpen}>
            <UserName>{userName}</UserName>
            <UserRole>{userRole}</UserRole>
          </UserInfo>
        </UserProfile>
      </SidebarFooter>
    </SidebarRoot>
  );
};