import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t dark:border-border-dark dark:bg-[#1a1b2f] ">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
        <p className="text-sm dark:text-muted-dark text-muted-foreground">
          &copy; {new Date().getFullYear()} Centuari. All rights reserved.
        </p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <Link href="/terms" className="hover:underline dark:text-muted-dark">
            Terms
          </Link>
          <Link
            href="/privacy"
            className="hover:underline dark:text-muted-dark"
          >
            Privacy
          </Link>
          <Link href="/docs" className="hover:underline dark:text-muted-dark">
            Docs
          </Link>
        </div>
      </div>
    </footer>
  );
}
