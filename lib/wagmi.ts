import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { cookieStorage, createStorage } from "wagmi";
import {
  arbitrum,
  base,
  mainnet,
  optimism,
  arbitrumSepolia,
  polygon,
  sepolia,
} from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "RainbowKit App",
  projectId: "5ccbddb89bd6e89f8bce28ac8694bc58",
  chains: [
    arbitrumSepolia,
    // mainnet,
    // polygon,
    // optimism,
    // arbitrum,
    // base,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true" ? [sepolia] : []),
  ],
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
});
