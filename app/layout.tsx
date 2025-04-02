import type React from "react";
import { Inter, Space_Grotesk } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PINJOC",
  description: "DeFi platform revolutionizing CLOB for borrowers and lenders",
};

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <WalletLayout>
            <div className="relative flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1 bg-background">{children}</main>
              <footer className="border-t py-6 md:py-0">
                <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
                  <p className="text-sm text-muted-foreground">
                    &copy; {new Date().getFullYear()} PINJOC. All rights
                    reserved.
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <Link href="/terms" className="hover:underline">
                      Terms
                    </Link>
                    <Link href="/privacy" className="hover:underline">
                      Privacy
                    </Link>
                    <Link href="/docs" className="hover:underline">
                      Docs
                    </Link>
                  </div>
                </div>
              </footer>
            </div>
          </WalletLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}

import "./globals.css";
import WalletLayout from "@/components/wallet-connect";
