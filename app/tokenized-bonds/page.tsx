import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Info } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import UnderConstruction from "@/components/under-construction";

export const metadata: Metadata = {
  title: "Tokenized Bonds - DeFi Lending & Borrowing",
  description: "Explore and manage tokenized bonds",
};

export default function TokenizedBondsPage() {
  return (
    <>
      <div className="container px-4 py-8 md:px-6 md:py-12">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold tracking-tight">
                Tokenized Bonds
              </h1>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <Info className="h-4 w-4" />
                      <span className="sr-only">Info</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-sm">
                    <p>
                      Tokenized bonds represent your lending positions as
                      transferable tokens. They can be traded, used as
                      collateral, or held until maturity.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <p className="text-muted-foreground">
              Explore available tokenized bonds or manage your existing bond
              positions.
            </p>
          </div>

          {/* <Card>
            <CardHeader>
              <CardTitle>What are Tokenized Bonds?</CardTitle>
              <CardDescription>
                Understanding how tokenized bonds work in DeFi
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Tokenized bonds are digital representations of traditional bonds
                on the blockchain. When you lend assets on our platform, you
                receive bond tokens that represent your position. These tokens
                can be held until maturity to receive the principal plus
                interest, or they can be traded on secondary markets.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/learn/tokenized-bonds">
                <Button variant="outline">Learn More</Button>
              </Link>
            </CardFooter>
          </Card>

          <Tabs defaultValue="available" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:w-auto">
              <TabsTrigger value="available">Available Bonds</TabsTrigger>
              <TabsTrigger value="my-bonds">My Bonds</TabsTrigger>
            </TabsList>
            <TabsContent value="available" className="mt-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">
                  Available Bond Markets
                </h2>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    Sort: Yield ↓
                  </Button>
                </div>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {tokenizedBonds.map((bond) => (
                  <BondCard key={bond.id} bond={bond} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="my-bonds" className="mt-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Your Bond Positions</h2>
                <Link href="/markets">
                  <Button variant="outline" size="sm">
                    Get New Bonds
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
              {myBonds.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {myBonds.map((bond) => (
                    <BondCard key={bond.id} bond={bond} isOwned={true} />
                  ))}
                </div>
              ) : (
                <Card className="bg-muted/40">
                  <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                    <h3 className="text-lg font-medium mb-2">
                      No Bond Positions
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      You don't have any tokenized bonds yet.
                    </p>
                    <Link href="/markets">
                      <Button>
                        Explore Bond Markets
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs> */}
        </div>
      </div>
      <UnderConstruction />
    </>
  );
}
