import { defineChain } from "viem";
import { cookieStorage, createConfig, createStorage, http } from "wagmi";
import { arbitrumSepolia } from "wagmi/chains";

export const pharos = defineChain({
  id: 50002,
  name: "Pharos Devnet",
  nativeCurrency: { name: "Pharos", symbol: "PTT", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://devnet.dplabs-internal.com"] },
  },
  blockExplorers: {
    default: { name: "Pharos Scan", url: "https://pharosscan.xyz" },
  },
  testnet: true,
});

export function getConfig() {
  return createConfig({
    chains: [arbitrumSepolia, pharos],
    ssr: true,
    storage: createStorage({
      storage: cookieStorage,
    }),
    transports: {
      [arbitrumSepolia.id]: http(),
      [pharos.id]: http(),
    },
  });
}
