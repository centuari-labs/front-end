"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  BarChart2,
  Wallet,
  FileText,
  Clock,
  Menu,
  X,
  Sun,
  Moon,
  Droplets,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import { useTheme } from "next-themes";

const routes = [
  { href: "/", label: "Home", icon: Home },
  { href: "/feucets", label: "Faucets", icon: Droplets },
  { href: "/markets", label: "Markets", icon: BarChart2 },
  { href: "/my-positions", label: "My Positions", icon: Wallet },
  { href: "/tokenized-bonds", label: "Tokenized Bonds", icon: FileText },
  { href: "/history", label: "History", icon: Clock },
];

export function Navbar() {
  const { setTheme } = useTheme();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b dark:border-b-0 bg-background/95 dark:bg-[#1a1b2f] backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative h-8 w-8 overflow-hidden rounded-full">
              <img
                src="/logo.png"
                alt="DeFi Lending Logo"
                className="h-full w-full object-cover"
              />
            </div>
            <span className="hidden font-bold sm:inline-block dark:gradient-text gradient-text">
              Centuari
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:flex-1 md:items-center md:justify-center md:space-x-1">
          {routes.map((route) => {
            const Icon = route.icon;
            const isActive = pathname === route.href;

            return (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "group flex items-center px-3 py-2 text-sm font-medium transition-colors hover:text-foreground hover:dark:text-primary-dark",
                  isActive
                    ? "text-foreground dark:text-primary-dark"
                    : "text-muted-foreground dark:text-neutral-300"
                )}
              >
                <div className="relative">
                  <Icon className="h-4 w-4 mr-2" />
                  {isActive && (
                    <span className="absolute -bottom-[15px] left-0 right-0 h-[2px] bg-gradient-primary" />
                  )}
                </div>
                {route.label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Navigation Toggle */}
        <div className="flex md:hidden flex-1 justify-end">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* Connect Wallet Button */}
        <div className="hidden md:flex items-center space-x-2">
          <ConnectButton />
          {/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="border-dashed">
                <Wallet className="mr-2 h-4 w-4" />
                <span>0x1234...5678</span>
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Wallet className="mr-2 h-4 w-4" />
                <span>View Wallet</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LogIn className="mr-2 h-4 w-4" />
                <span>Disconnect</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> */}
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container py-2">
            <nav className="grid gap-2">
              {routes.map((route) => {
                const Icon = route.icon;
                const isActive = pathname === route.href;

                return (
                  <Link
                    key={route.href}
                    href={route.href}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors",
                      isActive
                        ? "bg-muted text-foreground font-medium"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    )}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icon className="h-4 w-4" />
                    {route.label}
                  </Link>
                );
              })}

              <div className="mt-2 pt-2 border-t">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                >
                  <Wallet className="mr-2 h-4 w-4" />
                  <span>0x1234...5678</span>
                </Button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
