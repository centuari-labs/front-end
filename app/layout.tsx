import type React from "react";
import { Inter, Space_Grotesk } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Centuari",
  description: "DeFi platform revolutionizing CLOB for borrowers and lenders",
};

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = cookieToInitialState(
    getConfig(),
    (await headers()).get("cookie")
  );

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <WalletLayout initialState={initialState}>
            <div className="relative flex min-h-screen dark:bg-background-dark bg-background flex-col">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Toaster richColors position="top-center" />
              <Footer />
            </div>
          </WalletLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}

import "./globals.css";
import WalletLayout from "@/components/wallet-connect";
import { cookieToInitialState } from "wagmi";
import { getConfig } from "@/lib/wagmi";
import { headers } from "next/headers";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/sonner";
