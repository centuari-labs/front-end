import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const Hero = () => {
  return (
    <section className="relative w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-background to-muted dark:bg-gradient-to-r dark:from-background-dark dark:to-background-dark">
      <div className="hidden dark:block absolute w-[300px] bottom-0 right-0 h-[200px] rounded-full bg-blue-900 blur-[200px]"></div>
      <div className="hidden dark:block absolute w-1/3 left-0 top-0 h-1/3 transform translate-x-0.5 translate-y-0.5 rounded-full bg-blue-950 blur-[200px]"></div>

      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              <span>Centuari</span>
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground dark:text-primary-dark md:text-xl">
              A DeFi platform revolutionizing CLOB for borrowers and lenders.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/markets">
              <Button variant="colorful" size="lg">
                Explore Markets
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/my-positions">
              <Button variant="outline" size="lg">
                My Positions
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
