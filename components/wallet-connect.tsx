"use client";

import "@rainbow-me/rainbowkit/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import { PropsWithChildren } from "react";
import { headers } from "next/headers";
import { config } from "@/lib/wagmi";

export const CustomRainbowContext = ({ children }: PropsWithChildren) => {
  return (
    <RainbowKitProvider
      theme={darkTheme({
        accentColor: "var(--color-main)",
        accentColorForeground: "var(--color-black)",
        fontStack: "system",
      })}
    >
      {children}
    </RainbowKitProvider>
  );
};

const queryClient = new QueryClient();

export default function WalletLayout({ children }: PropsWithChildren) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <CustomRainbowContext>{children}</CustomRainbowContext>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
