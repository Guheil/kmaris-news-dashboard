export interface NavLink {
  label: string;
  href: string;
}

export interface HeaderProps {
  /**
   * An array of navigation link objects to display in the header's main navigation.
   * If not provided, a default set of links will be used.
   * @default defaultLinks
   */
  navLinks?: NavLink[];

  /**
   * The number to display in the cart notification badge.
   * The badge will be hidden if the count is 0.
   * @default 0
   */
  cartCount?: number;
  onSearchClick?: () => void;
  onCartClick?: () => void;
  onMenuClick?: () => void;
}