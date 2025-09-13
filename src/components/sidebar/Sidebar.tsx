'use client';

import { FC } from 'react';
import Image from 'next/image';
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

const NavLink: FC<NavItemProps> = ({ icon, text, href, active, onClick }) => (
  <Link href={href} passHref>
    <NavItem active={active} onClick={onClick}>
      <NavIcon active={active}>{icon}</NavIcon>
      <NavText>{text}</NavText>
    </NavItem>
  </Link>
);

const NavigationSection: FC<{ section: NavSection }> = ({ section }) => (
  <NavSectionComponent>
    {section.title && <NavSectionTitle>{section.title}</NavSectionTitle>}
    {section.items.map((item, index) => (
      <NavLink key={index} {...item} />
    ))}
  </NavSectionComponent>
);

export const Sidebar: FC<SidebarProps> = ({
  isOpen = true,
  onToggle,
  navItems, // Legacy prop
  navSections, // New prop
  userName,
  userRole,
  userInitials,
  logoSrc = "/vercel.svg",
  appName = "Dashboard",
  collapsible = true,
}) => {
  // Convert legacy navItems to navSections format for backward compatibility
  const sectionsToRender = navSections || (navItems ? [{ items: navItems }] : []);

  return (
    <SidebarRoot isOpen={isOpen}>
      <SidebarHeader>
        <SidebarHeaderContent>
          <Logo>
            <Image src={logoSrc} alt="Logo" width={32} height={32} />
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
          <NavigationSection key={index} section={section} />
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