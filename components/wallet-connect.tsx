"use client";

import "@rainbow-me/rainbowkit/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type State, WagmiProvider } from "wagmi";
import {
  RainbowKitProvider,
  darkTheme,
  lightTheme,
} from "@rainbow-me/rainbowkit";
import { PropsWithChildren } from "react";
import { getConfig } from "@/lib/wagmi";
import { useTheme } from "next-themes";
import { headers } from "next/headers";

import { type ReactNode, useState } from "react";

interface IWalletConnectProps extends PropsWithChildren {
  initialState: State | undefined;
}

export const CustomRainbowContext = ({ children }: PropsWithChildren) => {
  const { theme } = useTheme();
  return (
    <RainbowKitProvider theme={theme === "dark" ? darkTheme() : lightTheme()}>
      {children}
    </RainbowKitProvider>
  );
};

const queryClient = new QueryClient();

export default function WalletLayout({
  children,
  initialState,
}: IWalletConnectProps) {
  const [config] = useState(() => getConfig());
  const [queryClient] = useState(() => new QueryClient());

  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        <CustomRainbowContext>{children}</CustomRainbowContext>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
