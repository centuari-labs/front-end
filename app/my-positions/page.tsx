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
import { lendingPositions, borrowingPositions, marketData } from "@/lib/data";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TokenPair } from "./_components/token-pair";

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
          <Card className="border border-muted/40 dark:border-muted-dark/40">
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
          <Card className="border border-muted/40 dark:border-muted-dark/40">
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
          <Card className="border border-muted/40 dark:border-muted-dark/40">
            <CardHeader className="pb-3">
              <CardTitle>Active Vault</CardTitle>
              <CardDescription>Across all markets</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$8,280.42</div>
              {/* <p className="text-xs text-muted-foreground">
                -$120.15 (2.23%) today
              </p> */}
            </CardContent>
          </Card>
        </div>

        <Accordion type="multiple" className="w-full space-y-4">
          <AccordionItem
            value="item-1"
            className="border border-muted/40 dark:border-muted-dark/40 px-4 rounded-md bg-card dark:bg-card-dark"
          >
            <AccordionTrigger className="text-start">
              <div>
                <h1>Vault</h1>
                <p className="text-xs font-light">0 Position</p>
              </div>
            </AccordionTrigger>
            <AccordionContent className="border-t border-muted/40 dark:border-muted-dark/40 pt-4 bg-card dark:bg-card-dark">
              <div className="flex flex-col gap-3 h-52 items-center justify-center">
                <p>No Position Yet</p>
                <Button variant={"colorful"}>View Vault</Button>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="item-2"
            className="border border-muted/40 dark:border-muted-dark/40 px-4 rounded-md bg-card dark:bg-card-dark"
          >
            <AccordionTrigger className="text-start">
              <div>
                <h1>Borrow</h1>
                <p className="text-xs font-light">1 Position</p>
              </div>
            </AccordionTrigger>
            <AccordionContent className="border-t border-muted/40 dark:border-muted-dark/40 pt-4">
              <div className="rounded-md border border-muted/40 dark:border-muted-dark/40">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Assets</TableHead>
                      <TableHead>Borrowed</TableHead>
                      <TableHead className="hidden md:table-cell">
                        Value
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        APY
                      </TableHead>
                      <TableHead>Collateral</TableHead>
                      <TableHead>Maturity</TableHead>
                      <TableHead>Health Factor</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <TokenPair
                          lendToken={marketData[0].lend_token}
                          collateralToken={marketData[0].collateral_token}
                          lendTokenUrl={marketData[0].lendTokenUrl}
                          borrowTokenUrl={marketData[0].borrowTokenUrl}
                          pairName={marketData[0].name}
                          marketTrending={marketData[0].trending}
                        />
                      </TableCell>
                      <TableCell>2.5 ETH</TableCell>
                      <TableCell>$5,000</TableCell>
                      <TableCell>-5.15%</TableCell>
                      <TableCell>USDT</TableCell>
                      <TableCell>September 30, 2023</TableCell>
                      <TableCell>1.85</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="item-3"
            className="border border-muted/40 dark:border-muted-dark/40 px-4 rounded-md bg-card dark:bg-card-dark"
          >
            <AccordionTrigger className="text-start">
              <div>
                <h1>Lend</h1>
                <p className="text-xs font-light">1 Position</p>
              </div>
            </AccordionTrigger>
            <AccordionContent className="border-t border-muted/40 dark:border-muted-dark/40 pt-4">
              <div className="rounded-md border border-muted/40 dark:border-muted-dark/40">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Assets</TableHead>
                      <TableHead>Supplied</TableHead>
                      <TableHead className="hidden md:table-cell">
                        Value
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        APY
                      </TableHead>
                      <TableHead>Maturity</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <TokenPair
                          lendToken={marketData[0].lend_token}
                          collateralToken={marketData[0].collateral_token}
                          lendTokenUrl={marketData[0].lendTokenUrl}
                          borrowTokenUrl={marketData[0].borrowTokenUrl}
                          pairName={marketData[0].name}
                          marketTrending={marketData[0].trending}
                        />
                      </TableCell>
                      <TableCell>10,000 USDC</TableCell>
                      <TableCell>$10,000</TableCell>
                      <TableCell>+3.25%</TableCell>
                      <TableCell>September 30, 2023</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        {/* 
        <Tabs defaultValue="lending" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:w-auto bg-muted dark:bg-gray-800">
            <TabsTrigger
              value="lending"
              className="data-[state=active]:bg-primary data-[state=active]:text-white dark:text-white"
            >
              Lending Positions
            </TabsTrigger>
            <TabsTrigger
              value="borrowing"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white dark:text-white"
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
        </Tabs> */}
      </div>
    </div>
  );
}
