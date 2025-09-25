import { FC } from "react";
import { CardProps } from "./interface";
import { Card, CardHeader, CardTitle, CardContent } from "./elements";

export const DashboardCard: FC<CardProps> = ({
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