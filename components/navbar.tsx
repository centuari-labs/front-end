"use client";

import {
  ForwardRefExoticComponent,
  RefAttributes,
  useEffect,
  useState,
} from "react";
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
  LucideProps,
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
import { useAccount } from "wagmi";

interface INavbarLink {
  href: string;
  label: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  private?: boolean;
}

const routes: INavbarLink[] = [
  { href: "/", label: "Home", icon: Home },
  { href: "/feucets", label: "Faucets", icon: Droplets },
  { href: "/markets", label: "Markets", icon: BarChart2 },
  { href: "/my-positions", label: "My Positions", icon: Wallet, private: true },
];

const NavbarLink = ({
  route,
  isActive,
}: {
  route: INavbarLink;
  isActive: boolean;
}) => {
  const Icon = route.icon;
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
          <span className="absolute -bottom-[10px] left-0 right-0 h-[2px] bg-[#1084AB]" />
        )}
      </div>
      {route.label}
    </Link>
  );
};

const NavbarLinkMobile = ({
  route,
  isActive,
}: {
  route: INavbarLink;
  isActive: boolean;
}) => {
  const Icon = route.icon;
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
      <Icon className="h-4 w-4 mr-2" />
      {route.label}
    </Link>
  );
};

export function Navbar() {
  const { setTheme, theme } = useTheme();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isConnected } = useAccount();

  return (
    <header className="p-3 sticky top-0 z-50 w-full container mx-auto">
      <div className="py-1 bg-background/95 dark:bg-[#1a1b2f] backdrop-blur-2xl rounded-xl border dark:border-white/20">
        <div className="container flex h-16 items-center">
          <div className="mr-4 flex">
            <Link href="/" className="flex items-center space-x-2">
              <div className="relative h-full w-40 rounded-full">
                <img
                  src={theme === "dark" ? "/logo-color.png" : "logo-black.png"}
                  alt="DeFi Lending Logo"
                  className="h-full w-full object-cover"
                />
              </div>
              {/* <span className="hidden font-bold sm:inline-block dark:gradient-text gradient-text">
              Centuari
            </span> */}
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:flex-1 md:items-center md:justify-center md:space-x-1">
            {routes.map((route) => {
              const isActive = pathname === route.href;

              if (route.private && !isConnected) return null;

              return (
                <NavbarLink
                  key={route.href}
                  route={route}
                  isActive={isActive}
                />
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
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container py-2">
            <nav className="grid gap-2">
              {routes.map((route, i) => {
                const isActive = pathname === route.href;

                if (route.private && !isConnected) return null;
                return (
                  <NavbarLinkMobile
                    key={route.href}
                    route={route}
                    isActive={isActive}
                  />
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
