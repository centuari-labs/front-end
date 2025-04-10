import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PositionCard } from "@/components/position-card";
import { lendingPositions, borrowingPositions } from "@/lib/data";

export const metadata: Metadata = {
  title: "My Positions - DeFi Lending & Borrowing",
  description: "View your current lending and borrowing positions",
};

export default function MyPositionsPage() {
  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">My Positions</h1>
          <p className="text-muted-foreground dark:text-muted-dark">
            View and manage your current lending and borrowing positions.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Active Supply</CardTitle>
              <CardDescription>Across all markets</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$12,450.83</div>
              {/* <p className="text-xs text-muted-foreground">
                +$245.23 (1.98%) today
              </p> */}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Active Borrow</CardTitle>
              <CardDescription>Across all markets</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$5,280.42</div>
              {/* <p className="text-xs text-muted-foreground">
                -$120.15 (2.23%) today
              </p> */}
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="lending" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:w-auto dark:bg-gray-800">
            <TabsTrigger
              value="lending"
              className="data-[state=active]:bg-primary data-[state=active]:text-white text-white"
            >
              Lending Positions
            </TabsTrigger>
            <TabsTrigger
              value="borrowing"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-white"
            >
              Borrowing Positions
            </TabsTrigger>
          </TabsList>
          <TabsContent value="lending" className="mt-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Your Lending Positions</h2>
              <Link href="/markets">
                <Button variant="outline" size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  New Position
                </Button>
              </Link>
            </div>
            {lendingPositions.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {lendingPositions.map((position) => (
                  <PositionCard
                    key={position.id}
                    position={position}
                    type="lending"
                  />
                ))}
              </div>
            ) : (
              <Card className="bg-muted/40">
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <h3 className="text-lg font-medium mb-2">
                    No Lending Positions
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    You don't have any active lending positions yet.
                  </p>
                  <Link href="/markets">
                    <Button>
                      Explore Markets
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          <TabsContent value="borrowing" className="mt-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">
                Your Borrowing Positions
              </h2>
              <Link href="/markets">
                <Button variant="outline" size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  New Position
                </Button>
              </Link>
            </div>
            {borrowingPositions.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {borrowingPositions.map((position) => (
                  <PositionCard
                    key={position.id}
                    position={position}
                    type="borrowing"
                  />
                ))}
              </div>
            ) : (
              <Card className="bg-muted/40">
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <h3 className="text-lg font-medium mb-2">
                    No Borrowing Positions
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    You don't have any active borrowing positions yet.
                  </p>
                  <Link href="/markets">
                    <Button>
                      Explore Markets
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
