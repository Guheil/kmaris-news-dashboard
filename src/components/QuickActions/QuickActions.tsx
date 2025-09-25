import { FC } from "react";
import Link from "next/link";
import { Plus, Tag, BarChart3, Settings, LogsIcon } from "lucide-react";
import { QuickActionGrid, QuickActionButton } from "./elements";

export const QuickActions: FC = () => {
  return (
    <QuickActionGrid>
      <Link href="/news-dashboard/create-article" passHref>
        <QuickActionButton>
          <Plus size={16} />
          Create New Article
        </QuickActionButton>
      </Link>
      <Link href="/news-dashboard/categories" passHref>
        <QuickActionButton>
          <Tag size={16} />
          Manage Categories
        </QuickActionButton>
      </Link>
      <Link href="/news-dashboard/analytics" passHref>
        <QuickActionButton>
          <BarChart3 size={16} />
          View Analytics
        </QuickActionButton>
      </Link>
      <Link href="/news-dashboard/settings" passHref>
        <QuickActionButton>
          <Settings size={16} />
          Dashboard Settings
        </QuickActionButton>
      </Link>
      <Link href="/news-dashboard/logs" passHref>
        <QuickActionButton>
          <LogsIcon size={16} />
          Logs
        </QuickActionButton>
      </Link>
    </QuickActionGrid>
  );
};