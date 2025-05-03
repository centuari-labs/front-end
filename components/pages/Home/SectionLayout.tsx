import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface IProps extends React.PropsWithChildren {
  title: string;
  sectionLink?: string;
  sectionLinkText?: string;
}

export const SectionLayout = ({
  title,
  children,
  sectionLink,
  sectionLinkText,
}: IProps) => {
  return (
    <section className="container px-4 md:px-6">
      <div className="grid gap-6">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-bold tracking-tight dark:text-primary-dark">
            {title}
          </h2>
          {sectionLink && sectionLinkText && (
            <Link
              href={sectionLink}
              className="flex items-center text-sm font-medium dark:text-slate-300 text-slate-600 hover:text-slate-700 hover:dark:text-primary-dark"
            >
              {sectionLinkText || "View all markets"}
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          )}
        </div>
        {children}
      </div>
    </section>
  );
};
