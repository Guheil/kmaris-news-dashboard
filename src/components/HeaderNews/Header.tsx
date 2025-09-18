"use client";

import React, { useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { HeaderProps, NavLink } from "./interface";
import Image from "next/image";
import Link from "next/link";

// Import all styled components
import {
  HeaderRoot,
  Bar,
  Nav,
  LinkItem,
  AddressBar,
  RightSection,
  LogoWrap,
} from "./base";
import { MobileOnly, DesktopOnly } from "./responsive";
import {
  IconRow,
  IconButton,
  StyledSearchIcon,
  StyledCartIcon,
  StyledAccountIcon,
  CartBadge,
} from "./icons";
import {
  MobileDrawerOverlay,
  MobileDrawerPanel,
  DrawerCloseButton,
  MobileDrawerHeader,
  DrawerNav,
  DrawerLink,
  DrawerIconSection,
} from "./drawer";
import { ProfileMenu, DropdownContent, MenuItem } from "./menu";

// Import MUI Icons
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import MenuIcon from "@mui/icons-material/Menu";

const defaultLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "All Services", href: "/All_forms" },
  { label: "News", href: "/News" },
];

export function Header({
  navLinks = defaultLinks,
  cartCount = 0,
  onSearchClick,
  onCartClick,
}: HeaderProps) {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDrawer = () => setDrawerOpen((v) => !v);
  const closeDrawer = () => setDrawerOpen(false);

  const userIcons = (
    <>
      {/* <IconButton onClick={onCartClick}>
        <StyledCartIcon />
        {cartCount > 0 && <CartBadge>{cartCount}</CartBadge>}
      </IconButton> */}
      <ProfileMenu ref={dropdownRef}>
        <IconButton onClick={() => setDropdownOpen((o) => !o)}>
          <StyledAccountIcon />
        </IconButton>
        <DropdownContent isOpen={dropdownOpen}>
          <MenuItem href="https://accesskmaris.vercel.app/" target="_blank">Sign In</MenuItem>
          <MenuItem href="https://accesskmaris.vercel.app/signup" target="_blank">Create Account</MenuItem>
        </DropdownContent>
      </ProfileMenu>
    </>
  );

  if (pathname?.startsWith("/admin") || pathname?.startsWith("/auth")) {
    return null;
  }

  return (
    <HeaderRoot>
      <AddressBar>
        <LocationOnRoundedIcon />
        <span>5900 Balcones Dr, Austin, Texas 78731, United States</span>
      </AddressBar>

      <Bar>
        <LogoWrap>
          <Link href="/" aria-label="KMARIS Home">
            <Image
              src="/Logo.png"
              alt="KMARIS Logo"
              width={200}
              height={60}
              priority
            />
          </Link>
        </LogoWrap>

        <RightSection>
          <DesktopOnly style={{ gap: "20px" }}>
            <Nav aria-label="Primary Navigation">
              {navLinks.map((item) => (
                <Link key={item.href} href={item.href}>
                  <LinkItem>{item.label}</LinkItem>
                </Link>
              ))}
            </Nav>
            <IconRow>
              <IconButton onClick={onSearchClick}>
                <StyledSearchIcon />
              </IconButton>
              {userIcons}
            </IconRow>
          </DesktopOnly>

          <MobileOnly>
            <IconButton onClick={onSearchClick}>
              <StyledSearchIcon />
            </IconButton>
            <IconButton aria-label="Menu" onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>
          </MobileOnly>
        </RightSection>
      </Bar>

      <MobileDrawerOverlay open={drawerOpen} onClick={closeDrawer} />
      <MobileDrawerPanel open={drawerOpen}>
        <MobileDrawerHeader>
          <Image src="/whitelogo.png" alt="Logo" width={150} height={80} />
          <DrawerCloseButton onClick={closeDrawer}>
            <CloseRoundedIcon sx={{ color: "white" }} />
          </DrawerCloseButton>
        </MobileDrawerHeader>
        <DrawerNav>
          {navLinks.map((item) => (
            <Link
              key={`m-${item.href}`}
              href={item.href}
            >
              <DrawerLink onClick={closeDrawer}>{item.label}</DrawerLink>
            </Link>
          ))}
        </DrawerNav>
        <DrawerIconSection>
          <IconRow>{userIcons}</IconRow>
        </DrawerIconSection>
      </MobileDrawerPanel>
    </HeaderRoot>
  );
}
