import { FC } from "react";
import { Plus, Edit, FileText, Trash2 } from "lucide-react";
import { RecentActivityProps } from "./interface";
import {
  ActivityItem,
  ActivityIcon,
  ActivityContent,
  ActivityText,
  ActivityTime,
  NoResultsText,
} from "./elements";
import { palette } from "@/theme/palette";

export const RecentActivity: FC<RecentActivityProps> = ({
  articles,
  searchQuery,
}) => {
  const sortedArticles = articles.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA;
  });

  return (
    <div>
      {sortedArticles.length > 0 ? (
        <>
          <ActivityItem>
            <ActivityIcon color={palette.primary.main}>
              <Plus size={16} />
            </ActivityIcon>
            <ActivityContent>
              <ActivityText>
                New article &quot;{sortedArticles[0]?.title}&quot; was published
              </ActivityText>
              <ActivityTime>2 minutes ago</ActivityTime>
            </ActivityContent>
          </ActivityItem>
          <ActivityItem>
            <ActivityIcon color="#10b981">
              <Edit size={16} />
            </ActivityIcon>
            <ActivityContent>
              <ActivityText>
                Article &quot;{sortedArticles[1]?.title}&quot; was updated
              </ActivityText>
              <ActivityTime>15 minutes ago</ActivityTime>
            </ActivityContent>
          </ActivityItem>
          <ActivityItem>
            <ActivityIcon color="#f59e0b">
              <FileText size={16} />
            </ActivityIcon>
            <ActivityContent>
              <ActivityText>
                Draft &quot;{sortedArticles[2]?.title}&quot; saved
              </ActivityText>
              <ActivityTime>1 hour ago</ActivityTime>
            </ActivityContent>
          </ActivityItem>
          <ActivityItem>
            <ActivityIcon color="#8b5cf6">
              <Trash2 size={16} />
            </ActivityIcon>
            <ActivityContent>
              <ActivityText>
                Article &quot;{sortedArticles[3]?.title}&quot; was archived
              </ActivityText>
              <ActivityTime>3 hours ago</ActivityTime>
            </ActivityContent>
          </ActivityItem>
        </>
      ) : (
        <NoResultsText>No recent activity</NoResultsText>
      )}
    </div>
  );
};