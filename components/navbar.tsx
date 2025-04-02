"use client";

import { useState } from "react";
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
  ChevronDown,
  LogIn,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const routes = [
    { href: "/", label: "Home", icon: Home },
    { href: "/markets", label: "Markets", icon: BarChart2 },
    { href: "/my-positions", label: "My Positions", icon: Wallet },
    { href: "/tokenized-bonds", label: "Tokenized Bonds", icon: FileText },
    { href: "/history", label: "History", icon: Clock },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
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
            <span className="hidden font-bold sm:inline-block gradient-text">
              PINJOC
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
                  "group flex items-center px-3 py-2 text-sm font-medium transition-colors hover:text-foreground",
                  isActive ? "text-foreground" : "text-muted-foreground"
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
