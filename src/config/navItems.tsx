import { Home, FileText, Plus, BarChart3, Eye } from 'lucide-react';

export const navSections = [
  {
    title: "Overview",
    items: [
      {
        icon: <Home size={20} />,
        text: "Dashboard",
        href: "/news-dashboard",
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
      },
    ],
  },
];

export const userName = "Kmaris Admin";