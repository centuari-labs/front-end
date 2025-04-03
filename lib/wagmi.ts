import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { cookieStorage, createConfig, createStorage, http } from "wagmi";
import {
  arbitrum,
  base,
  mainnet,
  optimism,
  arbitrumSepolia,
  polygon,
  sepolia,
} from "wagmi/chains";

export function getConfig() {
  return createConfig({
    chains: [arbitrumSepolia],
    ssr: true,
    storage: createStorage({
      storage: cookieStorage,
    }),
    transports: {
      [arbitrumSepolia.id]: http(),
    },
  });
}
