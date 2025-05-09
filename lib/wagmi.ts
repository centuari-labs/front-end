import { BASE_URL } from "./api";
import { defineChain } from "viem";
import { cookieStorage, createConfig, createStorage, http } from "wagmi";
import { arbitrumSepolia } from "wagmi/chains";

export const pharos = defineChain({
  id: 50002,
  name: "Pharos Devnet",
  nativeCurrency: { name: "Pharos", symbol: "PTT", decimals: 18 },
  rpcUrls: {
    default: { http: [`${BASE_URL}/api/proxy`] },
  },
  blockExplorers: {
    default: { name: "Pharos Scan", url: "https://devnet.pharosscan.xyz" },
  },
  testnet: true,
});

const rise = defineChain({
  id: 11155931,
  name: "RISE Testnet",
  nativeCurrency: { name: "Rise", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://testnet.riselabs.xyz"] },
  },
  blockExplorers: {
    default: {
      name: "Rise Scan",
      url: "https://explorer.testnet.riselabs.xyz",
    },
  },
  testnet: true,
});

export function getConfig() {
  return createConfig({
    chains: [arbitrumSepolia, pharos, rise],
    ssr: true,
    storage: createStorage({
      storage: cookieStorage,
    }),
    transports: {
      [arbitrumSepolia.id]: http(),
      [pharos.id]: http(),
      [rise.id]: http(),
    },
  });
}
