"use client";

import React, { useState, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { HeaderProps, NavLink } from "./interface";
import Image from "next/image";
import Link from "next/link";
import Swal from "sweetalert2";

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
  StyledAccountIcon,
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
  {
    label: "Home",
    href: ""
  },
  {
    label: "About Us",
    href: ""
  },
  {
    label: "All Services",
    href: ""
  },
  {
    label: "News",
    href: "/news-preview"
  },
];

export function Header({
  navLinks = defaultLinks,
  onSearchClick,
}: HeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDrawer = () => setDrawerOpen((v) => !v);
  const closeDrawer = () => setDrawerOpen(false);

  const handleNavClick = (label: string) => {
    if (pathname?.startsWith("/news-preview")) {
      if (label !== "News") {
        Swal.fire({
          title: "Preview Mode",
          text: `This is a preview for the News section in the News Dashboard only. To view the ${label} page, visit the full KMARIS website.`,
          icon: "info",
          confirmButtonText: "Go to KMARIS",
          showCancelButton: true,
          cancelButtonText: "Stay on Dashboard",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "https://kmarisimmigration.vercel.app";
          }
        });
      } else {
        router.push("/news-preview");
      }
    } else {
      console.log(`${label} link clicked - normal navigation`);
    }
  };

  const userIcons = (
    <>
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
                <span
                  key={item.label}
                  onClick={() => handleNavClick(item.label)}
                  style={{ cursor: "pointer" }}
                >
                  <LinkItem>{item.label}</LinkItem>
                </span>
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
            <span
              key={`m-${item.label}`}
              onClick={() => {
                handleNavClick(item.label);
                if (item.label === "News") {
                  closeDrawer();
                }
              }}
              style={{ cursor: "pointer" }}
            >
              <DrawerLink>{item.label}</DrawerLink>
            </span>
          ))}
        </DrawerNav>
        <DrawerIconSection>
          <IconRow>{userIcons}</IconRow>
        </DrawerIconSection>
      </MobileDrawerPanel>
    </HeaderRoot>
  );
}