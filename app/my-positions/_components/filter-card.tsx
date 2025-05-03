import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

interface FilterCardProps extends React.PropsWithChildren {
  title: string;
  description: string;
}

export const FilterCard = ({
  title,
  description,
  children,
}: FilterCardProps) => {
  return (
    <Card className="border border-muted-dark/40 dark:border-muted-dark/40">
      <CardHeader className="pb-3">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};
