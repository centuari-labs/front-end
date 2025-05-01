import React from "react";

interface IPageLayoutProps extends React.PropsWithChildren {
  title: string;
  description?: string;
  filter?: React.ReactNode;
}

export const PageLayout = ({
  title,
  description,
  filter,
  children,
}: IPageLayoutProps) => {
  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          {description && (
            <p className="text-muted-foreground dark:text-muted-dark">
              {description}
            </p>
          )}
        </div>

        {filter && (
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {filter}
          </div>
        )}

        {children}
      </div>
    </div>
  );
};
